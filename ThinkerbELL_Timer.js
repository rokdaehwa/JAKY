var divTime = document.getElementById("time_input");
var divStart = document.getElementById("start");
var divStop = document.getElementById("stop");
var divRestart = document.getElementById("restart");

var T; 
var t=0;
var clock;

google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(timer);
  
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
            clearInterval(clock);
            alert("Time Done");
          }
          else{t+=100;}
  }

divStart.onclick = function(){
  T=60000*divTime.value;
  clock = setInterval("timer()",100);
}
divStop.onclick = function(){
  clearInterval(clock);
}
divRestart.onclick = function(){
  t=0;
  timer();
}

