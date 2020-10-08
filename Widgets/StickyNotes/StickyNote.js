
let params = args.queryParameters

let inputStr = params.type
if ( inputStr == null || inputStr == "" ) { inputStr = "widget" }

let stickyName = args.widgetParameter

if (stickyName == null || stickyName == "") {
  stickyName = params.stickyName
}
if (stickyName == null || stickyName == "") {
  stickyName = "note1"
}
// notifyMe(stickyName)

let conf = "sticky.json"
let confJson = await getConf(conf)
let sticky = ""

if ( confJson[stickyName] != null ) {
  sticky = confJson[stickyName].text
} else {
  sticky = "New note."
  let newRecord = {"text":"New note.","colour":{"name":"blue","text":"#ffffff","background":"#2b93e3"},"font":{"name":"chalkboardse-regular","size":19}}
  confJson[stickyName] = newRecord

   writeConf(conf, confJson)
}  

// you can have widgets initiate notifications!
// notifyMe(sticky)


let stickyColourName = confJson[stickyName].colour.name
let stickyColourBackground = confJson[stickyName].colour.background
let stickyColourText = confJson[stickyName].colour.text
let stickyFont = confJson[stickyName].font.name
let stickySize = confJson[stickyName].font.size
let stickyFontDetails = new Font(stickyFont, stickySize)

if ( inputStr == "save" ) {

let test = decodeURI(params.textColorName)

confJson[stickyName].text = decodeURIComponent(params.sticky)
confJson[stickyName].colour.background = decodeURIComponent(params.backgroundColor)
confJson[stickyName].colour.text = decodeURIComponent(params.textColor)
confJson[stickyName].colour.name = decodeURIComponent(params.textColorName)
confJson[stickyName].font.name = decodeURIComponent(params.fontName)
confJson[stickyName].font.size = Number(decodeURIComponent(params.fontSize))

writeConf(conf, confJson)

  notifyMe("Sticky Updated")
}


if ( inputStr == "widget" ) {
//  if run and saved via web
//  then activate runafterdate on widget.
let w = new ListWidget()
w.backgroundColor = new Color(stickyColourBackground)

let textRow = w.addStack()
  textRow.layoutHorizontally()

let shortcutToRun = "scriptable:///run?scriptName=StickyTest&type=edit&stickyName=" + stickyName

let theText = textRow.addText(sticky)
  theText.font = stickyFontDetails
  theText.textColor = new Color(stickyColourText)
  theText.url = shortcutToRun

w.presentMedium()

}


// HTML
let html = `
<!DOCTYPE html>
<meta name="viewport" content="width=device-width">
<html>
<head>
<style>
body {
    background-color: lightblue;
    text-align: center;
    
}

label {
    border: 2px solid #ccc;
    border-radius: 25px;
    padding: 12px 20px ;
}

h1 {
    border: 2px solid #ccc;
    border-radius: 25px ;
    padding: 12px 20px ;
    background-color: #ffff88;
    color: black;
    text-align: center;
}

textarea {
    width: 90% ;
    height: 150px ;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 25px;
    background-color: #f8f8f8;
    resize: none;
    font-family: chalkduster;
    font-size: 18px ;
}

input[type=button], input[type=submit], input[type=reset] {
    padding:25px 25px; 
    background:#000000; 
    color: white;
    border:0 none;
    cursor:pointer;
    -webkit-border-radius: 5px;
    border-radius: 5px; 
    width: 20em;  height: 2em;
}

h2 {
    color: black;
    text-align: center;
}


label {
  display: inline-block;
}


input[type='radio']:after {
    width: 15px ;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -1px ;
    position: relative;
    background-color: #d1d3d1;
    content: '';
    display: inline-block;
    visibility:hidden;
    border: 2px solid white;
}

input[type='radio']:checked:after {
    width: 15px ;
    height: 15px ;
    border-radius: 15px ;
    top: -2px ;
    left: -1px;
    position: relative;
    background-color: #ffa500;
    content: '';
    display: inline-block;
    visibility:hidden;
    border: 2px solid white;
}

.button {
  font: bold 14px Arial;
  text-decoration: none;
  background-color: #EEEEEE;
  color: #444444;
  padding: 2px 6px 2px 6px;
  border-radius: 15px ;
  border-top: 1px solid #CCCCCC;
  border-right: 1px solid #333333;
  border-bottom: 1px solid #333333;
  border-left: 1px solid #CCCCCC;
}

</style>
</head>
<body onload="setupCS();">

<script>

function getRadioVal(form, name, type) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name];
    
    // loop through list of radio buttons
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            nam = radios[i].id ;
            break; // and break out of for loop
        }
    }
    if ( type == "value" ) {
      return val; // return value of checked radio or undefined if none checked
    } else {
      return nam ;
    }
}


function generateURLString() {
  // this will loop through all elements when called and generate a new URL
  // This is inefficient, but, means I don't have to worry about what is loaded
  // what needs adding / replacing etc.
  // scriptable:///run?scriptName=StickyTest

  var val = getRadioVal( document.getElementById('myForm'), 'colourScheme', 'value' );
  var res = val.split("@");
  var backgroundColor = res[0];
  var textColor = res[1];
  var textColorName = getRadioVal( document.getElementById('myForm'), 'colourScheme', 'name' );
  
  var fnt = getRadioVal( document.getElementById('myForm'), 'fontScheme' );
  
  var theScriptableURL  = "scriptName=StickyTest" ;
      theScriptableURL += "&type=save" ;  
      theScriptableURL += "&backgroundColor="  + encodeURIComponent(backgroundColor) ;
      theScriptableURL += "&textColor=" + encodeURIComponent(textColor) ;
      theScriptableURL += "&textColorName=" + encodeURIComponent(textColorName) ;
      theScriptableURL += "&fontName=" + encodeURIComponent(fnt) ;
      theScriptableURL += "&fontSize=" + encodeURIComponent(document.getElementById("fntsize").value) ;
      theScriptableURL += "&stickyName=` + encodeURIComponent(stickyName) + `" ;
      theScriptableURL += "&sticky=" + encodeURIComponent(document.getElementById("sticky").value) ;   
  var theScriptable = "scriptable:///run?" + theScriptableURL ;
  
  var theURL  = "<a href='" + theScriptable + "'" ;
      theURL += " class='button' onClick=saveFile(" ;
      theURL += '"' + theScriptable + '"' ;
      theURL += ");>SAVE FILE </a>" ;
      
  document.getElementById('submitter').innerHTML = theURL ;
  
  // document.getElementById('debug').innerHTML = theScriptableURL ;
  
}

  function saveFile(url) {
        
    window.open(url, 'system') ;

    document.getElementById('submitter').innerHTML = "Loading..." + url ;
  }

function setupCS() {
  
    // This is the loaded values
    document.getElementById("` + stickyFont + `").checked = true ;
    document.getElementById("` + stickyColourName + `").checked = true ;
    
    var elements = document.getElementById("myForm").elements;
    
    for (var i = 0, element; element = elements[i++];) {
        if (element.type === "radio" && element.name == "colourScheme") {
            var res = element.value.split ("@");
            document.getElementById('lbl' + element.id).style.backgroundColor = res[0];
            document.getElementById('lbl' + element.id).style.color = res[1];
        }
        if (element.type === "radio" && element.name == "fontScheme") {
          var fnt = element.value ;
          document.getElementById('lbl' + element.id).style.fontFamily = fnt;
          document.getElementById('lbl' + element.id).style.backgroundColor = "#ffffff"
        }
    }
}


function changeTextarea(value) {
    var res = value.split("@");
    document.getElementById("sticky").style.backgroundColor = res[0];
    document.getElementById("sticky").style.color = res[1];
    generateURLString() ;
}

function changeTextareaFnt(value) {
    var res = value;
    document.getElementById("sticky").style.fontFamily = res;
    generateURLString() ;
}

function changeText(id) { 
  id.innerHTML = "Ooops!";
}

function updateTextInput(val) {
  document.getElementById('fntsizevalue').innerHTML = val; 
  document.getElementById("sticky").style.fontSize = val + "px";
  generateURLString() ;
}

</script>

<h1>Sticky Note: ` + stickyName + `</h1>

<form name="myForm" id="myForm">

<div id="debug"></div>
    
    <div id="submitter"></div>
<br />

    <textarea id="sticky" name="sticky" rows="5" cols="40" onkeypress="generateURLString();" onchange="generateURLString();"  >` + sticky + `</textarea>
    <br />
    <h2>Colour Scheme</h2>
    <input onclick="changeTextarea(value)" type="radio" id="black" name="colourScheme" value="#000000@#ffffff">
    <label id="lblblack" for="black">Black</label>

    <input onclick="changeTextarea(value)" type="radio" id="white" name="colourScheme" value="#ffffff@#000000">
    <label id="lblwhite" for="white">White</label>

    <input onclick="changeTextarea(value)" type="radio" id="yellow" name="colourScheme" value="#f0e92b@#000000">
    <label id="lblyellow" for="yellow">Yellow</label>

    <input onclick="changeTextarea(value)" type="radio" id="blue" name="colourScheme" value="#2b93e3@#ffffff">
    <label id="lblblue" for="blue">blue</label>

    <input onclick="changeTextarea(value)" type="radio" id="orange" name="colourScheme" value="#e3a32b@#000000">
    <label id="lblorange" for="orange">orange</label>

    <h2>Font Scheme</h2>
    <input onclick="changeTextareaFnt(value)" type="radio" id="chalkduster" name="fontScheme" value="chalkduster">
    <label id="lblchalkduster" for="chalkduster">Chalkduster</label>
    <input onclick="changeTextareaFnt(value)" type="radio" id="papyrus" name="fontScheme" value="papyrus">
    <label id="lblpapyrus" for="papyrus">Papyrus</label>
    <input onclick="changeTextareaFnt(value)" type="radio" id="arialroundedmtbold" name="fontScheme" value="arialroundedmtbold">
    <label id="lblarialroundedmtbold" for="arialroundedmtbold">ArialRounded</label>
<input onclick="changeTextareaFnt(value)" type="radio" id="bradleyhanditctt-bold" name="fontScheme" value="bradleyhanditctt-bold">
    <label id="lblbradleyhanditctt-bold" for="bradleyhanditctt-bold">BradleyHand</label>
<input onclick="changeTextareaFnt(value)" type="radio" id="chalkboardse-regular" name="fontScheme" value="chalkboardse-regular">
    <label id="lblchalkboardse-regular" for="chalkboardse-regular">Chalkboard</label>

<h2>Font Size</h2>
  <label for="lblfntsize">Font size between 10 and 28:</label>  <div id="fntsizevalue">` + stickySize + `</div>
  <input type="range" id="fntsize" name="fntsize" min="10" max="28" onchange="updateTextInput(this.value);">







<!--
  <label for="favcolor">Select your favorite color:</label>
  <input type="color" id="favcolor" name="favcolor" value="#ff0000">
  
  
  
  function updateTextInput(val) {
          document.getElementById('textInput').value=val; 
        }
<input type="range" name="rangeInput" min="0" max="100" onchange="updateTextInput(this.value);">
<input type="text" id="fntsizevalue" value="">
-->



</form>

</body>
</html>

`
// This shouldbe a check from the inputStr
//
// null = widget
// value = show form (clicked from widget
// value2 = update the file and exit
// Case statement here
if ( inputStr == "edit" ) {
  let wv = await new WebView()
    wv.loadHTML(html)
    wv.present(1)
} 






// FUNCTIONS HERE ONLY

function notifyMe(bodyMessage) {
  let n = new Notification();
  n.title = Script.name();
  n.body =  bodyMessage ;
  n.sound = null;
  n.schedule();
}



async function getConf(fileName) {
  let fm = FileManager.iCloud()
  let dir = fm.documentsDirectory()
  let filePath = fm.joinPath(dir, "./configs/" + fileName)
  
  let exists = fm.fileExists(filePath)
  if ( exists == false ) { 
    fm.write(filePath, Data.fromString("{}")) 
  }
  
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
  fm.writeString(filePath, contents)
}
