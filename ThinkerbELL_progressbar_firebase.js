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

var P=0; 
var keywordList = [];
function MakeKeywordList(prName) {
  return firebase.database().ref('/JAKY/'+prName).once('value',function(snapshot) {
    var myValue = snapshot.val();
    if(myValue != null){
      var keyList = Object.keys(myValue);
      P = keyList.length-1;
      for(var i=1;i<keyList.length;i++){
        var currentKey = keyList[i];
        keywordList.push(myValue[currentKey].value);
      }
    }
  });
}

var T=10000;
var pwidth=0;
var twidth=0;
var tbar = document.getElementById("TBar"); 
var tpointer = document.getElementById("TPointer");
var ppointer = document.getElementById("PPointer");
var next = document.getElementById("next");

function moveTBar() {
  var id = setInterval(frame, 10);
  function frame() {
    var dif = twidth - pwidth;
    if (twidth >= 100) {
      clearInterval(id);
    } 
    else {
      twidth+=(1000/T); 
      tbar.style.width = twidth + '%'; 
      tpointer.style.width = twidth + '%';
    }
    if(dif>10){
      tbar.style.backgroundColor = 'red';
    }
    else if(dif<-10){
      tbar.style.backgroundColor = '#e5e500';
    }
    else{
      tbar.style.backgroundColor = 'green';
    }
  }
}
MakeKeywordList("Autoshoes");
next.onclick = function() {
  pwidth += (100/P);
  ppointer.style.width = pwidth + '%';
  if(pwidth>=100){
    next.disabled = true;
  }
}

moveTBar();


  