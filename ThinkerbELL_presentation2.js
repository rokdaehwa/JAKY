var mainbox=document.getElementById("mainbox");
var area=document.getElementById("area");
var popup=document.getElementById("popup");
var body=document.getElementsByClassName("body");
var counter=0;

popup.style.visibility='hidden';


area.onclick=function(){
    if(counter%2==0){
        popup.style.visibility='visible';
        counter++;
       // document.body.style.backgroundColor='#C9C9C4';
        //document.body.style.zIndex=6;
    }
    else{
        popup.style.visibility='hidden';
        counter++;
        //document.body.style.backgroundColor='#E6E2CF';
    }
    
}

popup.onclick=function(){
    alert('1');
}


