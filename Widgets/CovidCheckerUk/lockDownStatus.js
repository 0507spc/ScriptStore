

let postcode = args.widgetParameter
if ( postcode == null ) { postcode = "ch635pe" }
// if ( postcode == null ) { postcode = "S8 9np" }

postcode = postcode.toLocaleUpperCase().replace(/ /, "")

let simpleEmoji = new Font("Menlo-Regular", 8)
let mainText = new Font("GillSans-SemiBold", 14)
let titleTextFont = new Font("GillSans-SemiBold", 14)

const med    = new Color("#fae691")
const high   = new Color("#f8ce25")
const vhigh  = new Color("#be000a")
const nLkDwn = new Color("#FF5733")


let url = "https://coronavirus-staging.data.gov.uk/search?postcode=" + postcode

output = await getString(url)
// log(url)





async function getString(urlName, id) {
  let fReq = new Request(urlName)
  let output = await fReq.loadString()
  
  //log(output)
  
  
  matchMe   = new RegExp('/.*' + postcode + '.*/','i')
  replaceMe = new RegExp('.*?' + postcode)
  output = output.match(matchMe).join(" ")
  
  //currLoc        = output.replace(/.*?areaName=/, "").replace(/".*/, "")
  replaceLoc     = new RegExp('.*govuk-!-padding-left-0"> ' + postcode + " &ndash;")
  currLoc        = output.replace(replaceLoc, "").replace(/ <\/h2>.*/, "")

  currAlert      = output.replace(/.*Current.*?<\/small>/, "").replace(/[ ]*<\/h3>.*/, "")
  //currRRateLoc   = output.replace(/.*healthcare region of /, "").replace(/ is estimated.*/, "")
  currRRateLoc   = output.replace(/.*healthcare region of /, "").replace(/ <\/h3>.*/, "")
  //currRRate      = output.replace(/.*is estimated at.*?<b>/, "").replace(/<\/b>.*/, "").replace(/&nbsp;/g, " ")
  currRRate      = output.replace(/.*<p class="sam-body"> /, "").replace(/with a daily infection growth rate range of.*/, "").replace(/&nbsp;/g, " ") 

  //log(output)

//   currNewPosDate = output.replace(/.*?tested positive on /, "").replace(/ <.*/, "")
  
  currNewPosDate = output.replace(/.*?level provided on&nbsp;<span style="white-space: nowrap">/, "").replace(/<.*/, "")
  
   
  
  currNewPos     = output.replace(/.*?Daily<\/div>.*?number">/, "").replace(/ <.*/, "")
  currCase7Day   = output.replace(/.*?Last 7 days.*?showHelp\(\)">/, "").replace(/ <.*/, "")
  currDeaths     = output.replace(/ <span class="tooltiptext govuk-!-font-size-16"> Total number of deaths within 28.*/, "").replace(/.*>/, "")
  locationImg    = output.replace(/.*https:\/\/coronavirus.data.gov.uk\/public\/assets\/frontpage\/map_thumbnails\//, "https://coronavirus.data.gov.uk/public/assets/frontpage/map_thumbnails/").replace(/".*/, "")
  
  
  //log(locationImg)
  
  localImg = await getBackground(locationImg)
  img = getLocalImage(localImg)
  
  theLocalImage = await processImage(img)
  
  
  
//   output = output.match(/.*Bolsover.*/).join(" ").replace(/.*?S446EY/, ""
  return output
}



let w = new ListWidget()

// w.setPadding(1, 0, 1, 0)


w.backgroundImage = theLocalImage

let imageRow = w.addStack()
  imageRow.layoutHorizontally()
  
  
switch(currAlert.toString()) {
  case "MEDIUM":
    var showCol = med
    break;
  case "HIGH":
    var showCol = high
    break;
  case "VERY HIGH":
    var showCol = vhigh
    break;
  case "NATIONAL RESTRICTIONS":
    var showCol = nLkDwn
    break;
  default:
    var showCol = Color.blue()
}


let dataRow= w.addStack()
  dataRow.layoutVertically()

let vshowSupp = currNewPosDate
let vsubText = dataRow.addText(vshowSupp)
  vsubText.font = mainText
  vsubText.textColor = Color.white()
  vsubText.shadowColor = showCol
  vsubText.shadowRadius = 3
  


let headBal = dataRow.addText(currLoc + " tier: ")
  headBal.font = mainText
  headBal.textColor = showCol
let tier = dataRow.addText(currAlert)
  tier.font = mainText
  tier.textColor = showCol

let balText = dataRow.addText(currRRateLoc + " R Rate.")
  balText.font = mainText
let vbalText = dataRow.addText("is:  " + currRRate )
  vbalText.font = mainText
  
let showSupp = "7 day cases: " + currCase7Day
let subText = dataRow.addText(showSupp)
  subText.font = mainText
  subText.textColor = Color.lightGray()  
let xshowSupp = "Daily cases: " + currNewPos
let xsubText = dataRow.addText(xshowSupp)
  xsubText.font = mainText
  xsubText.textColor = Color.lightGray()  
let yshowSupp = "☠️ last 7 days: " + currDeaths
let ysubText = dataRow.addText(yshowSupp)
  ysubText.font = mainText
  ysubText.textColor = Color.lightGray()  

w.presentSmall()







async function getBackground(convertMe) {
//   check if exists first
  fileName = convertMe.replace(/.*\//, "").replace(/\.svg/, ".png")
  
  let contentsFile = await getRemoteFile(convertMe)

  tmpImage64 = contentsFile.replace(/.*base64,/, "").replace(/==".*/, "==")
  outImage = Data.fromBase64String(tmpImage64)

  writeToDir = "./backgrounds/"
//   to fix
  await writeConf(fileName, outImage, writeToDir)
  return writeToDir + fileName
}







function writeConf(fileName, contents, saveLoc) {
  let fm = FileManager.iCloud()
  let dir = fm.documentsDirectory()
  let filePath = fm.joinPath(dir, saveLoc + fileName)
  fm.write(filePath, contents)
}

async function getRemoteFile(theUrl) {
  let req = new Request(theUrl)
  let theOutput = await req.loadString()
  return theOutput
}  


function getLocalImage(imageName) {
  let fm = FileManager.iCloud()
  let dir = fm.documentsDirectory()
  let filePath = fm.joinPath(dir, imageName)
  return fm.readImage(filePath)
}











// This function takes an image and returns a processed image.
async function processImage(image) {
  
  const imageId = "imageId"
  const canvasId = "canvasId"

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
  
  // Image modifications go here. This desaturates the image.
//   context.globalCompositeOperation = "saturation";
//   context.fillStyle = "hsl(0,0%,70%)";
//   context.fillRect(0, 0, w, h);
  
  
  
  
  
  
var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
var i;
var r=0, g=1, b=2,a=3;
    for (i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = 255 - imgData.data[i];
        imgData.data[i+1] = 255 - imgData.data[i+1];
        imgData.data[i+2] = 255 - imgData.data[i+2];
        imgData.data[i+3] = 255;
        
        
        if (
          imgData.data[i+r] >= 160 &&
          imgData.data[i+g] >= 160 &&
          imgData.data[i+b] >= 160) // if white then change alpha to 0
      {imgData.data[i+a] = 0;}
        
        
        
    }
   
    
    
    
context.putImageData(imgData, 0, 0);







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

function getLocalImage(imageName) {
  let fm = FileManager.iCloud()
  let dir = fm.documentsDirectory()
  let filePath = fm.joinPath(dir, imageName)
  return fm.readImage(filePath)
}
