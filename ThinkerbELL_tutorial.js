var title=document.getElementById("title");
var canvas=document.getElementById("canvas");
var title2=document.getElementById("title2");
var title3=document.getElementById("title3");
var vertic=document.getElementById('vertic');
var clock=document.getElementById('clock');
var title4=document.getElementById('title4');
var title5=document.getElementById('title5');
var arrow=document.getElementById('arrow');
var arrow2=document.getElementById('arrow2');
var progressbar=document.getElementById('progressbar');
var pointdown=document.getElementById('pointdown');
var pointup=document.getElementById('pointup');
var counter=0;

title2.style.visibility='hidden';
title3.style.visibility='hidden';
vertic.style.visibility='hidden';
title4.style.visibility='hidden';
title5.style.visibility='hidden';
arrow.style.visibility='hidden';
arrow2.style.visibility='hidden';

canvas.onclick=function(){
 if(counter==0){
    title.style.visibility='hidden'; 
    title2.style.visibility='visible';
    title3.style.visibility='visible';
    vertic.style.visibility='visible';
    console.log('first');
    counter++;
    return;
 }
 if(counter==1){
    clock.style.zIndex=8;
    console.log('second');
    title2.style.visibility='hidden';
    title3.style.visibility='hidden';
    title4.style.visibility='visible';
    title5.style.visibility='visible';
    vertic.style.visibility='hidden';
    clock.style.color='white';
    arrow.style.visibility='visible';
    arrow2.style.visibility='visible';
    progressbar.style.zIndex=6;
    pointdown.style.zIndex=6;
    pointup.style.zIndex=6;
    //progressbar.style.color='white';
    //progressbar.style.opacity=0.75;
    pointdown.style.color='white';
    pointup.style.color='white';
    counter++;
    return;
 }
 if(counter==2){
   parameter = location.search;
   var paramIndex = parameter.indexOf("?");
   parameter = parameter.substring(paramIndex + 1);
   location.href='./ThinkerbELL_presentation.html?'+parameter;
   return;
 }
}
