﻿var firebaseConfig = {
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
    firebase.database().ref('/JAKY/').once('value', function (snapshot) {
        var myValue = snapshot.val();
        if (myValue != null) {
            var keyList = Object.keys(myValue);
            for (var i = 0; i < keyList.length; i++) {
                var myKey = keyList[i];
                if (myKey == pr_name) {
                    firebase.database().ref('/JAKY/' + pr_name).remove();
                }
            }
        }
    });
    setTimeout(function () {
        var newKey = firebase.database().ref('/JAKY/' + pr_name).push();
        newKey.set({
            script: script,
            index: 0
        });
        var i;
        for (i = 1; i < table.rows.length; i++) {
            newKey = firebase.database().ref('/JAKY/' + pr_name).push();
            newKey.set({
                value: table.childNodes[i].childNodes[1].childNodes[0].nodeValue,
                index: Number(i)
            });
        }
    }, 1000);
}
function readFromDatabase() {
    firebase.database().ref('/JAKY/' + parameter + '/').once('value', function (snapshot) {
        initializeTable();

        var myValue = snapshot.val();
        if (myValue != null) {
            var keyList = Object.keys(myValue);

            for (var i = 0; i < keyList.length; i++) {
                var myKey = keyList[i];
                if (myValue[myKey].index == 0) {
                    document.getElementById("draggable").innerHTML = myValue[myKey].script;
                    beforetext = myValue[myKey].script;
                    inputPr_name.value = parameter;
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
    var text_index = Number(index) + 1;
    td3.innerHTML = "<input type='button' value='-' class = '-' onclick='deleteBtn(\"" + keywords + "\",\"" + index + "\" )' >";
    td1.innerHTML = keywords;
    td0.innerHTML = "<input type='button' value=\""+ text_index + "\" onclick='change_index(\"" + text_index + "\" )' >";
    td1.style.color = "black";
    td0.style.width = "10%";
    td3.style.width = "10%";
    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td3);
    tableKeywords.insertBefore(tr, tableKeywords.children[index]);
    for (var i = index + 2; i < tableKeywords.childNodes.length - 1; i++) {
        var td0 = document.createElement("td");
        var temp_index = Number(tr.childNodes[0].childNodes[0].value) + 1;
        td0.innerHTML = "<input type='button' value=\"" + temp_index + "\" onclick='change_index(\"" + temp_index + "\" )' >";
        var tr = tableKeywords.childNodes[i];
        var td = document.createElement("td");
        td.innerHTML = "<input type='button' value='-' class = '-' onclick='deleteBtn(\"" + keywords + "\",\"" + Number(i - 1) + "\" )' >";
        tr.childNodes[2].childNodes[0].remove();
        tr.childNodes[0].childNodes[0].remove();
        tr.childNodes[0].appendChild(td0.childNodes[0]);
        tr.childNodes[2].appendChild(td.childNodes[0]);
    }
}
function change_index(text_index) {
    var input_index = document.createElement("input");
    input_index.placeholder = "#";
    input_index.style.width = "100%"
    var tr = tableKeywords.childNodes[text_index];
    var node = tr.childNodes[0].childNodes[0];
    tr.childNodes[0].childNodes[0].remove();
    tr.childNodes[0].appendChild(input_index);
    input_index.focus();
    input_index.onkeydown = function () {
        if (event.keyCode == 13) {
            if (input_index.value != "") {
                input_keyword = tableKeywords.childNodes[text_index].childNodes[1].innerHTML;
                change_keyword = tableKeywords.childNodes[input_index.value].childNodes[1].innerHTML;
                deleteRow(input_keyword, Number(text_index) - 1);
                deleteRow(change_keyword, Number(input_index.value) - 1);
                addRow(input_keyword, Number(input_index.value) - 1);
                addRow(change_keyword, Number(text_index) - 1);
            } else {
                tr.childNodes[0].childNodes[0].remove();
                tr.childNodes[0].appendChild(node);
            }
        }
    };

}
function deleteBtn(keywords, index) {
    var td = document.createElement("TD");
    td.innerHTML = "<input type='button' value='Delete' class = 'delete' onclick='deleteRow(\"" + keywords + "\",\"" + index + "\" )' >";
    td.childNodes[0].onmouseout = function () {
        var td = document.createElement("TD");
        td.innerHTML = "<input type='button' value='-' class = '-' onclick='deleteBtn(\"" + keywords + "\",\"" + index + "\" )' >";
        tableKeywords.childNodes[i].childNodes[2].childNodes[0].remove();
        tableKeywords.childNodes[i].childNodes[2].appendChild(td.childNodes[0]);
    };
    var i = Number(index) + 1;
    tableKeywords.childNodes[i].childNodes[2].childNodes[0].remove();
    tableKeywords.childNodes[i].childNodes[2].appendChild(td.childNodes[0]);
}
function addKeywords() {
    var index;
    if (inputIndex.value == "") {
        index = tableKeywords.children.length;
    } else {
        index = inputIndex.value;
    }
    if (inputKeywords.value != "") {
        addRow(inputKeywords.value, Number(index) - 1);
        inputIndex.value = null;
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
        var tr = tableKeywords.childNodes[i];
        tr.childNodes[2].childNodes[0].remove();
        var td = document.createElement("td");
        td.innerHTML = "<input type='button' value='-' class = '-' onclick='deleteBtn(\"" + keywords + "\",\"" + Number(i - 2) + "\" )' >";
        tr.childNodes[2].appendChild(td.childNodes[0]);
        var td0 = document.createElement("td");
        var temp_index = Number(tr.childNodes[0].childNodes[0].value) - 1;
        td0.innerHTML = "<input type='button' value=\"" + temp_index + "\" onclick='change_index(\"" + temp_index + "\" )' >";
        tr.childNodes[0].childNodes[0].remove();
        tr.childNodes[0].appendChild(td0.childNodes[0]);
    }
    tableKeywords.childNodes[Number(order) + 1].remove();

}
function ableEditscript() {
    var textareaScript = document.createElement("textarea");
    textareaScript.id = "textareaScript";
    textareaScript.value = String(beforetext);
    document.getElementById("draggable").innerHTML = "";
    textareaScript.style.width = "100%";
    textareaScript.style.height = "95%";
    draggable.appendChild(textareaScript);
    textareaScript.disabled = '';
    btnEditscript.disabled = 'disabled';
}
function selectText() {
    var selectionText = "";
    if (document.getSelection) {
        selectionText = document.getSelection();
    } else if (document.selection) {
        selectionText = document.selection.createRange().text;
    }
    selectionText = String(selectionText);
    return selectionText;
}
document.getElementById("draggable").onclick = function () {
    if (document.body.childNodes[document.body.childNodes.length - 1] != undefined && document.body.childNodes[document.body.childNodes.length - 1].className == "plus") {
        document.body.childNodes[document.body.childNodes.length - 1].remove();
    }
    var sp = document.createElement('mark');
    sp.className = "highlights";
    var selectionText = selectText();
    if (selectionText.length != 0) {
        var plus = document.createElement('button');
        var plusText = document.createTextNode('+');
        plus.appendChild(plusText);
        plus.style.position = "absolute";
        plus.className = "plus";
        plus.onclick = function () {
            var selection = document.getSelection();
            var range = selection.getRangeAt(0).cloneRange()
            //range.surroundContents(sp)
            //selection.removeAllRanges();
            //selection.addRange(range);
            addRow(selectionText, (tableKeywords.children.length - 1));
            plus.remove();
        };
        var x = event.x;
        var y = event.y;
        plus.style.left = (x) + "px";
        plus.style.top = (Number(y) - 73) + "px";
        document.body.appendChild(plus);

    }
}
function saveScript() {
    var textareaScript = document.getElementById("textareaScript");
    btnStart.disabled = "";
    btnEditscript.disabled = '';
    if (textareaScript != null) {
        draggable.innerHTML = textareaScript.value;
        beforetext = textareaScript.value;
    }
    writeToDatabase(inputPr_name.value, draggable.innerHTML, tableKeywords);
    if (textareaScript != null) {
        textareaScript.remove();
    }
}
function switch_index(){

}

function startPresentation() {
    divLoading.style.display = 'block';
    location.href = 'ThinkerbELL_tutorial?' + parameter;
}
// JavaScript source code
if (location.search) {
    var parameter = location.search;
    var paramIndex = parameter.indexOf("?");
    parameter = parameter.substring(paramIndex + 1);
}

var inputIndex = document.getElementById("inputIndex");
var index_script = "";
var allTable = document.getElementById('allTable');
var inputPr_name = document.getElementById("inputPresentationname");
var btnStart = document.getElementById("btnStart");
var btnEditscript = document.getElementById("btnEditscript");
var btnAddkeywords = document.getElementById("btnAddkeywords");
var tableKeywords = document.getElementById("tableKeywords");
var inputKeywords = document.getElementById("inputKeywords");
var beforetext;
readFromDatabase();
