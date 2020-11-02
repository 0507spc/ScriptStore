var actionParam = args.shortcutParameter;
var actionParam = actionParam.toLowerCase();

var text = args.plainTexts[0];

function strikeThrough(str) {
//   return str
//     .split('')
//     .map(char => char + '\u0336')
//     .join('')
    
    return str.replace(/./g,/&\xCC\xB6/)
    
}

function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
}

                        
if (actionParam == "uppercase") {
    Script.setShortcutOutput(text.toUpperCase());
}
else if (actionParam == "lowercase") {
    Script.setShortcutOutput(text.toLowerCase());
}
else if (actionParam == "s̶t̶r̶i̶k̶e̶") {
    Script.setShortcutOutput(strikeThrough(text));
}
else if (actionParam == "length: 9") {
    Script.setShortcutOutput(text.length);
}
else if (actionParam == "title case") {
    Script.setShortcutOutput(titleCase(text));
}
else if (actionParam == "word count: 2") {
    Script.setShortcutOutput(text.split(" ").length);
}
else if (actionParam == "summary") {
    Script.setShortcutOutput("Input: " + text + "\n" + "Length: " + text.length + "\n" +  "Word Count: " + text.split(" ").length);
}
Script.complete();
