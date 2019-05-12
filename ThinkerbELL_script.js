var firebaseConfig = {
    apiKey: "AIzaSyB8AwRXeTAYHOZC9lB6KY99UM45CgzxGqM",
    authDomain: "jaky-97cf5.firebaseapp.com",
    databaseURL: "https://jaky-97cf5.firebaseio.com",
    projectId: "jaky-97cf5",
    storageBucket: "jaky-97cf5.appspot.com",
    messagingSenderId: "642856931579",
    appId: "1:642856931579:web:322ca6e99c231e4c"
};

firebase.initializeApp(firebaseConfig);
function writeToDatabase(pr_name, script, table) {
    var newKey = firebase.database().ref('/JAKY/').push();
    newKey.set({
        presentation_name: pr_name,
        script: script,
        index: -1
    });
    var i;
    for (i = 1; i < table.rows.length; i++) {
        newKey = firebase.database().ref('/JAKY/').push();
        newKey.set({
            presentation_name : pr_name,
            value: table.childNodes[i].childNodes[1].childNodes[0].nodeValue,
            index: Number(i)
        });
    }
}
function readFromDatabase() {
    firebase.database().ref('/JAKY/').once('value', function (snapshot) {
        initializeTable();

        var myValue = snapshot.val();
        if (myValue != null) {
            var keyList = Object.keys(myValue);

            for (var i = 0; i < keyList.length; i++) {
                var myKey = keyList[i];
                if (myValue[myKey].index == -1) {
                    textareaScript.value = myValue[myKey].script;
                    inputPr_name.value = myValue[myKey].presentation_name;
                } else {
                    addRow(myValue[myKey].value, (myValue[myKey].index - 1));
                }
            }
        }
    });
}
function initializeTable() {
    var numRows = tableKeywords.rows.length;

    for (var i = numRows - 1; i > 3; i--) {
        tableKeywords.deleteRow(i);
    }
}
function addRow(keywords, index) {
    var tr = document.createElement("TR");
    var td0 = document.createElement("TD");
    var td1 = document.createElement("TD");
    var td3 = document.createElement("TD");
    var btn_index = document.createElement("button");
    btn_index.onclick = "switch_index();";
    var text_index = document.createTextNode(index + 1);
    btn_index.appendChild(text_index);
    td3.innerHTML = "<input type='button' value='-' class = '-' onclick='deleteBtn(\"" + keywords + "\",\"" + index + "\" )' >";
    td1.innerHTML = keywords;
    td0.appendChild(btn_index);
    td1.style.color = "black";
    td0.style.width = "10%";
    td3.style.width = "10%";
    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td3);
    tableKeywords.insertBefore(tr, tableKeywords.children[index]);
}
function deleteBtn(keywords, index) {
    var td = document.createElement("TD");
    td.innerHTML = "<input type='button' value='Delete' class = 'delete' onclick='deleteRow(\"" + keywords + "\",\"" + index + "\" )' >";
    var i = Number(index) + 1;
    tableKeywords.childNodes[i].childNodes[2].remove();
    tableKeywords.childNodes[i].appendChild(td);
}
function addKeywords() {
    var index = tableKeywords.children.length - 1;
    if (inputKeywords.value != "") {
        addRow(inputKeywords.value, index);
        inputKeywords.value = null;
        inputKeywords.focus();
    }
}
function Enter_Check() {
    if (event.keyCode == 13) {
        addKeywords();
    }
}
function deleteRow(keywords, order) {
    for (var i = Number(order) + 2 ; i < tableKeywords.childNodes.length - 1; i++) {
        tableKeywords.childNodes[i].childNodes[2].remove();
        var td = document.createElement("TD");
        td.innerHTML = "<input type='button' value='-' class = '-' onclick='deleteBtn(\"" + keywords + "\",\"" + Number(i - 2) + "\" )' >";
        tableKeywords.childNodes[i].appendChild(td);
        tableKeywords.childNodes[i].childNodes[0].childNodes[0].innerHTML--;
    }
    tableKeywords.childNodes[Number(order) + 1].remove();

}
function ableEditscript() {
    beforetext = textareaScript.value;
    textareaScript.disabled = '';
    btnEditscript.disabled = 'disabled';
}
document.onclick = function () {
    if (document.body.childNodes[document.body.childNodes.length - 1] != undefined) {
        document.body.childNodes[document.body.childNodes.length - 1].remove();
    }
    var sp = document.createElement('mark');
    var selectionText = "";
    var selection = document.getSelection();
    if (selection) {
        if (selection.rangeCount) {
            selectionText = selection.toString();
        }
    }
    if (selectionText.length != 0) {
        var plus = document.createElement('button');
        var plusText = document.createTextNode('+');
        plus.appendChild(plusText);
        plus.style.position = "absolute";
        plus.onclick = function () {
            var range = selection.getRangeAt(0).cloneRange()
            range.surroundContents(sp)
            selection.removeAllRanges();
            selection.addRange(range);
            addRow(selectionText, (tableKeywords.children.length - 1));
            plus.remove();

        };
        var x = event.x;
        var y = event.y;
        plus.style.left = (x) + "px";
        plus.style.top = (y) + "px";
        document.body.appendChild(plus);
    }
}
function saveScript() {
    btnStart.disabled = "";
    textareaScript.disabled = 'disabled';
    btnEditscript.disabled = '';
    writeToDatabase(inputPr_name.value, textareaScript.value, tableKeywords);
}
function switch_index(){

}
// JavaScript source code
var allTable = document.getElementById('allTable');
var inputPr_name = document.getElementById("inputPresentationname");
var btnStart = document.getElementById("btnStart");
var beforetext = "";
var btnEditscript = document.getElementById("btnEditscript");
var textareaScript = document.getElementById("textareaScript");
var btnAddkeywords = document.getElementById("btnAddkeywords");
var tableKeywords = document.getElementById("tableKeywords");
var inputKeywords = document.getElementById("inputKeywords");
readFromDatabase();