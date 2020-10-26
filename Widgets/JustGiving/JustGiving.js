

let url = args.widgetParameter
if ( url == null ) { url = "https://www.justgiving.com/crowdfunding/inmemoryofleekostewicz" }


let simpleEmoji = new Font("Menlo-Regular", 8)
let mainText = new Font("GillSans-SemiBold", 14)
let titleTextFont = new Font("GillSans-SemiBold", 14)


let jg = await getString(url)

let img = jg.match(/og:image.*?jpg/).toString().replace(/.*https/, "https")

let details   = jg.match(/jg-text--brand-large.*? supporter./).toString().replace(/.*?\">/, "")

let futureDate = jg.match(/jgdonation:enddate.*/).toString().replace(/jgdonation:enddate" content="/, "").replace(/T.*/, "")

const date1 = new Date();
const date2 = new Date(futureDate)
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 


let amtRaised  = details.replace(/<.*/, "")
let amtGoal    = details.replace(/.*?<b>/, "").replace(/<.*/, "")
let supporters = details.replace(/.*>/, "").replace(/ .*/, "")

let theImage = await getRemoteImage(img)




let w = new ListWidget()

w.setPadding(1, 1, 1, 1)

let imageRow = w.addStack()
  imageRow.layoutHorizontally()
  
let image = imageRow.addImage(theImage);
  image.imageSize = new Size(120,80)
  image.cornerRadius = 5
  image.leftAlignImage()
//   iconRow.addSpacer(10)
//   iconRow.spacing = 4
// if medium will open JG page.
  image.url = url
  
let dataRow= w.addStack()
  dataRow.layoutVertically()
  
let showMe = amtRaised + " / " + amtGoal

let headBal = dataRow.addText("Donations:")
  headBal.font = mainText
  headBal.textColor = Color.purple()

let balText = dataRow.addText(showMe)
  balText.font = mainText
  
let showSupp = "👤 " + supporters + " • Days left: " + diffDays
let subText = dataRow.addText(showSupp)
  subText.font = mainText
  subText.textColor = Color.gray()

w.presentSmall()







// ---------  FUNCTIONS only here ------------


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
