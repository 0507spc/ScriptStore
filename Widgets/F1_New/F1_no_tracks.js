// Define F1 team colors
const teamColors = {
  "Mercedes": "#00D2BE",
  "Red Bull": "#1E41FF",
  "Ferrari": "#DC0000",
  "McLaren": "#FF8700",
  "Aston Martin": "#006F62",
  "Alpine F1 Team": "#0090FF",
  "AlphaTauri": "#2B4562",
  "Alfa Romeo": "#900000",
  "Williams": "#007A43",
  "Haas": "#F0D787"
};

// define some emojis for the tracks
//   const monacoEmoji = f1TrackEmojis["Monaco Grand Prix"]; // Returns "🇲🇨🏎️"
const f1TrackEmojis = {
  "Bahrain Grand Prix": "🐪🏎️",
  "Saudi Arabian Grand Prix": "🏜️🏎️",
  "Australian Grand Prix": "🦘🏎️",
  "Azerbaijan Grand Prix": "🇦🇿🏎️",
  "Miami Grand Prix": "🌴🏎️",
  "Emilia Romagna Grand Prix": "🇮🇹🏎️",
  "Monaco Grand Prix": "🇲🇨🏎️",
  "Spanish Grand Prix": "🇪🇸🏎️",
  "Canadian Grand Prix": "🍁🏎️",
  "Austrian Grand Prix": "🇦🇹🏎️",
  "British Grand Prix": "🇬🇧🏎️",
  "Hungarian Grand Prix": "🇭🇺🏎️",
  "Belgian Grand Prix": "🇧🇪🏎️",
  "Dutch Grand Prix": "🇳🇱🏎️",
  "Italian Grand Prix": "🇮🇹🏎️",
  "Singapore Grand Prix": "🇸🇬🏎️",
  "Japanese Grand Prix": "🇯🇵🏎️",
  "Qatar Grand Prix": "🇶🇦🏎️",
  "United States Grand Prix": "🇺🇸🏎️",
  "Mexico City Grand Prix": "🇲🇽🏎️",
  "São Paulo Grand Prix": "🇧🇷🏎️",
  "Las Vegas Grand Prix": "🎲🏎️",
  "Abu Dhabi Grand Prix": "🇦🇪🏎️"
};


async function getDriverAbbreviation(familyName) {
  const request = new Request(`http://ergast.com/api/f1/2023/drivers.json`);
  const response = await request.loadJSON();
  const drivers = response.MRData.DriverTable.Drivers;
  for (let driver of drivers) {
    if (driver.familyName === familyName) {
      return driver.code;
    }
  }
  return '';
}


// Fetch F1 data from API
const f1Data = await new Request('https://ergast.com/api/f1/current/next.json').loadJSON();

// Get the name of the next race
const raceName = f1Data.MRData.RaceTable.Races[0].raceName;
const subRaceName = f1TrackEmojis[raceName];

// Get the date and time of the next race
console.log(f1Data.MRData.RaceTable.Races[0].date + "T" + f1Data.MRData.RaceTable.Races[0].time)
const raceDateTime = f1Data.MRData.RaceTable.Races[0].date + "T" + f1Data.MRData.RaceTable.Races[0].time;
const raceDate = new Date(raceDateTime);
const daysToGo = Math.ceil((raceDate.getTime() - Date.now()) / (1000 * 3600 * 24));

// Get the driver standings
const standingsData = await new Request('https://ergast.com/api/f1/current/driverStandings.json').loadJSON();

// top 5
const driverStandings = standingsData.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0, 5);

// Create widget
let widget = new ListWidget();
widget.backgroundColor = new Color("#1A1A1A");





// Header with race name
let headerStack = widget.addStack();
headerStack.layoutHorizontally();
headerStack.addSpacer()
let raceNameText = headerStack.addText(raceName + " • " + subRaceName);
raceNameText.font = Font.boldSystemFont(18);
raceNameText.textColor = Color.white();
raceNameText.centerAlignText();
headerStack.addSpacer()

// Horizontal stack with race info and driver standings
let mainStack = widget.addStack();
mainStack.layoutHorizontally();

// Race info stack
let raceInfoStack = mainStack.addStack();
raceInfoStack.layoutVertically();
raceInfoStack.addSpacer();
let raceDateTimeText = raceInfoStack.addText("Next Race Date:")
raceDateTimeText = raceInfoStack.addText(raceDate.toLocaleDateString() + " " + raceDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
raceDateTimeText.font = Font.systemFont(16);
raceDateTimeText.textColor = Color.white();
let daysToGoText = raceInfoStack.addText(daysToGo.toString() + " days to go");
daysToGoText.font = Font.systemFont(16);
daysToGoText.textColor = Color.white();
raceInfoStack.addSpacer();

mainStack.addSpacer(35)

// Driver standings stack
let driverStack = mainStack.addStack();
driverStack.layoutVertically();
driverStack.addSpacer(20)
for (let driver of driverStandings) {
  let driverStackRow = driverStack.addStack();
  driverStackRow.centerAlignContent();
  let driverPositionText = driverStackRow.addText(driver.position);
  driverPositionText.font = Font.boldSystemFont(14);
  driverPositionText.textColor = Color.white();
  driverStackRow.addSpacer(10);
  let driverNameText = driverStackRow.addText(await getDriverAbbreviation(driver.Driver.familyName));
  driverNameText.font = Font.systemFont(14);
  driverNameText.textColor = Color.white();
  driverNameText.minimumScaleFactor = 0.5;
  driverNameText.lineLimit = 1;
  driverStackRow.addSpacer();
  let driverTeamText = driverStackRow.addText(driver.Constructors[0].name);
  driverTeamText.font = Font.systemFont(14);
  driverTeamText.textColor = new Color(teamColors[driver.Constructors[0].name]);
  driverTeamText.minimumScaleFactor = 0.5;
  driverTeamText.lineLimit = 1;
  driverStackRow.addSpacer();
  let driverPoints = driverStackRow.addText(driver.points);
  driverPoints.font = Font.systemFont(14);
  driverPoints.textColor = Color.white();
  driverPoints.minimumScaleFactor = 0.5;
  driverPoints.lineLimit = 1;
  
}











// Present widget
if (config.runsInWidget) {
Script.setWidget(widget);
Script.complete();
} else {
await widget.presentMedium();
}

