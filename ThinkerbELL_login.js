var btnStart = document.getElementById('btnStart');
var inputID = document.getElementById('inputID');
var inputPW = document.getElementById('inputPW');

btnStart.onclick = function(){
    if(inputID.value != "startupPresenter1" || inputPW.value != '******'){
        //alert("Invalid ID/PW");
    }else{
        //divLoading.style.display = 'block';
        //location.href='ThinkerbELL_list.html'
    }
    location.href='ThinkerbELL_list.html'
}
function Enter_Check(){
    if(event.keyCode== 13){
        if(inputID.value != "startupPresenter1" || inputPW.value != '******'){
            //alert("Invalid ID/PW");
        }else{
            //divLoading.style.display = 'block';
            //location.href='ThinkerbELL_list.html'
        }
        location.href='ThinkerbELL_list.html'
    }
}