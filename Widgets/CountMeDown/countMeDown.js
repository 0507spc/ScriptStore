
let futureDate = args.widgetParameter
if ( futureDate == null ) { futureDate = "2020-10-29" }

const date1 = new Date();
const date2 = new Date(futureDate)
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

let widget = await createWidget()
widget.backgroundColor = new Color("#333333")
if (!config.runsInWidget) {
  await widget.presentSmall()
}

Script.setWidget(widget)
Script.complete()

async function createWidget(items) {
  const list = new ListWidget()
  list.addSpacer(1)
    const line1 = list.addText("CountMeDown")
    line1.font = Font.mediumSystemFont(12)
    
    line2 = list.addText(diffDays.toString() + " days.")
    line2.font = Font.mediumSystemFont(18)
  
  return list
}
