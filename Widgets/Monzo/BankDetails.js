
let inputStr = args.widgetParameter
if (inputStr == null) {
  inputStr = "personal"
}

let conf = "Monzo.json"
let confJson = await getConf(conf)

let clientID = confJson["clientID"]
let UserID = confJson["UserID"]
let AccountID = confJson["AccountID"]
let JointID = confJson["JointID"]
let clientSecret = confJson["clientSecret"]
let refreshToken = confJson["MONZO_REFRESH_TOKEN"]
let Accesstoken = confJson["MONZO_ACCESS_TOKEN"]

if (inputStr == "personal") {
  acctSelected = AccountID
} else {
  acctSelected = JointID
  sleep(6500)
}

let simpleEmoji = new Font("Menlo-Regular", 8)
let mainText = new Font("GillSans-SemiBold", 14)
let titleTextFont = new Font("GillSans-SemiBold", 14)

let monzoIcon = "Monzo.PNG"
let monzoImg = await getImage(monzoIcon)

let vBaseURL =  "https://api.monzo.com"
let whoami = "https://api.monzo.com/ping/whoami"
let reAuth = "https://api.monzo.com/oauth2/token"

let vLimit = 600
let widgLimit = 6
let vLineLimit = 15

function sleep(milliseconds) {
  let startTime = new Date().getTime()
  while (new Date().getTime() <= startTime + milliseconds) { }
}


let outMe = await getAPI(whoami, Accesstoken)
if ( outMe.authenticated != true ) {
  vGetTokenURL = vBaseURL + "/oauth2/token"

  let newtoken = await getAccessToken(vGetTokenURL, refreshToken, clientID, clientSecret)

  refreshToken = newtoken["refresh_token"]
  Accesstoken = newtoken["access_token"]
} else {
  log("Good")
}


var today = new Date()
let tranDate = new Date().setDate(today.getDate()-15)
let dater = new Date(tranDate).toISOString()

let vGetBal = vBaseURL + "/balance?account_id=" + acctSelected

let vGetTransactions = vBaseURL + "/transactions?since=" + dater + "&account_id=" + acctSelected + "&limit=" + vLimit

let json = await getAPI(vGetBal, Accesstoken)
// log(json)
let json2 = await getAPI(vGetTransactions, Accesstoken)
//log(json2)objAssetSelection.info.reverse();
let items = json2.transactions.reverse()

let bal = (json["balance"] / 100).toFixed(2)
let totalBal = (json["total_balance"] / 100).toFixed(2)
let spentToday = (json["spend_today"] / 100).toFixed(2)

// set widget
let w = new ListWidget()
// titleStack.setPadding(top, leading, bottom, trailing)
// titleStack.backgroundColor = new Color("#33ff00", 0.2)
//   stack.layoutVertically()
//   stack.layoutHorizontally()


let iconRow = w.addStack()
  iconRow.layoutHorizontally()
let image = iconRow.addImage(monzoImg);
  image.imageSize = new Size(20,20)
  image.cornerRadius = 5
  image.leftAlignImage()
  iconRow.addSpacer(10)
  iconRow.spacing = 4
let balText = iconRow.addText("£" + numberWithCommas(bal.toString()))
  balText.font = titleTextFont

// let transRow = w.addStack()
// let transText = transRow.addText("£" + numberWithCommas(bal.toString()))
//   transText.font = simpleEmoji

let vItemCount = 1
let newLineStack = []
let colourLine = Color.white()

let blank = w.addStack()
addLine("", blank, colourLine, simpleEmoji)

for (item of items) {
  let descTran = item.description
  let amntTran = "£" + (item.amount / 100).toFixed(2)
  if ( amntTran.includes("-") ) {
    amntTran = amntTran.replace("-", "")
    colourLine = Color.white()
  } else {
    colourLine = Color.green()
  }
  let dateTran = item.settled
  if ( descTran.includes("pot_", 0) == "" && vItemCount <= widgLimit ) {
    let output = (amntTran + " " + descTran.substring(0, vLineLimit))
    newLineStack[vItemCount] = w.addStack()
    addLine(output, newLineStack[vItemCount], colourLine, simpleEmoji)
    vItemCount = vItemCount + 1
  }
}

w.presentSmall()

async function getConf(fileName) {
  let fm = FileManager.iCloud()
  let dir = fm.documentsDirectory()
  let filePath = fm.joinPath(dir, "./configs/" + fileName)
  
  await fm.downloadFileFromiCloud(filePath)
  
  if ( fm.isFileDownloaded(filePath) == 1 ) {
    return await JSON.parse(fm.readString(filePath))
  }
}

function writeConf(fileName, contents) {
  contents = JSON.stringify(contents)
  let fm = FileManager.iCloud()
  let dir = fm.documentsDirectory()
  let filePath = fm.joinPath(dir, "./configs/" + fileName)
  fm.writeString(filePath, contents
