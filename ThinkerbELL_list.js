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
            $('<td>').append(
                $('<a>').prop('href', link).append(name)
            )
        )
    );
}

$(document).ready(function() {
    readFromDatabase();     
     $('.ui.dropdown').dropdown();
});
