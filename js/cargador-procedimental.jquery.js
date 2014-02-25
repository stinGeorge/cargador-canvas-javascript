;(function($, window, undefined){
   //Usamos javascript estricto para tener buenas practicas al codear ;D
   'use strict';
   //Definimos la funciónel del plguin para que reciba parámetros de personalización básica
   $.fn.cargador = function(ini, porc, bord, rell, txt, url, time){
      //Iniciamos un loop para que se aplique a todo el array de objetos jQuery
      return this.each(function(){
         //Seleccionamos el objeto al cual se aplico el método
         var $lienzo = $(this),
         lienzo = $lienzo[0];
         //Revisamos si el navegador soporta canvas para no dibujar innecesariamente
         if(lienzo.getContext){
            //Obtenemos el contexto del elemento seleccionado
            var ctx = lienzo.getContext('2d'),
            //Definimos las variables necesarias para la función
            alto = lienzo.height,
            ancho = lienzo.width,
            animacion = false,
            //Creamos una imágen con tamaño fijo y url dinámcia
            img = new Image(100, 100);
            img.src = url;
            //Esperamos que el navegador cargue la imagen para renderizarla correctamente en el lienzo
            img.onload = function(){
               //Ubicacion de la imagen
               ctx.drawImage(img, ancho/2 - 50, 170);
               //Definimos el evento y el elemento que lo va a activar
               $('a').on('click',function(e){
                  e.preventDefault();
                  //Evitamos que se ejecuten varios eventos al mismo tiempo, sino que espere a que termine uno para iniciar otro
                  if(!animacion){
                     animacion = true;
                     carga(ini, porc);
                  }
               });
            }
         }
         //Función que se encarga de simular el dibujo del circulo frame por frame
         function carga(ini, porc){
            var ciclo = setInterval(function(){
               if(ini <= porc){
                  dib_cir(ini);
                  ini++;
               }else{
                  //Detenemos el bucle para poder iniciar otra animación
                  clearInterval(ciclo);
                  animacion = false;
               }
            },time/porc);
         }
         //Función que dibuja directamente sobre el lienzo con todas sus propiedades
         function dib_cir(porc){
            //Limpiamos el lienzo para renderizar el sgt. frame
            ctx.clearRect(0, 0, ancho, alto);
            ctx.drawImage(img, ancho/2 - 50, 170);
            //Obtenemos el angulo preciso para el frame
            var ang = (360*porc)/100;
            //ciculo externo
            ctx.beginPath();
            ctx.fillStyle = bord;
            //Carga de derecha a izquierda
            ctx.arc(ancho/2,80,75,(Math.PI/-2),(Math.PI/180*ang)-(Math.PI/2));
            ctx.arc(ancho/2,80,10,(Math.PI/180*ang)-(Math.PI/2),(Math.PI/-2));
            //Carga de izquierda a derecha
            /*ctx.arc(100,80,75,(Math.PI/-2),(Math.PI/-2)+(Math.PI/180*-ang),true);
            ctx.arc(100,80,10,(Math.PI/-2)+(Math.PI/180*-ang),(Math.PI/-2),true);*/
            ctx.closePath();
            ctx.fill();
            //ciculo medio
            ctx.beginPath();
            ctx.fillStyle = rell;
            ctx.arc(ancho/2,80,65,0,Math.PI/180*360);
            ctx.closePath();
            ctx.fill();
            //circulo interno
            ctx.beginPath();
            ctx.strokeStyle = txt;
            ctx.lineWidth = 5;
            ctx.arc(ancho/2,80,60,0,Math.PI/180*360);
            ctx.closePath();
            ctx.stroke();
            //texto del porcentaje
            ctx.fillStyle = txt;
            ctx.font = '40px Open Sans';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(porc+'%',ancho/2, 80);
         }
      });
   }

})(jQuery, window);