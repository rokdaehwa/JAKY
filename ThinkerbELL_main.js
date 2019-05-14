var area1=document.getElementById("area1");
var area2=document.getElementById("area2");

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
    var location=window.location.href;
    var questionindex=location.indexOf('?');
    //var parameter=location.substring(questionindex+1);
    var parameter = 'Autoshoes';
    return firebase.database().ref('JAKY/'+parameter).once('value', function(snapshot) {
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
        document.addEventListener("keyup", function(event) {
            if (event.keyCode === 37||event.keyCode==40||event.keyCode==80||event.keyCode==8){
            event.preventDefault();
            area1.click();
            }
            if(event.keyCode===32||event.keyCode==78||event.keyCode==38||event.keyCode==39||event.keyCode==13){
                event.preventDefault();
                area2.click();  
          }});
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
    rightbox.style.backgroundColor='#EBA393';
    rightbox.innerHTML=mid[newkey2];

}

document.getElementById("closeicon").onclick=function(){
    location.href='ThinkerbELL_list.html';
}

var T=60000; // From setting page
var t=0;
var P;
var pwidth=0;
var twidth=0;
var tbar = document.getElementById("TBar"); 
var tpointer = document.getElementById("TPointer");
var ppointer = document.getElementById("PPointer");

function time_manage() {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(timer);

    var time = setInterval(timer, 10);

    function frame() {
    }
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
  }
  time_manage();
