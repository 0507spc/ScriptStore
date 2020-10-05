// Shows latest news from MacStories in a table.
// The table shows an image from the article, if available, and the title of the article.

let inputStr = args.widgetParameter
// if exclude itrms, this meeds to be higger than vLimit
// logError(inputStr)
if ( inputStr == null ) { inputStr = "apollo@scriptable@1@pic@4" }
let vRedditLimit = 15
let vItemCount = 1
var res = inputStr.split("@")
let rReddit = res[1]
let vLimit = res[4]
let baseURL = "www.reddit.com"
let url = "https://" + baseURL + "/r/" + rReddit + "/new.json?limit=" + vRedditLimit + "&show=all"
let req = new Request(url)
let json = await req.loadJSON()
let items = json.data.children
let appURL = res[0] + "://" + baseURL + rReddit
let cGray = Color.gray()
let simpleEmoji    = new Font("Menlo-Regular",     10)
let mainText       = new Font("GillSans-SemiBold", 14)
let titleTextFont  = new Font("GillSans-SemiBold", 14)

const vMaxChars = 50
const vMaxCharPtTen = 118 //vMaxChars * 2.2
let vLeadPad = 0
let vTailPad = 0

// set widget
let w = new ListWidget()
w.setPadding(10, 10, 10, 10)
w.spacing = 1.5
// w.backgroundColor = Color.white()




let titleStack = w.addStack()
// titleStack.cornerRadius = 4
// titleStack.setPadding(2, 100, 2, 100)
// titleStack.backgroundColor = new Color("#33ff00", 0.2)


// add link to subreddit for the title
vTitle = "r/" + rReddit
// let vLength = vTitle.length
// const vMaxSub = 50 // This is for the simpleEmoji font - needs to calculate
// let vTitlePadding = ((vMaxSub - vLength) / 2) * 6
// titleStack.setPadding(0, vTitlePadding, 0, 0)
titleStack.addSpacer()
let wtitle = titleStack.addText(vTitle)
wtitle.font = titleTextFont
wtitle.textColor = new Color("#33ff00")
titleStack.addSpacer()


let newLineStack = []
for (item of items) {
  vLeadPad = vMaxCharPtTen // this maybe need to be the pts and calculste that for the padding
  vTailPad = 0
  
  if (! item.data.title.includes("Questions Thread ") && vItemCount <= vLimit ) {
    vItemCount = vItemCount + 1
    
    var myDate = new Date(item.data.created_utc * 1000)
    var myFormDate = addZero(myDate.getHours()) + ":" + addZero(myDate.getMinutes())
    let linkToPost = res[0] + "://" + baseURL + item.data.permalink
    let linkToUser = res[0] + "://" + baseURL + "/user/" + item.data.author
//         log(linkToPost)
    let titleTxt = "• " + item.data.title
    
    
    let subTitle = " ✾ " + item.data.author + " ↑ " + ("0000" + item.data.score).slice (-3) + " ✐ " + ("0000" + item.data.num_comments).slice (-3) + " ◔ " + myFormDate
    
    newLineStack[vItemCount + "_1"] = w.addStack()
    addLine(titleTxt,linkToPost, newLineStack[vItemCount + "_1"], Color.white(), "none", mainText, "main")
    
    newLineStack[vItemCount + "_2"] = w.addStack()
    addLine(subTitle,linkToUser, newLineStack[vItemCount + "_2"], Color.gray(), "right", simpleEmoji, "sub")
  }
}

w.presentMedium()

Script.setWidget(w)
Script.complete() 



// --------------------------------------------------------------------------------
// Functions only after here
// --------------------------------------------------------------------------------
  
function addLine(main, link, r, col, alignMe, txtFont, type) {
  
  
//   vLeadPad = (vMaxCharPtTen - main.length) - 4
  vLeadPad = (vMaxChars - main.length ) - 4
  // What is padding in relation to points.....
  log(main.length + " - " + main)
  
  
  let stack = r.addStack()
//   stack.layoutVertically()
  stack.layoutHorizontally()
  stack.url = link
  if (type == "sub") {
     var sfIconSize = "1"
    
    var resA = main.split("✾")
      padMe(resA[0], main, "right", stack)
        writeText(resA[0], txtFont, col, stack)
        
      padMe(sfIconSize, main, "right", stack)
        writeSFImage('person', txtFont, col, stack)
        
    var resB = resA[1].split("↑")
      padMe(resB[0], main, "right", stack)
        writeText(resB[0], txtFont, col, stack)
      
      padMe(sfIconSize, main, "right", stack)
        writeSFImage('arrow.up.circle', txtFont, col, stack)
      
    var resC = resB[1].split("✐")
      padMe(resC[0], main, "right", stack)
        writeText(resC[0], txtFont, col, stack)
      
      padMe(sfIconSize, main, "right", stack)
        writeSFImage('bubble.left', txtFont, col, stack)
        
    var resD = resC[1].split("◔")
      padMe(resD[0], main, "right", stack)
        writeText(resD[0], txtFont, col, stack)
        
      padMe(sfIconSize, main, "right", stack)
        writeSFImage('clock', txtFont, col, stack)
        
      padMe(resD[1], main, "right", stack)
        writeText(resD[1], txtFont, col, stack)
        
  } else {
    writeText(main, txtFont, col, stack)
  }
  log("--------------")
}


function padMe(padText, totalText, alignMe, stackMe) {
  if ( alignMe == "right" ) {
//     stackMe.addSpacer()
    stackMe.setPadding(0, vLeadPad, 0, 0)
    
    vLeadPad = (vLeadPad + padText.length)
//     vTrailPad = vMaxCharPtTen - vLeadPad

    log(vLeadPad + " - " + padText.length)

  } else {
    stack.setPadding(0, 0, 0, 0)
  }
}


function writeText(wText, wFont, wColour, wStack) {
  let wMain = wStack.addText(wText)
    wMain.font = wFont
    wMain.textColor = wColour
}


function writeSFImage(sfName, sfFont, sfColour, sfStack) {
  let tmpSF = SFSymbol.named(sfName)
    tmpSF.applyFont(sfFont)
  let wImg = sfStack.addImage(tmpSF.image)
    wImg.tintColor = sfColour
}


function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}











