var divStart = document.getElementById("start");
var divLoading = document.getElementById('loading');

divLoading.style.display = 'none';
divStart.onclick = function(){
    divLoading.style.display = 'block';
}