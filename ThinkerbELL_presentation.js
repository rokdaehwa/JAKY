var area1=document.getElementById("area1");
var area2=document.getElementById("area2");
var small=document.getElementById("small");
var index=0;
var mid=[];

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
  loadDatafromFirebase();
  
  function loadDatafromFirebase(){
    //var location=window.location.href;
    //var questionindex=location.indexOf('?');
    //var parameter=location.substring(questionindex);
    //return firebase.database().ref('JAKY/'+parameter).once('value', function(snapshot) {
    return firebase.database().ref('JAKY/Autoshoes').once('value', function(snapshot) {
        var myKey = snapshot.key;
        var myValue = snapshot.val();
        var keyList = Object.keys(myValue);

        for(var i=1;i<keyList.length;i++) {
            var myKey = keyList[i];
            mid.push(myValue[myKey].value);
        }
        console.log(mid);
        updatekeywords(mid);
        area1.onclick=function(){
            if(index==-1){
                index=0;
            }
            index--;
            //updateFB(myKey,index);
            //deleteFB();
            //writeToFB(index);
            console.log(mid);
            updatekeywords(mid);
        }
        area2.onclick=function(){
            if(index==-1){index=0;}
            index++;
            //updateFB(myKey,index);
            //deleteFB();
            //writeToFB(index);
            updatekeywords(mid);
        }
    })
}

function updatekeywords(mid){
    if(index==-1){
        return;
    }
    var newkey=Object.keys(mid)[index];
    var newkey2=Object.keys(mid)[index+1];
    if(newkey==null){
        location.href='ThinkerbELL_presentation2.html';
            return;
    }
    leftbox.innerHTML=mid[newkey];
    if(newkey2==null){
        rightbox.innerHTML="End of document";
        rightbox.style.backgroundColor="grey";
        return;
    }
    rightbox.innerHTML=mid[newkey2];

}

small.onclick=function(){
    location.href='ThinkerbELL_list.html';
}
