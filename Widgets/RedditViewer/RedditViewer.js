// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: newspaper;

let inputStr = args.widgetParameter
// The input is @ seperated as follows:
// 1. Reddit app to open on click
// 2. The subreddit to view
// 3. Testing mode (removed for now)
// 4. Whether to chow pics (this will limit to 1 on small, 2 on medium and 3 on large - not implemented
// 5. The number of posts to show
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

let simpleEmoji   = new Font("Menlo-Regular",     10)  
let mainText      = new Font("GillSans-SemiBold", 14)
let titleTextFont = new Font("GillSans-SemiBold", 14)

let w = new ListWidget()
w.setPadding(10, 10, 10, 10)
w.spacing = 1.5

let titleStack = w.addStack()
titleStack.setPadding(2, 100, 2, 100)

vTitle = "r/" + rReddit
let vLength = vTitle.length
const vMaxSub = 50 // This is for the simpleEmoji font - needs to calculate
let vTitlePadding = ((vMaxSub - vLength) / 2) * 6
titleStack.setPadding(0, vTitlePadding, 0, 0)

let wtitle = titleStack.addText(vTitle)
wtitle.font = titleTextFont
wtitle.textColor = new Color("#33ff00")

function addLine(main, link, r, col, alignMe, txtFont, type) {
  let stack = r.addStack()
  stack.layoutHorizontally()
  stack.url = link
  switch(alignMe) {
  case "left":
      stack.setPadding(0, 0, 0, 0)
    break;
  case "right":
      let vLength = main.length
      const vMaxSub = 50 // This is for the simpleEmoji font - need to calculate - moved out of func - check if can remove here
      let vPadding = (vMaxSub - vLength) * 6
      stack.setPadding(0, vPadding, 0, 0)
    break;
  case "none":
      stack.setPadding(0, 0, 0, 0)
    break;
  default:
    // code...
  }
    let wMain = stack.addText(main)
    wMain.font = txtFont
    wMain.textColor = col
}

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


function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
