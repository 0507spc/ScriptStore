

let postcode = args.widgetParameter
if ( postcode == null ) { postcode = "s13gg" }

let simpleEmoji = new Font("Menlo-Regular", 8)
let mainText = new Font("GillSans-SemiBold", 14)
let titleTextFont = new Font("GillSans-SemiBold", 14)

const med   = new Color("#cccc00")
const high  = new Color("#FFA07A")
const vhigh = new Color("#DC143C")

let url = "https://coronavirus-staging.data.gov.uk/search?postcode=" + postcode


output = await getString(url)
log(output)

async function getString(urlName, id) {
  let fReq = new Request(urlName)
  let output = await fReq.loadString()
  matchMe   = new RegExp('/.*' + postcode + '.*/','i')
  replaceMe = new RegExp('.*?' + postcode)
  output = output.match(matchMe).join(" ")
  
  currLoc        = output.replace(/.*?areaName=/, "").replace(/".*/, "")
  currAlert      = output.replace(/.*Current.*?<\/small>/, "").replace(/[ ]*<\/h3>.*/, "")
  currRRateLoc   = output.replace(/.*healthcare region of /, "").replace(/ is estimated.*/, "")
  currRRate      = output.replace(/.*is estimated at.*?<b>/, "").replace(/<\/b>.*/, "").replace(/&nbsp;/g, " ")
  currNewPosDate = output.replace(/.*?tested positive on /, "").replace(/ <.*/, "")
  currNewPos     = output.replace(/.*?Daily<\/div>.*?number">/, "").replace(/ <.*/, "")
  currCase7Day   = output.replace(/.*?Last 7 days.*?showHelp\(\)">/, "").replace(/ <.*/, "")
  currDeaths     = output.replace(/ <span class="tooltiptext govuk-!-font-size-16"> Total number of deaths within 28.*/, "").replace(/.*>/, "")
  

  
  return output
}

let w = new ListWidget()

w.setPadding(1, 1, 1, 1)

let imageRow = w.addStack()
  imageRow.layoutHorizontally()
  
  log(currLoc)
  log(currAlert)
  log(currRRateLoc)
  log(currRRate)
  log(currNewPos)
  log(currCase7Day)
  log(currNewPosDate)
  log(currDeaths)

// var showCol = vhigh
log(currAlert.toString())
if ( currAlert.toString() == "MEDIUM" ) {  
  var showCol = med
}
if ( currAlert.toString() == "HIGH" ) {  
   var showCol = high
}
if ( currAlert.toString() == "VERY HIGH" ) {  
  var showCol = vhigh
}
// showCol = med

let dataRow= w.addStack()
  dataRow.layoutVertically()

let vshowSupp = currNewPosDate
let vsubText = dataRow.addText(vshowSupp)
  vsubText.font = mainText
  vsubText.textColor = Color.gray()


let headBal = dataRow.addText(currLoc + " is tier: " + currAlert)
  headBal.font = mainText
  headBal.textColor = showCol

let balText = dataRow.addText(currRRateLoc + " R Rate.")
  balText.font = mainText
let vbalText = dataRow.addText("is:  " + currRRate )
  vbalText.font = mainText
  
let showSupp = "7 day cases: " + currCase7Day
let subText = dataRow.addText(showSupp)
  subText.font = mainText
  subText.textColor = Color.gray()  
let xshowSupp = "Daily cases: " + currNewPos
let xsubText = dataRow.addText(xshowSupp)
  xsubText.font = mainText
  xsubText.textColor = Color.gray()  
let yshowSupp = "☠️: " + currDeaths
let ysubText = dataRow.addText(yshowSupp)
  ysubText.font = mainText
  ysubText.textColor = Color.gray()  

w.presentSmall()
