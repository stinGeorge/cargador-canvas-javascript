;(function($, window, undefined){

   $.fn.cargador = function(ini, porc, bord, rell, txt, time){
      var enProceso = 0;
      var $canvas = $(this);
      return this.each(function(){
         var $lienzo = $(this),
         lienzo = $lienzo[0];
         if(lienzo.getContext){
            var ctx = lienzo.getContext('2d'),
            alto = lienzo.height,
            ancho = lienzo.width;
            $('a').on('click',function(e){
               e.preventDefault();
               enProceso++;
               if(enProceso <= $canvas.length){
                  carga(ini, porc);
               }
               console.log(enProceso);
            });
         }
         enProceso = 0;//falta actualizar este valor
         function carga(ini, porc){
            setInterval(function(){
               if(ini <= porc){
                  dib_cir(ini);
                  ini++;
               }else{
                  return false;
               }
            },time);
         }
         function dib_cir(porc){
            ctx.clearRect(0, 0, ancho, alto);
            var ang = (360*porc)/100;
            //ciculo externo
            ctx.beginPath();
            ctx.fillStyle = bord;
            //derecha a izquierda
            ctx.arc(ancho/2,alto/2,75,(Math.PI/-2),(Math.PI/180*ang)-(Math.PI/2));
            ctx.arc(ancho/2,alto/2,10,(Math.PI/180*ang)-(Math.PI/2),(Math.PI/-2));
            //izquierda a derecha
            /*ctx.arc(100,100,75,(Math.PI/-2),(Math.PI/-2)+(Math.PI/180*-ang),true);
            ctx.arc(100,100,10,(Math.PI/-2)+(Math.PI/180*-ang),(Math.PI/-2),true);*/
            ctx.closePath();
            ctx.fill();
            //ciculo medio
            ctx.beginPath();
            ctx.fillStyle = rell;
            ctx.arc(ancho/2,alto/2,65,0,Math.PI/180*360);
            ctx.closePath();
            ctx.fill();
            //circulo interno
            ctx.beginPath();
            ctx.strokeStyle = txt;
            ctx.lineWidth = 5;
            ctx.arc(ancho/2,alto/2,60,0,Math.PI/180*360);
            ctx.closePath();
            ctx.stroke();
            //texto porcentaje
            ctx.fillStyle = txt;
            ctx.font = '40px Open Sans';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(porc+'%',ancho/2, alto/2);
         }
      });
   }

})(jQuery, window);