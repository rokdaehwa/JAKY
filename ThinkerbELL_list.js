var tblList = document.getElementById('tblList');
var divAdd = document.getElementById('divAdd');


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
    firebase.database().ref('/JAKY/').once('value', function (snapshot) {

        var myValue = snapshot.val();
        if (myValue != null) {
            var keyList = Object.keys(myValue);
            // console.log(keyList);
            for (var i = 0; i < keyList.length; i++) {
                addList(i + 1, keyList[i]);
            }
        }
    });
}

function addList(num, name) {
    console.log("add List..");
    var row = tblList.insertRow(-1);
    var col1 = row.insertCell(0);
    var col2 = row.insertCell(1);
    
    col1.innerHTML = num;
    col2.innerHTML = name;
    
}


function selectAction(name) {
    
}

function startPresentation(name) {
    
}
