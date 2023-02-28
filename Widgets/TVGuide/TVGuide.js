
let show = args.widgetParameter
if (show == null) {
  show = "sports"
}

// add refresh of the earliest stop time + 10seconds

let params = args.queryParameters
// log("here")
// log(args.queryParameters)

if ( params.alert == 1 ) {
  log("here")
  log(params.type)
  log(params.desc)
  let a = new Alert();
  	a.title = params.type
  	a.message = params.desc
  	a.addCancelAction("OK");
  	await(a.presentAlert());
}

theKey = "zrT6834Gydreeed"
Version = 1.12
autoUpdate = true
checkVersion(Version)

// this is a param
// this should empty cache folder
forceRefresh = false

// show = "sports"
// show = "general"

// The url below is WIP 
let vURL="https://cranie.com/tv/getShow.php?key=" + theKey + "&id=@id@&date=@yyyymmdd@"

let vLogoURLGeneric = "https://d2n0069hmnqmmx.cloudfront.net/epgdata/1.0/newchanlogos/320/320/skychb@id@.png"
//let vLogoURL="https://e3.365dm.com/tvlogos/channels/@id@-Mobile-Logo.png"

let highlightMe      = new RegExp(/live .* Eng|live snooker|live mosconi|Live.*F1.*GP|live.*darts|chess |poker |the simpsons|red dwarf/, "i")

// Choose from: SkyTV, SkyMobile, TVGuide, RadioTimes, VirginTVGo
Theme = getTheme("SkyMobile")

// hight a multiple of 26 max 26*13 = 338
// length is 2 * 153 = 306
// font sizes should increase too
vBaseCellLength = 150
vBaseCellHeight = 24


// calculate the sizes here
vCellLength = vBaseCellLength
vCellHeight = vBaseCellHeight

// iPhone 11 Pro Max sizes
cellSize      = new Size(vCellLength, vCellHeight)
logoCellSize  = new Size(45, vCellHeight)

let mainText  = new Font("ArialRoundedMT", 9)


// this is the number of characters based on
// font and width 
vStackLimit = 50




vCornerRadius = 4
vBorderWidth = 0.5
// just show an example 
rows = 15

switch (config.widgetFamily) {
  case "medium":
    rows = 5
    break;
  case "large":
    rows = rows
    break;
}




vBackground         = rC(Theme.vBackground)
vLogoBackground     = rC(Theme.vLogoBackground)
vNowBackgroundEven  = rC(Theme.vNowBackgroundEven)
vNextBackgroundEven = rC(Theme.vNextBackgroundEven)
vNowBackgroundOdd   = rC(Theme.vNowBackgroundOdd)
vNextBackgroundOdd  = rC(Theme.vNextBackgroundOdd)
vTitleBackground    = rC(Theme.vTitleBackground)
vTitleTextColor     = rC(Theme.vTitleTextColor)
vTextColor          = rC(Theme.vTextColor)
vHightlightBkGnd    = rC(Theme.vHightlightBkGnd)
vHightlightText     = rC(Theme.vHightlightText)
vHightlightProg     = rC(Theme.vHightlightProg)
vProgressLine       = rC(Theme.vProgressLine)
vBorder             = rC(Theme.vBorder)
colourWhite         = rC(Theme.colourWhite)




vDebugTime  = 0
updateTime  = getNow(vDebugTime, "jhm")
theDateTime = getNow(vDebugTime, "h")
theDate     = getNow(vDebugTime, "ymd")
theDateOne  = getNow(24, "ymd")
theDateYest = getNow(-24, "ymd")
vNowEpoch   = Epoch(Date.now())


general = [
{ "id": "2074", "name": "BBC One HD" },
{ "id": "2075", "name": "BBC Two HD" },
{ "id": "1402", "name": "Sky One" },
{ "id": "3809", "name": "Dave HD" },
{ "id": "4075", "name": "Channel 4 HD" },
{ "id": "2320", "name": "Dave ja vu" },
{ "id": "4061", "name": "Sky One HD" },
{ "id": "6533", "name": "ITV3 HD" },
{ "id": "6534", "name": "ITV4 HD" },
{ "id": "4076", "name": "E4 HD" },
{ "id": "4043", "name": "More4 HD" },
{ "id": "4044", "name": "Film4 HD" },
{ "id": "4074", "name": "SYFY HD" },
{ "id": "2104", "name": "BBC One Yorks" }
]


sports = [
{ "id": "1301", "name": "Sky Sports Main Event" },
{ "id": "1302", "name": "Sky Sports Cricket" },
{ "id": "1306", "name": "Sky Sports F1" },
{ "id": "1333", "name": "Sky Sports Action" },
{ "id": "4091", "name": "Sky Sports Mix" },
{ "id": "1303", "name": "Sky Sports Premier League" },
{ "id": "3838", "name": "Sky Sports Football" },
{ "id": "1322", "name": "Sky Sports Golf" },
{ "id": "3839", "name": "Sky Sports Arena" },
{ "id": "1314", "name": "Sky Sports News" },
{ "id": "1150", "name": "Freesports" },
{ "id": "4004", "name": "Eurosport 1 HD" },
{ "id": "4009", "name": "Eurosport 2 HD" },
{ "id": "3661", "name": "BT Sport 1" },
{ "id": "3663", "name": "BT Sport 2" }
]

// sports = [
// { "id": "1314", "name": "Sky Sports News" },
// { "id": "4004", "name": "Eurosport 1 HD" },
// { "id": "4009", "name": "Eurosport 2 HD" }
// ]

if ( show == "sports" ) {
  showsToShow = sports
  vLogoURL = vLogoURLGeneric
} else { 
  showsToShow = general
  vLogoURL = vLogoURLGeneric
}

let widget = new ListWidget()
widget.backgroundColor = vBackground
//let titleLogo = await getImage("Sky-Sports-Logo.png", "https://e1.365dm.com/tvlogos/channels/Sky-Sports-Logo.png")
let titleLogo = await getImage("Sky-Logo.png", "https://images.squarespace-cdn.com/content/v1/5305718de4b0e8a52d75a8cc/1502331535810-WDRY753TY9YN67EAPFKU/ke17ZwdGBToddI8pDm48kLXCf88_9uNTKXkq27cF4sB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmwbA6upbL5Bu97tJociXJklKprRMdH2Tl4F1PjaoPT3YUs5wkl5ojCV1O900UJ7ME/image-asset.png")

let titleStack = widget.addStack()
  titleStack.size = new Size(350, vCellHeight / 2)
  theLogo = titleStack.addImage(titleLogo)
  theLogo.imageSize = new Size(50, vCellHeight)
  titleStack.centerAlignContent()
let title = titleStack.addText(" - Sky TV Guide - @" + updateTime)
  title.font = Font.boldSystemFont(10)
  title.textColor = vTitleTextColor

widget.addSpacer(7)
vShowCount = 1
for (var key in showsToShow) {
  earlyEnd = 0
  if ( vShowCount > rows ) {
    break
  } else {
    vShowCount++
  }
  
  if (showsToShow.hasOwnProperty(key)) {
    var mainStack = widget.addStack()
      mainStack.layoutHorizontally()
    var columnOneStack = mainStack.addStack()
      columnOneStack.layoutVertically()
      columnOneStack.size = logoCellSize
    var columnTwoStack = mainStack.addStack()
      columnTwoStack.layoutHorizontally()
    var nowStack = columnTwoStack.addStack()
      nowStack.layoutVertically()
      nowStack.size = cellSize
    var nextStack = columnTwoStack.addStack()
      nextStack.layoutVertically()
      nextStack.size = cellSize
    
    theID      = showsToShow[key].id
    vEPGURL    = vURL.replace(/@yyyymmdd@/, theDate).replace(/@id@/, theID)
    vEPGURLONE = vURL.replace(/@yyyymmdd@/, theDateOne).replace(/@id@/, theID)
    tvGuide    = await getString(vEPGURL, theID, theDate)
    tvGuideOne = await getString(vEPGURLONE, theID, theDateOne)
    
    vLogoImageURL = vLogoURL.replace(/@id@/, showsToShow[key].id)
    theLogo = await getImage(showsToShow[key].id + ".png", vLogoImageURL)      
    image = columnOneStack.addImage(theLogo)
    columnOneStack.centerAlignContent()
    image.centerAlignImage()
    image.imageSize = new Size(40, vCellHeight)
      columnOneStack.setPadding(0, 2, 0, 2)
      columnOneStack.backgroundColor = vBackground
      columnOneStack.borderColor = vBorder
      columnOneStack.borderWidth = vBorderWidth
      columnOneStack.cornerRadius = vCornerRadius

    vCount = 1
    columnOneStack.backgroundColor = vLogoBackground
     
    vComplete = ""
    
    for ( k in tvGuide.schedule[0].events ) {
      finishTime = tvGuide.schedule[0].events[k].st + tvGuide.schedule[0].events[k].d      
      checkTime = getNow(0, "h", finishTime )
      if ( (parseInt(checkTime) >= parseInt(theDateTime) ) && ( vCount <= 2 ) ) {
        startTime = getNow(0, "jhm",tvGuide.schedule[0].events[k].st)
        
        vTitle = await shortenMe(tvGuide.schedule[0].events[k].t)
        vTitle = startTime + " " + vTitle
        vTitle = vTitle.substring(0, vStackLimit)
        if ( (key % 2) == 0 ) {
          vNowBackground  = vNowBackgroundEven
          vNextBackground = vNextBackgroundEven
        } else {
          vNowBackground  = vNowBackgroundOdd
          vNextBackground = vNextBackgroundOdd
        }
        
        if ( vCount == 1 ) { 
          if (earlyEnd < finishTime) { earlyEnd = finishTime }
          theDescription = tvGuide.schedule[0].events[k].sy
          vShowUrl = "scriptable:///run?scriptName=TVGuide&alert=1&type=desc&desc=" + encodeURI(theDescription)

          vLineLength = vCellLength * ((vNowEpoch - tvGuide.schedule[0].events[k].st) / tvGuide.schedule[0].events[k].d)
          
          createEntry(vTitle,  nowStack,  vNowBackground, vShowUrl, vLineLength) 
          vComplete = "Now"
        }
        if ( vCount == 2 ) { 
          if (earlyEnd > finishTime) { let earlyEnd = finishTime }
          theDescription = tvGuide.schedule[0].events[k].sy
          vShowUrl = "scriptable:///run?scriptName=TVGuide&alert=1&type=desc&desc=" + encodeURI(theDescription)
          
          vLineLength = vCellLength * ((vNowEpoch - tvGuide.schedule[0].events[k].st) / tvGuide.schedule[0].events[k].d)
          createEntry(vTitle, nextStack, vNextBackground, vShowUrl, vLineLength) 
          vComplete = "Next"
        }
        vCount++ 
      }
      if ( vComplete == "Next" ) { 
        break 
      }
     }
  }

  // I think this fixes it all??????
  if ( vComplete == "Now" ) { 
    for ( eventID in tvGuideOne.schedule[0].events ) {
      if ( parseInt(tvGuideOne.schedule[0].events[eventID].st = earlyEnd ) ) {
        startTime = getNow(0, "jhm",tvGuideOne.schedule[0].events[eventID].st)
        vTitle = await shortenMe(tvGuideOne.schedule[0].events[eventID].t)
        vTitle = startTime + " " + vTitle
        vTitle = vTitle.substring(0, vStackLimit)
        if ( (key % 2) == 0 ) {
          vNextBackground = vNextBackgroundEven
        } else {
          vNextBackground = vNextBackgroundOdd
        }
        theDescription = tvGuideOne.schedule[0].events[eventID].sy
        vShowUrl = "scriptable:///run?scriptName=TVGuide&alert=1&type=desc&desc=" + encodeURI(theDescription)
        createEntry(vTitle, nextStack, vNextBackground, vShowUrl, 0) 
      }
      break 
    }
  } 
//   this is the earliest finish time
// yyyy-mm-dd
//   let formatter = new DateFormatter()
//   formatter.dateFormat = "yyyy-MM-dd'T'HH:mmZ"
//   end = formatter.date(earlyEnd + "T05:00Z")
  end = getNow(0, "h", earlyEnd)
  widgetrefreshAfterDate = end
}


if ( config.runsInWidget == true) {
  Script.setWidget(widget)
}
// Debug:
if ( params.alert != 1 ) {
  widget.presentLarge()
}

// ------------------------------------------------
// ------------------------------------------------
// ---------  FUNCTIONS only here -----------------
// ------------------------------------------------
// ------------------------------------------------

function rC(hex) { return new Color(hex) }

function createEntry(theText, theStack, vBackgroundCol, addURL, lineLength) {
  theStack.setPadding(1, 2, 1, 2)
//   lineLength = Math.abs(lineLength)
  overlay = theStack.addStack()
    overlay.size = new Size(lineLength, 1)
    overlay.backgroundColor = checkHighlight(theText, vBackgroundCol, "progress")
  
  theNow = theStack.addText(theText)
  theNow.font = mainText
  theNow.textColor = checkHighlight(theText, vBackgroundCol, "text")
  theStack.backgroundColor = checkHighlight(theText, vBackgroundCol, "cell")
  theStack.borderColor = vBorder
  theStack.borderWidth = vBorderWidth
  theStack.cornerRadius = vCornerRadius
  theStack.url = addURL
} 

function checkHighlight(theText, defaultColour, textOrCell) {
  if ( theText.match(highlightMe) ) {
    theColourCell     = vHightlightBkGnd
    theColourText     = vHightlightText
    theColourProgress = vHightlightProg
  } else {
    theColourCell     = defaultColour
    theColourText     = vTextColor
    theColourProgress = vProgressLine
  }
  if ( textOrCell == "cell" ) {
    return theColourCell
  } 
  if ( textOrCell == "text" ) {
    return theColourText
  }
  if ( textOrCell == "progress" ) {
    return theColourProgress
  }
}



async function shortenMe(text) {
  text = text.replace("England", "Eng").replace("S Africa", "SA").replace("Formula One", "F1").replace(/highlights/gi, "hlts")
  //.replace("The Home Of ", "Home Of ").replace(" - ", ": ")
  return text
}



async function getLocalFile(fileName) {
  let fm = FileManager.iCloud()
  let path = fm.documentsDirectory() + "/xmltv/cache/"
  if ( fm.isDirectory(path) == false) {
    fm.createDirectory(path)
  }
  let pathToFile = path + fileName
//   let pathToFile = fm.joinPath(dir, fileName)
  if ( fm.fileExists(pathToFile) ) {
    await fm.downloadFileFromiCloud(pathToFile)
    theOutput = fm.readString(pathToFile)
    theOutput = JSON.parse(theOutput.toString());
    return theOutput
  }
}


async function checkVersion(Version) {
  // check if allowed to update then run
  if ( autoUpdate == false ) { return }
  vVersionUrl = "https://raw.githubusercontent.com/0507spc/ScriptStore/main/Widgets/TVGuide/version.json"
  let fReq = new Request(vVersionUrl)
    output = await fReq.loadJSON()
    //log(output.Version)
    if ( parseFloat(output.Version) > parseFloat(Version) ) {
      //
      log("There is a new version: " + output.Version)
      thisScript = Script.name() + ".js"
      let fm = FileManager.iCloud()
      let toUpdate = fm.documentsDirectory() + "/" + thisScript
      
      if (fm.fileExists(toUpdate) == true) {
        //log("Let's update")
        updateLink = "https://raw.githubusercontent.com/0507spc/ScriptStore/main/Widgets/TVGuide/TVGuide.js"
        let fReq = new Request(updateLink)
        updateString = await fReq.loadString()
        fm.writeString(toUpdate, updateString)
      }
      
      //if (
    }
}


async function getString(urlName, theID, whatDate) {
  
  theFileName      = whatDate + "_" + theID + ".json"
  theFileNameYest  = theDateYest + "_" + theID + ".json"
  
  let fm = FileManager.iCloud()
  let dir = fm.documentsDirectory() + "/xmltv/cache/"
  if ( fm.isDirectory(dir) == false) {
    fm.createDirectory(dir, true)
  }
  let path = fm.joinPath(dir, theFileName)
  
  let pathYest = fm.joinPath(dir, theFileNameYest)
  if (fm.fileExists(pathYest) == true) {
    fm.remove(pathYest)
  }
  
  if ( fm.fileExists(path) == false || forceRefresh == true) {
      
  
  try {
    let fReq = new Request(urlName)
    output = await fReq.loadJSON()
    fm.writeString(path, JSON.stringify(output, null, 4))
} catch (objError) {
    if (objError instanceof SyntaxError) {
        console.error(objError.name);
        log(objError.name)
    } else {
        console.error(objError.message);
        log(objError.message)
    }
}
  
  
  
//     let fReq = new Request(urlName)
//     output = await fReq.loadJSON()
//     fm.writeString(path, JSON.stringify(output, null, 4))
  } else {
    output = getLocalFile(theFileName)
  }
  return output
}

// get images from local filestore or download them once
async function getImage(image, vImageURL) {
  let fm = FileManager.iCloud()
  let dir = fm.documentsDirectory() + "/xmltv/icons/"
  if ( fm.isDirectory(dir) == false) {
    fm.createDirectory(dir, true)
  }
  
  let path = fm.joinPath(dir, image)
  if(fm.fileExists(path)) {
    await fm.downloadFileFromiCloud(path)
    return fm.readImage(path)
  } else {
    // download once
    let iconImage = await loadImage(vImageURL)
    fm.writeImage(path, iconImage)
    return iconImage
  }
}


// helper function to download an image from a given url
async function loadImage(imgUrl) {
    const req = new Request(imgUrl)
    return await req.loadImage()
}
 


function getNow(addHours, fmt, epoch) {
  // could have a format passed in
  if ( epoch != null ) {
    nowDate = EpochToDate(epoch)
  } else {
    nowDate = new Date()
  }
  nowDate.setHours(nowDate.getHours() + addHours)
  
  nowHour = ("0" + nowDate.getHours().toString()).slice(-2)         // Get the hour (0-23)
  nowMin  = ("0" + nowDate.getMinutes().toString()).slice(-2)       // Get the minutes (0-59)
  nowMon  = ("0" + (nowDate.getMonth() + 1).toString()).slice(-2)   // Get the month (0-11)
  nowDay  = ("0" + nowDate.getDate().toString()).slice(-2)          // Get the day as a number (1-31)
  nowYear = nowDate.getFullYear().toString()                        // Get the four digit year (yyyy)
  nowSec  = ("0" + nowDate.getSeconds().toString()).slice(-2)       // Get the seconds (0-59)
  if ( fmt == "d" ) {
    theFormat = nowYear + nowMon + nowDay //+ nowHour //+ nowMin + nowSec
  }
  if ( fmt == "h" ) {
    theFormat = nowYear + nowMon + nowDay + nowHour + nowMin + nowSec
  }
  if ( fmt == "jhm" ) {
    theFormat = nowHour + ":" + nowMin
  }
  if ( fmt == "ymd" ) {
    theFormat = nowYear + nowMon + nowDay
  }
  return theFormat
}

//Epoch
function Epoch(date) {
    return Math.round(new Date(date).getTime() / 1000.0);
}

//Epoch To Date
function EpochToDate(epoch) {
    if (epoch < 10000000000)
        epoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
    var epoch = epoch + (new Date().getTimezoneOffset() * -1); //for timeZone        
    return new Date(epoch);
}


function getTheme(themeName) {
  //
  themes= {
  "SkyTV": { 
   "vBackground"          : "#0065C9" ,
   "vLogoBackground"      : "#0065C9" ,
   "vNowBackgroundEven"   : "#1277D0" ,
   "vNextBackgroundEven"  : "#0057AF" ,
   "vNowBackgroundOdd"    : "#1277D0" ,
   "vNextBackgroundOdd"   : "#0057AF" ,
   "vTitleBackground"     : "#005CB7" ,
   "vTitleTextColor"      : "#FFFFFF" ,
   "vTextColor"           : "#FEFFFE" ,
   "vHightlightBkGnd"     : "#FFFC2D" ,
   "vHightlightText"      : "#856A00" ,
   "vBorder"              : "#3381CF" ,
   "colourWhite"          : "#FFFFFF" ,
   "vHightlightProg"      : "#2F4F4F" ,
   "vProgressLine"        : "#A9A9A9"
  },
  "SkyMobile": { 
   "vBackground"          : "#152966" ,
   "vLogoBackground"      : "#013F86" ,
   "vNowBackgroundEven"   : "#003E84" ,
   "vNextBackgroundEven"  : "#003E84" ,
   "vNowBackgroundOdd"    : "#0F2F72" ,
   "vNextBackgroundOdd"   : "#0F2F72" ,
   "vTitleBackground"     : "#005CB7" ,
   "vTitleTextColor"      : "#FFFFFF" ,
   "vTextColor"           : "#FEFFFE" ,
   "vHightlightBkGnd"     : "#FFFC2D" ,
   "vHightlightText"      : "#856A00" ,
   "vBorder"              : "#000022" ,
   "colourWhite"          : "#FFFFFF" ,
   "vHightlightProg"      : "#2F4F4F" ,
   "vProgressLine"        : "#A9A9A9"
  },
  "TVGuide": { 
   "vBackground"          : "#F7F8FA" ,
   "vLogoBackground"      : "#FDFEFD" ,
   "vNowBackgroundEven"   : "#FDFEFD" ,
   "vNextBackgroundEven"  : "#FDFEFD" ,
   "vNowBackgroundOdd"    : "#FDFEFD" ,
   "vNextBackgroundOdd"   : "#FDFEFD" ,
   "vTitleBackground"     : "#F7F8FA" ,
   "vTitleTextColor"      : "#FFFFFF" ,
   "vTextColor"           : "#000000" ,
   "vHightlightBkGnd"     : "#EEEEF6" ,
   "vHightlightText"      : "#856A00" ,
   "vBorder"              : "#C4C5E2" ,
   "colourWhite"          : "#FFFFFF" ,
   "vHightlightProg"      : "#2F4F4F" ,
   "vProgressLine"        : "#A9A9A9"
  },
  "RadioTimes": { 
   "vBackground"          : "#2D2E30" ,
   "vLogoBackground"      : "#999999" ,
   "vNowBackgroundEven"   : "#FEFFFE" ,
   "vNextBackgroundEven"  : "#FEFFFE" ,
   "vNowBackgroundOdd"    : "#EEF1F2" ,
   "vNextBackgroundOdd"   : "#EEF1F2" ,
   "vTitleBackground"     : "#2D2E30" ,
   "vTitleTextColor"      : "#FFFFFF" ,
   "vTextColor"           : "#343434" ,
   "vHightlightBkGnd"     : "#0ABDCD" ,
   "vHightlightText"      : "#856A00" ,
   "vBorder"              : "#DBDCDB" ,
   "colourWhite"          : "#FFFFFF" ,
   "vHightlightProg"      : "#2F4F4F" ,
   "vProgressLine"        : "#A9A9A9"
  },
  "VirginTVGo": { 
   "vBackground"          : "#322332" ,
   "vLogoBackground"      : "#261926" ,
   "vNowBackgroundEven"   : "#4B354C" ,
   "vNextBackgroundEven"  : "#4B354C" ,
   "vNowBackgroundOdd"    : "#4B354C" ,
   "vNextBackgroundOdd"   : "#4B354C" ,
   "vTitleBackground"     : "#322332" ,
   "vTitleTextColor"      : "#FFFFFF" ,
   "vTextColor"           : "#FEFFFE" ,
   "vHightlightBkGnd"     : "#261926" ,
   "vHightlightText"      : "#E9E9EA" ,
   "vBorder"              : "#322332" ,
   "colourWhite"          : "#FFFFFF" ,
   "vHightlightProg"      : "#2F4F4F" ,
   "vProgressLine"        : "#A9A9A9"
  }
}

  return themes[themeName]

}
