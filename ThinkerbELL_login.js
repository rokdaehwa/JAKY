var btnStart = document.getElementById('btnStart');
var divLoading = document.getElementById('divLoading');

divLoading.style.display = 'none';
btnStart.onclick = function(){
    divLoading.style.display = 'block';
    location.href='ThinkerbELL_list.html'
}
function Enter_Check(){
    if(event.keyCode== 13){
        divLoading.style.display = 'block';
        location.href='ThinkerbELL_list.html'
    }
}
