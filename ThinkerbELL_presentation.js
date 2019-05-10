var area1=document.getElementById("area1");
var area2=document.getElementById("area2");
var index=0;

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

updateKeywords();

area1.onclick=function(){
    index--;
    updateKeywords();
}

area2.onclick=function(){
    index++;
    updateKeywords();
}

function updateKeywords(){
    ref=firebase.database().ref('keywords');
    ref.orderByChild('index').equalTo(index).once("value").then(function(snapshot){
        if(index==-1){
            return;
        }
        var myValue=snapshot.val();
        if(myValue==null){
            location.href='ThinkerbELL_presentation2.html';
            return;
        }
        var keyList = Object.keys(myValue);
        var content=myValue[keyList[0]]["value"];
        leftbox.innerHTML=content;
        });        
    ref.orderByChild('index').equalTo(index+1).once("value").then(function(snapshot){
        var myValue=snapshot.val();
        if(index==-1){
            index=0;
            return;
        }
        if(myValue==null){
            rightbox.innerHTML="End of document";
            rightbox.style.backgroundColor="grey";
            return;
        }
        rightbox.style.backgroundColor='#EBA393';
        var keyList = Object.keys(myValue);
        var content=myValue[keyList[0]]["value"];
        rightbox.innerHTML=content;
        });
    } 