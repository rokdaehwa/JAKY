var area1=document.getElementById("area1");
var area2=document.getElementById("area2");
var ready = document.getElementById("ready");
var setting=document.getElementById("setting");
var cancel=document.getElementById("cancel");
var finish=document.getElementById("finish");
var newind;
var index=0;
var mid=[];
var parameter2;
var time;

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
    var location=window.location.href;
    var indexstring=location.split('?');
    var parameter=indexstring[1];
    parameter2=indexstring[2];
    var promise = firebase.database().ref('JAKY/'+parameter).once('value', function(snapshot) {
        var myKey = snapshot.key;
        var myValue = snapshot.val();
        var keyList = Object.keys(myValue);

        for(var i=1;i<keyList.length;i++) {
            var myKey = keyList[i];
            mid.push(myValue[myKey].value);
        }
        //console.log(mid);
        P=mid.length;
        updatekeywords(mid);
        area1.onclick=function(){
            if(index==-1){
                index=0;
            }
            index--;
            updatekeywords(mid);
            if(pwidth<=0){
              pwidth=0;
            }
            else{
              pwidth -= (100/P);
            }
            ppointer.style.width = pwidth + '%';
        }
        area2.onclick=function(){
            if(index==-1){index=0;}
            index++;
            updatekeywords(mid);
            if(pwidth>=100){
              pwidth=100; 
            }
            else{
              pwidth += (100/P);
            }
            ppointer.style.width = pwidth + '%';
        }
    });
    promise.then(snapshot=>divLoading.style.display = 'none');  
}


function updatekeywords(mid){

    if(index==-1){
        return;
    }
    var newkey=Object.keys(mid)[index];
    var newkey2=Object.keys(mid)[index+1];
    if(index==1001){
      setting.style.display = 'block';
      index--;
      return;
    }
    if(index==999){
      index=newind-1;
      console.log("hi");
      updatekeywords(mid);
      return;
    }
    if(newkey==null&&index!=999){
      console.log(index);
      leftbox.innerHTML="End of document";
      leftbox.style.backgroundColor='grey';
      rightbox.innerHTML="Finish Presentation";
      rightbox.style.backgroundColor='#FF4E44';
      newind=index;
      index=1000;
      return;
    }
    leftbox.style.backgroundColor='#EBA393'
    leftbox.innerHTML=mid[newkey];
    if(newkey2==null){
        rightbox.innerHTML="End of document";
        rightbox.style.backgroundColor="grey";
        return;
    }
    rightbox.style.backgroundColor='#EBA393';
    rightbox.innerHTML=mid[newkey2];
}

finish.onclick=function(){
  location.href='ThinkerbELL_list.html';
}

cancel.onclick=function(){
  setting.style.display='none';
}

document.getElementById("closeicon").onclick=function(){
    location.href='ThinkerbELL_list.html';
}

var T=60000*parameter2; // From setting page
var t=0;
var P;
var pwidth=0;
var twidth=0;
var tbar = document.getElementById("TBar"); 
var tpointer = document.getElementById("TPointer");
var ppointer = document.getElementById("PPointer");

function timer(){
  var data = google.visualization.arrayToDataTable([
    ['Time', 'Percentage'],
    ['Spent',      t],
    ['Remaining',T-t],
  ]);

  var options = {
    title: 'Timer',
    colors: ['white','red'],
    legend: 'none',
    pieSliceText: 'none',
    pieSliceBorderColor: 'black',
    chartArea: {left: '5%', top: '5%', width: '90%', height: '90%'}
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);

  if(t>=T){
    clearInterval(time);
    alert("Time Done");
    location.href='ThinkerbELL_presentation2.html';
  }
  else{t+=10;}

  var dif = twidth - pwidth;
  if (twidth >= 100) {
    clearInterval(time);
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

function start(){
  ready.style.display = "none";
  time = setInterval(timer, 10);
  document.addEventListener("keyup", function(event) {
            if (event.keyCode === 37||event.keyCode==40||event.keyCode==80||event.keyCode==8){
            event.preventDefault();
            area1.click();
            }
            if(event.keyCode===32||event.keyCode==78||event.keyCode==38||event.keyCode==39||event.keyCode==13){
                event.preventDefault();
                area2.click();  
          }});
}

$(document).ready(function() {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(timer);
});
