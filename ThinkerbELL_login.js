var btnStart = document.getElementById('btnStart');
var divLoading = document.getElementById('divLoading');
var inputID = document.getElementById('inputID');
var inputPW = document.getElementById('inputPW');

divLoading.style.display = 'none';
btnStart.onclick = function(){
    if(inputID.value != "startupPresenter1" || inputPW.value != '******'){
        alert("Invalid ID/PW");
    }else{
        divLoading.style.display = 'block';
        location.href='ThinkerbELL_list.html'
    }
}
function Enter_Check(){
    if(event.keyCode== 13){
        if(inputID.value != "startupPresenter1" || inputPW.value != '******'){
            alert("Invalid ID/PW");
        }else{
            divLoading.style.display = 'block';
            location.href='ThinkerbELL_list.html'
        }
    }
}
