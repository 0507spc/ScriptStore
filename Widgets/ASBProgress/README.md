# Audiobookshelf Widget for Scriptable

This script creates a widget for the [Scriptable](https://scriptable.app/) app that displays your in-progress audiobooks from [Audiobookshelf](https://www.audiobookshelf.org/). The widget shows the cover art, title, author, and progress for each item, and clicking on an item opens it directly in the Audiobookshelf app.

## Features

- **Dynamic Layout**: Automatically adjusts based on the number of items (up to 4).
- **Customizable Themes**: Supports light and dark themes with configurable background colors.
- **Title Truncation**: Optionally removes text after `:` or `-` in titles.
- **Image Scaling**: Choose between `fit` (no cropping) or `fill` (zoomed in, may crop) for cover images.
- **Clickable Items**: Tap on an item to open it in the Audiobookshelf app.
- **Progress Tracking**: Displays the progress percentage for each item.

## Installation

### Prerequisites

1. **Scriptable App**: Install [Scriptable](https://scriptable.app/) on your iOS device.
2. **Audiobookshelf Server**: Ensure you have access to an Audiobookshelf server with the API enabled.
3. **API Token**: Obtain an API token from your Audiobookshelf server.

### Steps

1. **Copy the Script**:
   - Open the script in this repository (`audiobookshelf-widget.js`).
   - Copy the entire script to your clipboard.

2. **Create a New Script in Scriptable**:
   - Open the Scriptable app.
   - Tap the `+` button to create a new script.
   - Paste the copied script into the editor.

3. **Configure the Script**:
   - Replace the placeholders in the script with your Audiobookshelf server URL and API token:
     ```javascript
     const API_BASE_URL = "https://audiobookshelf.server.com/api"; // Replace with your server URL
     const API_TOKEN = "token"; // Replace with your API token
     ```

4. **Save the Script**:
   - Tap the script name at the top to rename it (e.g., `Audiobookshelf Widget`).
   - Tap `Done` to save the script.

5. **Add the Widget to Your Home Screen**:
   - Long-press on your home screen and tap the `+` button to add a widget.
   - Search for `Scriptable` and select the medium-sized widget.
   - Tap the widget and select the `Audiobookshelf Widget` script.

## Configuration

The script supports the following configuration options, which can be set via the widget parameters:

### Default Configuration

```json
{
    "theme": "dark",
    "backgroundColor": "darkBlue",
    "numberOfItems": 3,
    "imageScaling": "fit",
    "truncateTitle": true
}
```

### Options

- **`theme`**: The theme of the widget. Options: `"light"`, `"dark"`.
- **`backgroundColor`**: The background color of the widget. Options: `"lightGrey"`, `"darkBlue"`.
- **`numberOfItems`**: The number of items to display (up to 4).
- **`imageScaling`**: How cover images are scaled. Options: `"fit"` (no cropping), `"fill"` (zoomed in, may crop).
- **`truncateTitle`**: Whether to remove text after `:` or `-` in titles. Options: `true`, `false`.

### Setting Widget Parameters

1. **Edit the Widget**:
   - Long-press the widget on your home screen and select `Edit Widget`.

2. **Set Parameters**:
   - In the `Parameter` field, enter a JSON object with your desired configuration. For example:
     ```json
     {
         "theme": "light",
         "backgroundColor": "lightGrey",
         "numberOfItems": 4,
         "imageScaling": "fill",
         "truncateTitle": false
     }
     ```

3. **Save Changes**:
   - Tap outside the widget to save your changes.

## Usage

- The widget will automatically update to display your in-progress audiobooks.
- Tap on any item to open it in the Audiobookshelf app.
- Customize the widget's appearance and behavior using the configuration options.

## Troubleshooting

- **No Items Displayed**: Ensure your Audiobookshelf server is accessible and the API token is correct.
- **Images Not Loading**: Check your server's cover art settings and ensure the API endpoint is reachable.
- **Widget Not Updating**: Verify that the script is set as the widget's source and that the widget parameters are valid JSON.

## Contributing

If you have suggestions or improvements, feel free to open an issue or submit a pull request. Contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
