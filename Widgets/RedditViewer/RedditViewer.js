// Shows latest news from MacStories in a table.
// The table shows an image from the article, if available, and the title of the article.

let inputStr = args.widgetParameter
// if exclude itrms, this meeds to be higger than vLimit
// logError(inputStr)
// mske the code show black even when not in dark mode
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
let appURL = res[0] + "://" + baseURL + "/r/" + rReddit
let cGray = Color.gray()
let simpleEmoji    = new Font("Menlo-Regular",     10)
let mainText       = new Font("GillSans-SemiBold", 14)
let titleTextFont  = new Font("GillSans-SemiBold", 14)	


// set widget
let w = new ListWidget()
w.setPadding(10, 10, 10, 10)
w.spacing = 1			

let titleStack = w.addStack()
  titleStack.url = appURL
vTitle = "r/" + rReddit
titleStack.addSpacer()
let wtitle = titleStack.addText(vTitle)
  wtitle.font = titleTextFont
  wtitle.textColor = new Color("#33ff00")
titleStack.addSpacer()

let newLineStack = []
for (item of items) {
  if (! item.data.title.includes("Questions Thread ") && vItemCount <= vLimit ) {
    vItemCount = vItemCount + 1
    
    var myDate = new Date(item.data.created_utc * 1000)
    var myFormDate = addZero(myDate.getHours()) + ":" + addZero(myDate.getMinutes())
    let linkToPost = res[0] + "://" + baseURL + item.data.permalink
    let linkToUser = res[0] + "://" + baseURL + "/user/" + item.data.author
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
  let stack = r.addStack()
//   stack.layoutVertically()
  stack.layoutHorizontally()
  stack.url = link
  if (type == "sub") {
    var resA = main.split("✾")
      stack.addSpacer()
      writeSFImage('person', txtFont, col, stack)
    var resB = resA[1].split("↑")
        writeText(resB[0], txtFont, col, stack)
        writeSFImage('arrow.up.circle', txtFont, col, stack)
      
    var resC = resB[1].split("✐")
        writeText(resC[0], txtFont, col, stack)
        writeSFImage('bubble.left', txtFont, col, stack)
        
    var resD = resC[1].split("◔")
        writeText(resD[0], txtFont, col, stack)
        writeSFImage('clock', txtFont, col, stack)
        writeText(resD[1], txtFont, col, stack)
  } else {
    writeText(main, txtFont, col, stack)
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
