var tblList = document.getElementById('tblList');
var divAdd = document.getElementById('divAdd');
var btnDelete = document.getElementById('btnDelete');
var newTd;


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

function readFromDatabase() {
    var divLoading = document.getElementById('divLoading');
    var promise = firebase.database().ref('/JAKY/').once('value', function (snapshot) {

        var myValue = snapshot.val();
        if (myValue != null) {
            var keyList = Object.keys(myValue);
            // console.log(keyList);
            for (var i = 0; i < keyList.length; i++) {
                addList(i + 1, keyList[i]);
            }
        }
    });
    promise.then(snapshot=>divLoading.style.display = 'none');
}

function addList(num, name) {
    var link = 'https://rokdaehwa.github.io/JAKY/ThinkerbELL_script?' + name;

    $('#tblList').append(
        $('<tr>').append(
            $('<td>').append(num),
            $('<td>').prop('id', name).append(
                $('<a>').prop('href', link).append(name)
            )
        )
    );
}

function deleteCol() {  
    console.log('deleteCol');
    if (btnDelete.getAttribute('class') == 'negative ui icon button') {
        btnDelete.setAttribute('class', 'ui icon button');
        btnDelete.removeChild(btnDelete.firstChild);
        var cancel = document.createElement('i');
        cancel.setAttribute('class', 'reply icon');
        btnDelete.appendChild(cancel);

        var tblList_tr = tblList.getElementsByTagName('tr');
        for (var i = 1; i < tblList_tr.length; i++) {
            newTd = document.createElement('td');
            tblList_tr[i].appendChild(newTd);
            add_input();
        }
    } else {
        btnDelete.setAttribute('class', 'negative ui icon button');
        btnDelete.removeChild(btnDelete.firstChild);
        var trashcan = document.createElement('i');
        trashcan.setAttribute('class', 'trash alternate outline icon');
        btnDelete.appendChild(trashcan);

        var tblList_tr = tblList.getElementsByTagName('tr');
        for (var i = 1; i < tblList_tr.length; i++) {
            var tr_td = tblList_tr[i].getElementsByTagName('td');
            tblList_tr[i].deleteCell(tr_td.length - 1);
        }
    }
}

function add_input() {
    var inp = document.createElement('button');
    inp.setAttribute('class', 'negative ui icon button');
    // inp.value('delete');
    var icon = document.createElement('i');
    icon.setAttribute('class', 'trash alternate outline icon');
    inp.setAttribute('onclick', 'deleteRow(this)');
    inp.appendChild(icon);
    newTd.appendChild(inp);
}

function deleteRow(button) {
    var table=button.parentNode.parentNode;
    removeFromlistBox(table.childNodes[1].getAttribute('id'));
}

function removeFromlistBox(title) {
    console.log(title);
    firebase.database().ref('/JAKY/').once('value',function(snapshot) {
        var myValue = snapshot.val();
        if (myValue != null){
            var keyList = Object.keys(myValue);
            console.log(keyList);
            for(var i = 0; i < keyList.length; i++){
                var currentKey = keyList[i];
                console.log(currentKey);
                if(currentKey === title) {
                    console.log('Deleted: ' + title);
                    firebase.database().ref('/JAKY/' + currentKey).remove();
                    window.location.reload();
                }
            }
        }    
    });
} 

$(document).ready(function() {
    readFromDatabase();     
     $('.ui.dropdown').dropdown();
});
