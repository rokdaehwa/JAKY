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
function writeToDatabase(keywords, index) {
    var newKey = firebase.database().ref('/keywords/').push();
    newKey.set({
        value: keywords,
        index: index
    });
}
function readFromDatabase() {
    firebase.database().ref('/keywords/').once('value', function (snapshot) {
        initializeTable();

        var myValue = snapshot.val();
        if (myValue != null) {
            var keyList = Object.keys(myValue);

            for (var i = 0; i < keyList.length; i++) {
                var myKey = keyList[i];
                addRow(myValue[myKey].value, myValue[myKey].index);
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
    var td1 = document.createElement("TD");
    var td2 = document.createElement("TD");
    td2.innerHTML = "<input type='button' value='Delete' class = 'delete' onclick='deleteRow(\"" + keywords + "\",\"" + index + "\" )' >";
    td1.innerHTML = keywords;
    td1.style.color = "black";
    tr.appendChild(td1);
    tr.appendChild(td2);
    tableKeywords.insertBefore(tr, tableKeywords.children[index]);
}
function addKeywords() {
    var index = tableKeywords.children.length - 1;
    if (inputKeywords.value != "") {
        writeToDatabase(inputKeywords.value, index);
        addRow(inputKeywords.value, index);
        inputKeywords.value = null;
    }
}
function deleteRow(keywords, order) {
    firebase.database().ref('/keywords/').once('value', function (snapshot) {
        var myValue = snapshot.val();
        if (myValue != null) {
            var keyList = Object.keys(myValue);
            for (var i = 0; i < keyList.length; i++) {
                var currentKey = keyList[i];
                if (myValue[currentKey].value === keywords && myValue[currentKey].index == order) {
                    firebase.database().ref('/keywords/' + currentKey).remove();
                }
                if (myValue[currentKey].index > order) {
                    myValue[currentKey].index--;
                }
            }
        }
    });
    for (var i = 1; i < tableKeywords.childNodes.length; i++) {
        if (keywords === tableKeywords.childNodes[i].childNodes[0].childNodes[0].nodeValue && order == i - 1) {
            tableKeywords.childNodes[i].remove();
        }
    }

}
function browse() {
    textareaScript.value = text;
    var text_list = text.split(" ");
    textareaScript.disabled = 'disabled';
}
function ableEditscript() {
    beforetext = textareaScript.value;
    textareaScript.disabled = '';
}
function selectText() {
    var selectionText = "";
    if (document.getSelection) {
        selectionText = document.getSelection().toString();
    }
    return selectionText;
}
document.onmouseup = function () {
    if (selectText().length != 0) {
        inputKeywords.value = selectText();
    }
}
function saveScript() {
    btnStart.disabled = "";
    textareaScript.disabled = 'disabled';
}
// JavaScript source code
var btnStart = document.getElementById("btnStart");
var beforetext = "";
var btnEditscript = document.getElementById("btnEditscript");
var textareaScript = document.getElementById("textareaScript");
var btnAddkeywords = document.getElementById("btnAddkeywords");
var tableKeywords = document.getElementById("tableKeywords");
var inputKeywords = document.getElementById("inputKeywords");
readFromDatabase();