

// 1616779400

let inputStr = args.widgetParameter
if ( inputStr == null ) { inputStr = "ferrari@1616979400" }
var res = inputStr.split("@")
let selectedTheme = res[0]
let vDate = res[1]
log(vDate)
if ( selectedTheme == null || selectedTheme == "" ) { selectedTheme = "mclaren" } else { selectedTheme = selectedTheme.toLowerCase() }

vURL = "https://raw.githubusercontent.com/sportstimes/f1/main/_db/f1/2021.json"
vLogo = "https://raw.githubusercontent.com/sportstimes/f1/main/_public/f1/apple-touch-icon.png"

let simpleEmoji = new Font("Menlo-Regular", 8)
let mainText = new Font("GillSans-SemiBold", 14)
let subText = new Font("GillSans-SemiBold", 12)
let titleTextFont = new Font("GillSans-SemiBold", 18)
Theme = getTheme(selectedTheme)


let jg = await getJson(vURL)

//  log(jg)

//vDate = vDate || Epoch(new Date())
vDate = vDate ? vDate : vDate = Epoch(new Date())


log(vDate)

for (var key in jg.races) {
  vGP         = jg.races[key].sessions.gp
  vGPepoch    = Epoch(vGP)
  
  if ( vDate <= vGPepoch ) {  
    vLoc        = jg.races[key].location
    vSlug       = jg.races[key].slug
    vlocaleKey  = jg.races[key].localeKey
    vName       = jg.races[key].name
    vImage      = "./tracks/" + vLoc + ".png"
    vFlag       = getFlag(vLoc)
    vTBC        = jg.races[key].tbc
    vRnd        = jg.races[key].round
    vLong       = jg.races[key].longitude
    vLat        = jg.races[key].latitude
    vAff        = jg.races[key].affiliate
    vFP1        = Epoch(jg.races[key].sessions.fp1)
    vFP2        = Epoch(jg.races[key].sessions.fp2)
    vFP3        = Epoch(jg.races[key].sessions.fp3)
    vQuali      = Epoch(jg.races[key].sessions.qualifying)
    
//     what is the  ext non race session here
// be lazy  
    checkFP1 = vFP1 - vDate
    log(checkFP1)
    checkFP2 = vFP2 - vDate
    log(checkFP2)
    checkFP3 = vFP3 - vDate
    log(checkFP3)
    checkQuali = vQuali - vDate
    log(checkQuali)

if ( checkFP1 < 0 ) {
  if ( checkFP2 < 0 ) {
    if ( checkFP3 < 0 ) {
      if ( checkQuali < 0 ) {
        next = "Race"
      } else {
        next = "Quali"  + returnDateSnippet(vQuai)
      }
    } else {
      next = "FP3" + returnDateSnippet(vFP3)
    }
  } else {
    next = "FP2" + returnDateSnippet(vFP2)
  }
} else {
  next = "FP1" + returnDateSnippet(vFP1)
}
    
    break
  }

}

let widget = new ListWidget()
widget.backgroundColor = rC(Theme.vBackground)


let titleLogo = await getImage("F1.jpg", "https://")

log(1)
log(vLoc)
let titleTrackTmp = await getImage(vLoc + ".png", "https://")
log(2)

let titleTrack = await processImage(titleTrackTmp, Theme.vBackground, Theme.vTrack, vTBC, Theme.vTBC)

let trackWidth = 120
let trackHeight = (titleTrack.size.height / titleTrack.size.width) * trackWidth




let widgetMainStack = widget.addStack()
  widgetMainStack.layoutHorizontally()
  widgetMainStack.centerAlignContent()
  
  widgetMainStack.size = new Size(350, 160)
//   widgetMainStack.setPadding(50, 0, 40, 0)
  widgetMainStack.borderColor = rC(Theme.vBorder)
  widgetMainStack.borderWidth = 6
  widgetMainStack.cornerRadius = 20
  widgetMainStack.backgroundColor = rC(Theme.vBackground)
  
  let widgetLeftStack  = widgetMainStack.addStack()
    widgetLeftStack.layoutVertically()
  widgetMainStack.addSpacer(15)
    let widgetLeftTitleStack   = widgetLeftStack.addStack()
    widgetLeftTitleStack.layoutVertically()
    
    let widgetLeftDetailsStack = widgetLeftStack.addStack()
    widgetLeftDetailsStack.layoutVertically()
    
    
  let widgetRightStack = widgetMainStack.addStack()
 
  
  theTitle = widgetLeftTitleStack.addText(vFlag + " " + toUpper(vSlug, '-', ' '))
    theTitle.font = titleTextFont
    theTitle.textColor = rC(Theme.vTitle)
  theLogo = widgetRightStack.addImage(titleTrack)
    theLogo.imageSize = new Size(trackWidth, trackHeight)
    
    
  widgetLeftDetailsStack.setPadding(0, 30, 0, 0) 
  
  theDetailSub = widgetLeftDetailsStack.addText(vLoc)
    theDetailSub.font = subText
    theDetailSub.textColor = rC(Theme.vDetails)
    
  theDetailRace = widgetLeftDetailsStack.addText("Race" + returnDateSnippet(vGPepoch))
    theDetailRace.font = mainText
    theDetailRace.textColor = rC(Theme.vDetails)
    
    
    
  //This needs calculating to show the next practice / quali / race
  theDetailPractice = widgetLeftDetailsStack.addText(next)
    theDetailPractice.font = mainText
    theDetailPractice.textColor = rC(Theme.vDetails)



  widget.presentMedium()
  
  
  
  
  
  


// ---------  FUNCTIONS only here ------------

function returnDateSnippet(sesh) {
  daysToGo  = Math.floor(((sesh - vDate) / 60 / 60 / 24 ))
  hoursToGo = Math.floor((sesh - vDate - (daysToGo * 24 * 60 * 60) ) / 60 / 60)
  return ": in " +  daysToGo + " days, " + hoursToGo + " hours."
}



function toUpper(str, delim, joinDelim) {
return str
    .toLowerCase()
    .split(delim)
    .map(function(word) {
        return word[0].toUpperCase() + word.substr(1);
    })
    .join(joinDelim);
 }

async function getJson(urlName) {
  let fReq = new Request(urlName)
  let output = await fReq.loadJSON()
  return output
}

async function getString(urlName, id) {
  let fReq = new Request(urlName)
  let output = await fReq.loadString()
  return output
}

async function getRemoteImage(imageURL) {
  let req = new Request(imageURL)
  let theImage = await req.loadImage()
  return theImage
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
  if ( fmt == "y-m-d" ) {
    theFormat = nowYear + "-" + nowMon + "-" + nowDay
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

// get images from local filestore or download them once
async function getImage(image, vImageURL) {
  let fm = FileManager.iCloud()
  let dir = fm.documentsDirectory() + "/tracks/"
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



function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


function rC(hex) { return new Color(hex) }

function getTheme(themeName) {
  // These are going to be based on posters / press releases.
  // Renault https://cdn.shopify.com/s/files/1/0489/8357/2629/products/OconRS201_1800x1800.jpg?v=1606312380
  // McLaren - https://www.pinterest.co.uk/pin/246853623311212336/
  // Mercedes - based on: https://www.facebook.com/SilverArrowsNet/photos/a.102656654565339/167469901417347/
  // Ferrari - based on: https://www.instagram.com/p/CKLpqqTH6ED/
  // Red Bull - https://d3hjf51r9j54j7.cloudfront.net/wp-content/uploads/sites/9/2019/04/Christian-Horner-team-principal-at-Red-Bull-Racing-Formula-One-Team-to-speak-at-Plug-In-To-Exertis-2019-.jpg

  themes= {
  "red bull": { 
   "vBackground"    : "#12142d" , "_c1": "dBLUE",
   "vTitle"         : "#ff0026" , "_c2": "RED",
   "vDetails"       : "#ffffff" , "_c3": "white",
   "vTrack"         : "#ffea00" , "_c4": "YELLOW",
   "vBorder"        : "#ff0026" , "_c5": "Red",
   "vTBC"           : "#ff0026" , "_c6": "Red"  
  },
  "mclaren":  {
    "vBackground"   : "#ff9700" , "_c1": "Orange",
    "vTitle"        : "#050505" , "_c2": "White",
    "vDetails"      : "#fcfefe" , "_c3": "White",
    "vTrack"        : "#005fdb" , "_c4": "Blue",
    "vBorder"       : "#005fdb" , "_c5": "Blue",
    "vTBC"          : "#fcfefe" , "_c6": "White"
  },
  "renault":  {
    "vBackground"   : "#0b0a08" , "_c1": "BLACK",
    "vTitle"        : "#f8f7fc" , "_c2": "WHITE",
    "vDetails"      : "#ffef00" , "_c3": "lYellow",
    "vTrack"        : "#f7d747" , "_c4": "Dyellow",
    "vBorder"       : "#ffef00" , "_c5": "lyelow",
    "vTBC"          : "#4b3e48" , "_c6": "grey"
  },
  "mercedes": { 
   "vBackground"    : "#000000" , "_c1": "BLACK",
   "vTitle"         : "#03bfb5" , "_c2": "lGreen",
   "vDetails"       : "#949398" , "_c3": "gray",
   "vTrack"         : "#EFF5F9" , "_c4": "silver",
   "vBorder"        : "#03bfb5" , "_c5": "lGreen",
   "vTBC"           : "#018076" , "_c6": "dGreen"
  },
  "ferrari": { 
   "vBackground"    : "#ed1c24" , "_c1": "RED",
   "vTitle"         : "#000000" , "_c2": "BLACK",
   "vDetails"       : "#ffffff" , "_c3": "WHITE",
   "vTrack"         : "#fff200" , "_c4": "YELLOW",
   "vBorder"        : "#ffffff" , "_c5": "WHITE",
   "vTBC"           : "#ffffff" , "_c6": "white"
  },
  "default":  {
    "vBackground"   : "#000000", "_c1": "BLACK",
    "vTitle"        : "#FF1801", "_c2": "Red",
    "vDetails"      : "#ffffff", "_c3": "White",
    "vTrack"        : "#FF1801", "_c4": "Red",
    "vBorder"       : "#FF1801", "_c5": "Red",
    "vTBC"          : "#ffffff", "_c6": "White"
  }
}

  return themes[themeName]

}


function getFlag(loc) {
    flags = {
      "Sakhir":            {"flag": "🇧🇭"},
      "Imola":             {"flag": "🇮🇹"},
      "TBC":               {"flag": "🏴‍☠️"},
      "Catalunya":         {"flag": "🇪🇸"},
      "Monte Carlo":       {"flag": "🇲🇨"},
      "Baku":              {"flag": "🇦🇿"},
      "Montreal":          {"flag": "🇨🇦"},
      "Paul Ricard":       {"flag": "🇫🇷"},
      "Spielberg":         {"flag": "🇦🇹"},
      "Silverstone":       {"flag": "🇬🇧"},
      "Budapest":          {"flag": "🇭🇺"},
      "Spa-Francorchamps": {"flag": "🇧🇪"},
      "Zandvoort":         {"flag": "🇳🇱"},
      "Monza":             {"flag": "🇮🇹"},
      "Sochi":             {"flag": "🇷🇺"},
      "Singapore":         {"flag": "🇸🇬"},
      "Suzuka":            {"flag": "🇯🇵"},
      "Austin":            {"flag": "🇺🇸"},
      "Mexico City":       {"flag": "🇲🇽"},
      "Sao Paulo":         {"flag": "🇧🇷"},
      "Melbourne":         {"flag": "🇦🇺"},
      "Jeddah":            {"flag": "🇸🇦"},
      "Yas Marina":        {"flag": "🇦🇪"}
    }
    return flags[loc].flag
}




// This function takes an image and returns a processed image.
async function processImage(image, altBlack, track, tbc, tbcCol) {
  
  const imageId = "imageId"
  const canvasId = "canvasId"

  const theR = hexToRgb(altBlack).r;
  const theG = hexToRgb(altBlack).g;
  const theB = hexToRgb(altBlack).b;
  
  const twoR = hexToRgb(track).r;
  const twoG = hexToRgb(track).g;
  const twoB = hexToRgb(track).b;

  const js = `




  // Set up the canvas.
  const img = document.getElementById("${imageId}");
  const canvas = document.getElementById("${canvasId}");
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  canvas.style.width  = w + "px";
  canvas.style.height = h + "px";
  canvas.width = w;
  canvas.height = h;
  const context = canvas.getContext("2d");
  context.clearRect( 0, 0, w, h );
  context.drawImage( img, 0, 0 );
    
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
     var pixelArray = imgData.data;
     var length = pixelArray.length / 4; 
    
     for (var i = 0; i < length; i++) {
        var index = 4 * i;
        
        var r =  pixelArray[index];
        var g =  pixelArray[++index];
        var b =  pixelArray[++index];
        var a =  pixelArray[++index];
         
        if (r === 255 && g === 255 && b === 255 ) { // & a === changeAl) {
            pixelArray[--index] = "${theB}"; 
            pixelArray[--index] = "${theG}"; 
            pixelArray[--index] = "${theR}"; 
        } else {
            pixelArray[--index] = "${twoB}"; 
            pixelArray[--index] = "${twoG}"; 
            pixelArray[--index] = "${twoR}"; 
        }
     }    

   
context.putImageData(imgData, 0, 0);



if ( "${tbc}" == "true" ) {
context.globalAlpha=0.5;
// setup text for filling
context.font = canvas.width/3 + "px Menlo-Regular" ;
context.fillStyle = "${tbcCol}";
// get the metrics with font settings
var metrics = context.measureText("TBC!");
var width = metrics.width;
// height is font size
var height = canvas.width/3;

// draw in middle 
context.translate(canvas.width/2, canvas.height/2);
// rotate
context.rotate(-Math.atan(canvas.height/canvas.width));
// just need to center the text
context.fillText("TBC!",-width/2,height/2);

}



  // Return a base64 representation.
  canvas.toDataURL(); 
  `
  
  // Convert the images and create the HTML.
  let inputData = Data.fromPNG(image).toBase64String()
  let html = `
  <img id="${imageId}" src="data:image/png;base64,${inputData}" />
  <canvas id="${canvasId}" />
  `
  
  // Make the web view and get its return value.
  let view = new WebView()
  await view.loadHTML(html)
  let returnValue = await view.evaluateJavaScript(js)
  
  // Remove the data type from the string and convert to data.
  let outputDataString = returnValue.slice(returnValue.indexOf(",")+1)
  outputData = Data.fromBase64String(outputDataString)
  
  // Convert to image and return.
  return Image.fromData(outputData)
}

