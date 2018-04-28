document.addEventListener("DOMContentLoaded", function(event) {
  
      var article = document.getElementById("article");
      //article.style.height = window.innerHeight /2;
      var canvas_blurb = document.getElementById("canvas_blurb");
      var canvas = document.getElementById("ayanaCanvas");
     // var themeH1 = document.getElementById("theme");
      //themeH1.style.top = "0";
      canvas.height = window.innerHeight * 1.6; 
      setup();
      window.addEventListener("resize", readjust, false);
      window.addEventListener("orientationchange", readjust, false);
  
      function setup(){
         canvas.width = window.innerWidth / 4;
         //canvas.height = window.innerHeight * 1.2;
         //canvas.style.position = "absolute";
         canvas.style.left = "0";
         var widescreen = window.innerWidth > window.innerHeight * 1.5; 
         var buffer = widescreen ? 1.2 : 2;   
  
         //canvas_blurb.style.border = "solid 1px";
         canvas_blurb.style.position = "absolute";
         canvas_blurb.style.left = (canvas.width + canvas.width/4)+"px";
         canvas_blurb.style.top = "0";
         canvas_blurb.style.width = (canvas.width*buffer)+"px";
         canvas_blurb.style.height = canvas.height+"px";
         canvas_blurb.style["word-wrap"] = "normal";
      }
  
      function readjust(){
         setup();
      }
  
  
  
  
  
  
  });