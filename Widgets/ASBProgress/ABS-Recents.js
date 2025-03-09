// Configuration
const API_BASE_URL = "https://audiobookshelf.server.com/api"; // Replace with your Audiobookshelf server URL
const API_TOKEN = "<token here>"; // Replace with your Audiobookshelf API token

// Default configuration
const DEFAULT_CONFIG = {
    theme: "dark", // Options: "light", "dark"
    backgroundColor: "darkBlue", // Options: "lightGrey", "darkBlue"
    numberOfItems: 3, // Number of items to display
    imageScaling: "fill", // Options: "fit" (no cropping), "fill" (zoomed in, may crop)
    truncateTitle: true, // Options: true (remove text after : or -), false (keep full title)
};

// Parse widget parameters
const widgetParams = args.widgetParameter ? JSON.parse(args.widgetParameter) : {};
const config = { ...DEFAULT_CONFIG, ...widgetParams };

// FileManager for caching
const localFM = FileManager.local();
const documentsPath = localFM.documentsDirectory();
const cachePath = localFM.joinPath(documentsPath, "abs_widget_cache");
const logPath = localFM.joinPath(cachePath, "log.json");

if (!localFM.isDirectory(cachePath)) {
    localFM.createDirectory(cachePath, true);
}
if (!localFM.fileExists(logPath)) {
    localFM.writeString(logPath, JSON.stringify({ version: "0.1.0", users: {} }));
}

// Function to fetch items in progress from Audiobookshelf API
async function fetchItemsInProgress() {
    const url = `${API_BASE_URL}/me/items-in-progress?limit=${config.numberOfItems}`;
    const request = new Request(url);
    request.headers = { "Authorization": `Bearer ${API_TOKEN}` };

    try {
        const response = await request.loadJSON();
        return response;
    } catch (error) {
        console.error("Failed to fetch items in progress:", error);
        return null;
    }
}

// Function to fetch progress for a specific library item
async function fetchItemProgress(libraryItemId) {
    const url = `${API_BASE_URL}/me/progress/${libraryItemId}`;
    const request = new Request(url);
    request.headers = { "Authorization": `Bearer ${API_TOKEN}` };

    try {
        const response = await request.loadJSON();
        return response;
    } catch (error) {
        console.error("Failed to fetch item progress:", error);
        return null;
    }
}

// Function to fetch the cover image for a library item
async function fetchCoverImage(itemId, width = 75, height = 75) { // Smaller square dimensions
    const imagePath = localFM.joinPath(cachePath, `${itemId}.jpg`);

    // Check if the image is already cached
    if (localFM.fileExists(imagePath)) {
        return localFM.readImage(imagePath);
    }

    // Fetch the cover image from the API
    const url = `${API_BASE_URL}/items/${itemId}/cover?width=${width}&height=${height}&raw=1`;
    const request = new Request(url);
    request.headers = { "Authorization": `Bearer ${API_TOKEN}` };

    try {
        const image = await request.loadImage();
        localFM.writeImage(imagePath, image); // Cache the image
        return image;
    } catch (error) {
        console.error("Failed to fetch cover image:", error);
        return null;
    }
}

// Function to format time into a human-readable format
function formatTime(seconds) {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours < 24) return `${hours}h ${remainingMinutes}m`;
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days}d ${remainingHours}h`;
}

// Function to calculate progress percentage
function calculateProgress(progress) {
    if (!progress || !progress.duration || !progress.currentTime) return 0;
    return Math.round((progress.currentTime / progress.duration) * 100);
}

// Function to truncate title (remove everything after : or -)
function truncateTitle(title) {
    if (!config.truncateTitle) return title; // Skip truncation if disabled
    const separators = [":", "-"];
    for (const sep of separators) {
        const index = title.indexOf(sep);
        if (index !== -1) {
            return title.substring(0, index).trim();
        }
    }
    return title; // Return original title if no separator is found
}

// Function to split and truncate the title
function formatTitle(title) {
    const maxLineLength = 18; // Maximum characters per line
    const maxTotalLength = maxLineLength * 2; // Maximum total characters before truncation

    // If the title is already short, return it as is
    if (title.length <= maxLineLength) {
        return [title]; // Return as a single line
    }

    // Find the first space after 15 characters to avoid breaking words
    let splitIndex = title.lastIndexOf(" ", maxLineLength);

    // If no space is found, split at the maxLineLength
    if (splitIndex === -1) {
        splitIndex = maxLineLength;
    }

    // Split the title into two lines
    let line1 = title.substring(0, splitIndex).trim();
    let line2 = title.substring(splitIndex).trim();

    // Truncate the second line if necessary
    if (line2.length > maxLineLength) {
        line2 = line2.substring(0, 12) + "..."; // Truncate to 12 characters and add ellipsis
    }

    // Return the lines as an array
    return [line1, line2];
}

// Function to create the widget
async function createWidget() {
    const widget = new ListWidget();
    widget.setPadding(12, 12, 12, 12);

    // Set background color based on theme
    if (config.theme === "light") {
        widget.backgroundColor = config.backgroundColor === "lightGrey" ? Color.lightGray() : Color.white();
    } else {
        // Darker dark blue for dark theme
        widget.backgroundColor = config.backgroundColor === "lightGrey" ? Color.gray() : new Color("#001f3f"); // Dark blue
    }

    // Fetch items in progress
    const itemsInProgress = await fetchItemsInProgress();
    if (!itemsInProgress || !itemsInProgress.libraryItems || itemsInProgress.libraryItems.length === 0) {
        const noDataText = widget.addText("No items in progress.");
        noDataText.textColor = config.theme === "light" ? Color.black() : Color.white(); // White text for dark theme
        noDataText.font = Font.mediumSystemFont(14);
        return widget;
    }

    // Fetch progress for each item and attach it to the item object
    const itemsWithProgress = await Promise.all(
        itemsInProgress.libraryItems.map(async (item) => {
            const progressData = await fetchItemProgress(item.id);
            return {
                ...item,
                progress: progressData ? calculateProgress(progressData) : 0,
            };
        })
    );

    // Sort items by progress (ascending order, so the furthest-along item is last)
    itemsWithProgress.sort((a, b) => a.progress - b.progress);

    // Display the items in progress
    const mainStack = widget.addStack();
    mainStack.layoutHorizontally();

    // Adjust spacing based on the number of items
    const numberOfItems = itemsWithProgress.length;
    const spacing = numberOfItems < 4 ? 24 : 8; // Increase spacing for fewer items
    mainStack.spacing = spacing;

    // Calculate the width for each item stack
    const itemWidthPercent = 100 / numberOfItems; // Equal width for each item
    const itemWidth = `calc(${itemWidthPercent}% - ${(numberOfItems - 1) * spacing}px)`; // Adjust for spacing

    for (const item of itemsWithProgress) {
        const itemStack = mainStack.addStack();
        itemStack.layoutVertically();
        itemStack.spacing = 4;
        itemStack.size = new Size(0, 0); // Allow the stack to grow

        // Set the width of the item stack to ensure equal distribution
        itemStack.width = itemWidth;

        // Fetch and display cover image (smaller square)
        const coverImage = await fetchCoverImage(item.id, 75, 75); // Smaller square dimensions
        if (coverImage) {
            const imageElement = itemStack.addImage(coverImage);
            imageElement.imageSize = new Size(75, 75); // Smaller square size
            imageElement.cornerRadius = 8;

            // Apply scaling mode based on config
            if (config.imageScaling === "fill") {
                imageElement.applyFillingContentMode(); // Zoomed in, may crop
            } else {
                imageElement.applyFittingContentMode(); // No cropping
            }

            // Make the image clickable
            const urlScheme = `audiobookshelf://item/${item.id}`; // Replace with the correct URL scheme
            itemStack.url = urlScheme; // Set the URL scheme for the entire stack
        }

        // Display title (split and truncated if necessary)
        const title = truncateTitle(item.media.metadata.title); // Truncate title if enabled
        const formattedTitle = formatTitle(title); // Split and truncate the title

        // Create a vertical stack for the title lines
        const titleStack = itemStack.addStack();
        titleStack.layoutVertically();
        titleStack.spacing = 2;

        // Add each line of the title as a separate text element
        for (const line of formattedTitle) {
            const titleLine = titleStack.addText(line);
            titleLine.font = Font.boldSystemFont(11);
            titleLine.textColor = config.theme === "light" ? Color.black() : Color.white(); // White text for dark theme
            titleLine.lineLimit = 1; // Ensure each line doesn't overflow
        }

        // Ensure there are always two lines for the title
        if (formattedTitle.length < 2) {
            const blankLine = titleStack.addText(" "); // Add a blank line
            blankLine.font = Font.boldSystemFont(12);
            blankLine.textColor = config.theme === "light" ? Color.black() : Color.white(); // Match title color
            blankLine.lineLimit = 1;
        }

        // Display author
        const authorText = itemStack.addText(`by ${item.media.metadata.authorName}`);
        authorText.font = Font.mediumSystemFont(10);
        authorText.textColor = config.theme === "light" ? Color.darkGray() : Color.lightGray(); // Light gray for dark theme
        authorText.lineLimit = 1;

        // Display progress
        const progressText = itemStack.addText(`Progress: ${item.progress}%`);
        progressText.font = Font.mediumSystemFont(10);
        progressText.textColor = config.theme === "light" ? Color.darkGray() : Color.lightGray(); // Light gray for dark theme
        progressText.lineLimit = 1;

        // Add a spacer to distribute space evenly
        itemStack.addSpacer();
    }

    return widget;
}

// Main script execution
const widget = await createWidget();
Script.setWidget(widget);
widget.presentMedium();
Script.complete();
