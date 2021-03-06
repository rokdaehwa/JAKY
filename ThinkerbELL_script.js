var setting = document.getElementById('setting');
var parameter = "";
var inputIndex = document.getElementById("inputIndex");
var index_script = "";
var allTable = document.getElementById('allTable');
var inputPr_name = document.getElementById("inputPresentationname");
var btnEdit = document.getElementById("btnEdit");
var btnStart = document.getElementById("btnStart");
var btnAddkeywords = document.getElementById("btnAddkeywords");
var tableKeywords = document.getElementById("tableKeywords");
var inputKeywords = document.getElementById("inputKeywords");
var divStart = document.getElementById("start");
var dropdown = document.getElementById('inbox');
var cancel=document.getElementById('cancel');
var beforetext;
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
    var divLoading = document.getElementById('divLoading');
    divLoading.style.display = "block";
    firebase.database().ref('/JAKY/').once('value', function (snapshot) {
        var myValue = snapshot.val();
        if (myValue != null) {
            var keyList = Object.keys(myValue);
            if (parameter != "") {
                firebase.database().ref('/JAKY/' + parameter + '/').remove();
            }
        }
    });
    setTimeout(function () {
        var newKey = firebase.database().ref('/JAKY/' + pr_name + '/').push();
        newKey.set({
            script: script,
            index: 0
        });
        var i;
        for (i = 1; i < table.rows.length; i++) {
            newKey = firebase.database().ref('/JAKY/' + pr_name + '/').push();
            newKey.set({
                value: table.childNodes[i].childNodes[1].childNodes[0].nodeValue,
                index: Number(i)
            });
        }
    }, 1000);
    setTimeout(function () {
        location.href = './ThinkerbELL_script.html?' + pr_name;
    }, 2000);
}
function readFromDatabase() {
    var divLoading = document.getElementById('divLoading');
    if (parameter != "") {
        var promise = firebase.database().ref('/JAKY/' + parameter + '/').once('value', function (snapshot) {
            initializeTable();

            var myValue = snapshot.val();
            if (myValue != null) {
                var keyList = Object.keys(myValue);

                for (var i = 0; i < keyList.length; i++) {
                    var myKey = keyList[i];
                    if (myValue[myKey].index == 0) {
                        document.getElementById("draggable").innerHTML = myValue[myKey].script.replace(/\n/gi, "<br>");
                        beforetext = myValue[myKey].script;
                        inputPr_name.value = parameter;
                    } else {
                        addRow(myValue[myKey].value, (myValue[myKey].index - 1));
                    }
                }
            }
        });
        promise.then(snapshot=>divLoading.style.display='none');
    }
    else {
        divLoading.style.display='none';
    }
}
function initializeTable() {
    var numRows = tableKeywords.rows.length;

    for (var i = numRows - 1; i > 3; i--) {
        tableKeywords.deleteRow(i);
    }
}
function addRow(keywords, index) {
    //add keywords in (index + 1)
    var tr = document.createElement("TR");
    var td0 = document.createElement("TD");
    var td1 = document.createElement("TD");
    var td3 = document.createElement("TD");
    var text_index = Number(index) + 1;
    td3.innerHTML = "<button class='ui icon button' style='transform: scale(0.8);' onclick='deleteBtn(\"" + keywords + "\",\"" + index + "\" )' ><i class='minus icon'></i></button>";
    td1.innerHTML = keywords;
    td0.innerHTML = "<button class='ui blue button' style='width: 30%;  display: flex;align-items: center;justify-content: center; transform: scale(0.8);' onclick='change_index(\"" + text_index + "\" )' >" + String(text_index) + "</button>";
    td1.style.color = "black";
    td0.style.width = "10%";
    td3.style.width = "10%";
    tr.bgColor = "#FAD2A6";
    tr.id = index;
    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td3);
    tableKeywords.insertBefore(tr, tableKeywords.children[index]);
    for (var i = index + 2; i < tableKeywords.childNodes.length - 1; i++) {
        var td0 = document.createElement("td");
        var temp_index = i;
        td0.innerHTML = "<button class='ui blue button' style='width: 30%;  display: flex;align-items: center;justify-content: center; transform: scale(0.8);' onclick='change_index(\"" + temp_index + "\" )' >" + String(temp_index) + "</button>";
        var tr1 = tableKeywords.childNodes[i];
        tr1.id ++;
        var td = document.createElement("td");
        td.innerHTML = "<button class='ui icon button' style='transform: scale(0.8);' onclick='deleteBtn(\"" + keywords + "\",\"" + Number(i-1) + "\" )' ><i class='minus icon'></i></button>";
        tr1.childNodes[2].childNodes[0].remove();
        tr1.childNodes[0].childNodes[0].remove();
        tr1.childNodes[0].appendChild(td0.childNodes[0]);
        tr1.childNodes[2].appendChild(td.childNodes[0]);
    }
    $('#scrollbox').scrollTop(50 * index);
    setTimeout(function () {
        tr.bgColor = "";
    }, 500);
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
                if (Number(input_index.value) >= tableKeywords.children.length || Number(input_index) < 1) {
                    alert("Invalid index");
                } else {
                    input_keyword = tableKeywords.childNodes[text_index].childNodes[1].innerHTML;
                    change_keyword = tableKeywords.childNodes[input_index.value].childNodes[1].innerHTML;
                    if (text_index == input_index.value) {
                        tr.childNodes[0].childNodes[0].remove();
                        tr.childNodes[0].appendChild(node);
                        return;
                    }
                    deleteRow(input_keyword, Number(text_index) - 1); // delete text_index
                    if (text_index > input_index.value) {
                        deleteRow(change_keyword, Number(input_index.value) - 1); //delete input_index
                        addRow(change_keyword, Number(text_index) - 2);
                        addRow(input_keyword, Number(input_index.value) - 1);
                    }else{
                        deleteRow(change_keyword, Number(input_index.value) - 2); //delete input_index
                        addRow(change_keyword, Number(text_index) - 1);
                        addRow(input_keyword, Number(input_index.value) - 1);
                    }
                }
            } else {
                tr.childNodes[0].childNodes[0].remove();
                tr.childNodes[0].appendChild(node);
            }
        }
    };
    document.getElementById("draggable_2").onclick = function () {
        tr.childNodes[0].childNodes[0].remove();
        tr.childNodes[0].appendChild(node);
    };
    allTable.childNodes[1].childNodes[0].onclick = function () {
        tr.childNodes[0].childNodes[0].remove();
        tr.childNodes[0].appendChild(node);
    };
    allTable.childNodes[1].childNodes[2].childNodes[1].onclick = function () {
        tr.childNodes[0].childNodes[0].remove();
        tr.childNodes[0].appendChild(node);
    };
    allTable.childNodes[1].childNodes[4].childNodes[1].onclick = function () {
        tr.childNodes[0].childNodes[0].remove();
        tr.childNodes[0].appendChild(node);
    };
}
function deleteBtn(keywords, index) {
    var td = document.createElement("TD");
    td.innerHTML = "<button class = 'negative ui icon button' style='transform: scale(0.8);' onclick='deleteRow(\"" + keywords + "\",\"" + index + "\" )' ><i class='trash alternate outline icon'></i></button>";
    td.childNodes[0].onmouseout = function () {
        var td = document.createElement("TD");
        td.innerHTML = "<button class='ui icon button' style='transform: scale(0.8);' onclick='deleteBtn(\"" + keywords + "\",\"" + index + "\" )' ><i class='minus icon'></i></button>";
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
    } else{
        index = inputIndex.value;
    }
    if (inputKeywords.value != "") {
        if (index > tableKeywords.children.length || index < 0) {
            alert("Invalid index");
            inputIndex.value = null;
            inputIndex.focus();
        } else {
            addRow(inputKeywords.value, Number(index) - 1);
            inputIndex.value = null;
            inputKeywords.value = null;
            inputKeywords.focus();
        }
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
        tr.id--;
        tr.childNodes[2].childNodes[0].remove();
        var td = document.createElement("td");
        td.innerHTML = "<button class='ui icon button' style='transform: scale(0.8);' onclick='deleteBtn(\"" + keywords + "\",\"" + Number(i-2) + "\" )' ><i class='minus icon'></i></button>";
        tr.childNodes[2].appendChild(td.childNodes[0]);
        var td0 = document.createElement("td");
        var temp_index = Number(i) - 1;
        td0.innerHTML = "<button class='ui blue button' style='width: 30%;  display: flex;align-items: center;justify-content: center; transform: scale(0.8);' onclick='change_index(\"" + temp_index + "\" )' >" + String(temp_index) + "</button>";
        tr.childNodes[0].childNodes[0].remove();
        tr.childNodes[0].appendChild(td0.childNodes[0]);
    }
    tableKeywords.childNodes[Number(order) + 1].remove();

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
        // var plus = document.createElement('button');
        // var plusText = document.createTextNode('+');
        // plus.appendChild(plusText);
        // plus.style.position = "absolute";
        // plus.className = "plus";
        var plus = document.createElement('div');
        var plusbutton = document.createElement('button');
        plusbutton.className = "ui blue icon button";
        plusbutton.innerHTML = "<i class='plus icon'></i>";
        plusbutton.style.transform = "scale(0.8)"
        plus.appendChild(plusbutton);
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
        plus.style.top = (Number(y)) + "px";
        document.body.appendChild(plus);

    }
}
function saveScript() {
    var textareaScript = document.getElementById("textareaScript");
    if (textareaScript != null) {
        draggable.innerHTML = textareaScript.value;
        beforetext = textareaScript.value;
    }
    writeToDatabase(inputPr_name.value, draggable.innerHTML, tableKeywords);
    if (textareaScript != null) {
        textareaScript.remove();
    }
}
function Edit() {
    var textareaScript = document.createElement("textarea");
    textareaScript.id = "textareaScript";
    if (beforetext != undefined) {
        textareaScript.value = String(beforetext);
    } else {
        textareaScript.value = "";
        textareaScript.placeholder = "Copy&Paste";
    }
    document.getElementById("draggable").innerHTML = "";
    textareaScript.style.width = "100%";
    textareaScript.style.height = "95%";
    draggable.appendChild(textareaScript);
    inputPr_name.disabled = '';
    textareaScript.disabled = '';
    textareaScript.focus();
    btnEdit.parentElement.innerHTML = '<button class="ui primary button" id="btnSave" onclick="saveScript();" style="height:100%; width:10%; font-size:100%;">Save</button>';
    
}
function startPresentation() {
    if (inputPr_name.value == "") {
        alert("Please enter your prsentation name.");
        return;
    }
    document.getElementById("title").innerHTML = inputPr_name.value;
    setting.style.display = 'block';
}
$(document).ready(function () {
    inputPr_name.disabled = 'disabled';
    if (location.search) {
      parameter = location.search;
      var paramIndex = parameter.indexOf("?");
       parameter = parameter.substring(paramIndex + 1);
    }
    parameter = parameter.replace(/%20/gi, " ");
    parameter = parameter.replace(/%27/gi, "'");
    readFromDatabase();
    document.body.childNodes[1].onclick = function () {
        location.href = 'https://rokdaehwa.github.io/JAKY/ThinkerbELL_list'
    };
    divStart.onclick = function () {
        if (inbox.value == "") {
            alert("No time input");
        } else{
            var parameter2 = inbox.value;
            if(document.getElementById("check1").checked == true){
                location.href = './ThinkerbELL_tutorial.html?' + parameter + '?' + parameter2;
            }
            else{
                location.href = './ThinkerbELL_main.html?' + parameter + '?' + parameter2;
            }
        }
    }
    $('.ui.dropdown').dropdown();
    cancel.onclick=function(){
        setting.style.display='none';
    }

});
