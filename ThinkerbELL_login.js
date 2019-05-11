var btnStart = document.getElementById('btnStart');
var divLoading = document.getElementById('divLoading');

divLoading.style.display = 'none';
btnStart.onclick = function(){
    divLoading.style.display = 'block';
    location.href='ThinkerbELL_script.html'
}
