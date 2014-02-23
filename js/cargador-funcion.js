$(document).ready(function(){
   inicio();
});

function inicio(){
   'use strict';
   dibujar();
}

var canvas = document.getElementById('js'), ctx;

function dibujar(){
   if(!canvas.getContext){
      alert('Su navegador es obsoleto, actualice a una versión reciente.');
   }else{
      ctx = canvas.getContext('2d');
      $(document).on('click',function(){
         carga(0, 75, '#e54d26', '#f0f0f0', '#666', 10);
      });
   }
}
function carga(ini, porc, bord, rell, txt, time){
   setInterval(function(){
      if(ini <= porc){
         dib_cir(ini, bord, rell, txt);
         ini++;
      }else{
         return false;
      }
   },time);
}

function dib_cir(porc, bord, rell, txt){
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   var ang = (360*porc)/100;
   //ciculo externo
   ctx.beginPath();
   ctx.fillStyle = bord;
   //derecha a izquierda
   ctx.arc(250,250,75,(Math.PI/-2),(Math.PI/180*ang)-(Math.PI/2));
   ctx.arc(250,250,10,(Math.PI/180*ang)-(Math.PI/2),(Math.PI/-2));
   //izquierda a derecha
   /*ctx.arc(100,100,75,(Math.PI/-2),(Math.PI/-2)+(Math.PI/180*-ang),true);
   ctx.arc(100,100,10,(Math.PI/-2)+(Math.PI/180*-ang),(Math.PI/-2),true);*/
   ctx.closePath();
   ctx.fill();
   //ciculo medio
   ctx.beginPath();
   ctx.fillStyle = rell;
   ctx.arc(250,250,65,0,Math.PI/180*360);
   ctx.closePath();
   ctx.fill();
   //circulo interno
   ctx.beginPath();
   ctx.strokeStyle = txt;
   ctx.lineWidth = 5;
   ctx.arc(250,250,60,0,Math.PI/180*360);
   ctx.closePath();
   ctx.stroke();
   //texto porcentaje
   ctx.fillStyle = txt;
   ctx.font = '40px Open Sans';
   ctx.textAlign = 'center';
   ctx.textBaseline = 'middle';
   ctx.fillText(porc+'%',250, 250);
}