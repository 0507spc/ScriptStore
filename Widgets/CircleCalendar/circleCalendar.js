let arg = args.widgetParameter
if ( arg == null ) { arg = "just in case it is needed" }

let simpleEmoji = new Font("Menlo-Regular", 8)
let mainText = new Font("GillSans-SemiBold", 14)
let titleTextFont = new Font("GillSans-SemiBold", 14)

let black      = Color.black()
let white      = Color.white()
let blue       = Color.blue()
let red        = Color.red()
let yellow     = Color.yellow()
let gray       = Color.gray()
let lightgray  = Color.lightGray()

// type circle or square or xxx
// use draw or SFSymbols?
// using draw and circles to start with

let backImage = await getRemoteImage("https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?ixlib=rb-1.2.1&auto=format&fit=crop&w=1482&q=80")




let w = new ListWidget()
//  w.setPadding(1, 1, 1, 100)
w.setPadding(0, 0, 0, 0)


// This is the background and the line joining circles
const drawContext = new DrawContext()
  drawContext.opaque = false
  drawContext.size = new Size(1000, 1000)
  drawContext.drawImageAtPoint(backImage, new Point(0,0))
  c = drawContext
  r = new Rect(-1700, -100, 2000, 1200)
//   Rect(x, y, width, height)
  c.setStrokeColor(white)
  c.setLineWidth(3)
  c.strokeEllipse(r)
  drawContext.drawImageAtPoint(c.getImage(), new Point(0, 0))
  w.backgroundImage = c.getImage()
// -------- END ---------



row  = w.addStack()
row.layoutVertically()


let sizeA = 100
let sizeB = 150
let sizeC = 200
let sizeMax = 250
let spaceMe = 1


row1 = row.addStack()
genRow(row1, -2, sizeA, sizeMax)

row2 = row.addStack()
genRow(row2, -1, sizeB, sizeMax)

row3 = row.addStack()
genRow(row3, 0, sizeC, sizeMax)

row4 = row.addStack()
genRow(row4, 1, sizeB, sizeMax)

row5 = row.addStack()
genRow(row5, 2, sizeA, sizeMax)


function genRow(theRow, dayOffset, cSize, maxSize) {
  theRow.layoutHorizontally()

  
  switch(Math.abs(dayOffset)) {
  case 2:
    theSpacer = 0
      theRow.setPadding(0, 0, 0, 200)
//       theRow.setPadding(top, leading, bottom, trailing)

    cModWidth = 50
    cModHeight = 0
    dayFont = new Font("Menlo-Regular", 10)
    monthFont = new Font("Menlo-Regular", 8)
    break;
  case 1:
    theSpacer = 0
      theRow.setPadding(0, 55, 0, 0)
      
    cModWidth = 50
    cModHeight = 0
    dayFont = new Font("Menlo-Regular", 14)
    monthFont = new Font("Menlo-Regular", 10)
    break;
  case 0:
    theSpacer = 0
      theRow.setPadding(0, 70, 0, 100)
      
    cModWidth = 0
    cModHeight = 0
    dayFont = new Font("Menlo-Bold", 16)
    monthFont = new Font("Menlo-Regular", 10)
    break;
  default:
    cModWidth = 0
    cModHeight = 0
    theSpacer = 0
  }
  
  theRow.addSpacer(theSpacer)
  dateImage = drawCircle( cSize, cSize, gray, getDate(dayOffset, "day").toString(), maxSize , getDate(dayOffset, "dayname"))

  dateImage.imageSize = new Size(50, 50)
  dateImage.imageOpacity = 0
  theRow.addImage( dateImage )
//   theRow.
//   use day offset to change this and font size
  theRow.addSpacer(5)
  theRow.centerAlignContent()
  
  details = theRow.addStack()
  details.layoutVertically()
  
  dayName = getDate(dayOffset, "dayname")
  monthName = getDate(dayOffset, "monthname")
  yearName = getDate(dayOffset, "year")
  
  details.addText(dayName).font = dayFont
  details.addText(monthName + " " + yearName).font = monthFont
  
  
}



//row1.setPadding(top, leading, bottom, trailing)



w.presentLarge()

















// ---------  FUNCTIONS only here ------------

function getDate(days, type) {
  var days // Days you want to subtract
  var date = new Date()
  var last = new Date(date.getTime() + (days * 24 * 60 * 60 * 1000))
  var day =last.getDate()
  var month=last.getMonth()+1
  var monthname = last.toLocaleString('default', { month: 'long' })
  var dayname = last.toLocaleString('default', { weekday: 'long' })
  var year=last.getFullYear()
  if ( type == "day" )        { return day }
  if ( type == "year" )        { return year }
  if ( type == "dayname" )    { return dayname }
  if ( type == "monthname" )  { return monthname }
}




function drawCircle(height, width, colour, text, maxSize, dayName) {
  // need to align center - otherwise this is good
  let xFactor = (maxSize - height) / 2
  c = new DrawContext()
  c.opaque = 0
  c.size = new Size(maxSize - cModWidth, maxSize - cModHeight)
  c.backgroundColor = black
  c.setFillColor(black)
  c.imageOpacity = 0
  r = new Rect(0, 0, maxSize, maxSize)
//   r = new Rect(0, 0, width, height)
//   c.setFillColor(red)
//   c.fillRect(r)
  

  r = new Rect(0, xFactor, width, height )
//   r = new Rect(0, 0, width, height)
//   c.setFillColor(yellow)
//   c.fillRect(r)
  
  // Set circle fill colour
  c.setFillColor(colour)
  c.fillEllipse(r)

  // The Text  
  pos = new Point(width * 0.15, xFactor + height * 0.15)
  
  dayPos = new Point(width + 10, xFactor + height * 0.15)
  
  c.setTextColor(black)
  c.setTextAlignedCenter()
  circleFont = new Font("Menlo-Regular", width * 0.6)
  c.setFont(circleFont)
  c.drawText(text, pos)
  
//   c.drawText(" " + dayName, dayPos)
  
  returnImg = c.getImage()

  return returnImg
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

