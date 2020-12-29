let simpleEmoji = new Font("Menlo-Regular", 8)
let mainText = new Font("GillSans-SemiBold", 14)
let titleTextFont = new Font("GillSans-SemiBold", 14)

url = "https://api.coronavirus.data.gov.uk/v2/data?areaType=overview&metric=cumPeopleReceivingFirstDose&metric=cumPeopleReceivingSecondDose&format=json"

output = await getString(url)

// log(output)

firstDose  = output.body[0].cumPeopleReceivingFirstDose
secondDose = output.body[0].cumPeopleReceivingSecondDose
date       = output.body[0].date
if ( output.body[0].areaName == "United Kingdom" ) { areaName = "UK" } else { areaName = output.body[0].areaName }


async function getString(urlName) {
  let fReq = new Request(urlName)
  let output = await fReq.loadJSON()
  
//   log(output)
  return output
  
 
}


let w = new ListWidget()

let dataRow= w.addStack()
  dataRow.layoutVertically()


let headBal = dataRow.addText(areaName + " 💉 🦠")
  headBal.font = mainText
 let dateRow = dataRow.addText("As at: " + date)
   dateRow.font = mainText
let firstRow = dataRow.addText("First Dose: " + firstDose.toString())
  firstRow.font = mainText
let secondRow = dataRow.addText("Second Dose: " + secondDose.toString())
  secondRow.font = mainText


w.presentSmall()
