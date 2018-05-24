document.addEventListener("DOMContentLoaded", function(event) {
  
      var article = document.getElementById("article");
      var container = document.getElementById("canvas_container");
      var canvas = document.getElementById("ayanaCanvas");
      var blurb = document.getElementById("canvasBlurb");
      blurb.style.position = "absolute";
      blurb.style.top = canvas.height;
      //blurb.style.border = "1px solid";
      
      blurb.width = 0;
      blurb.height = canvas.height * (2/3);
      //blurb.style.width = canvas.width + "px"; // prolly gonna set blurb in setup
      blurb.style.height = blurb.height+"px";
     
      var lastwords = ["We want to be software engineers,",
                       "not just for ourselves,",
           "but also to change everyone's lives on Earth.",
                       "So we must be intuitive about how we'll spend", 
                       "the thousands of remaining days we have left."];
  
      var clockwork = ["Software design is like clockwork.",
                      "In the sense that clockwork and software both require tinkering on a mechanical level.", 
                      "With the use of Javascript, every html element becomes programmable.",
                      "For example, the width of this canvas is contingent on the width of your viewport.",
                      "In conclusion, we can build anything."];
  
      var pWidth = 400; 
      var pHeight = blurb.height; // may make more narrow
  
      setup();
  
  
  function setup(){
    var multiplier = window.innerWidth > 1.3*window.innerHeight ? 2 : 1;
    var tempoSpace = pWidth * multiplier; //smaller window.innerWidth smaller tempoSpace
    var pElements = [];
    for(var i=0; i<clockwork.length; i++){
       var pElement = document.createElement("p");
       pElement.style.position = "absolute";
       pElement.style.width = pWidth+"px";
       pElement.style.height = pHeight+"px";
       pElement.style.left = i*(pWidth+tempoSpace)+"px"; 
       //pElement.style.border = "1px solid";
       blurb.width += pWidth + tempoSpace; blurb.style.width = blurb.width+"px";
       pElement.appendChild(document.createTextNode(clockwork[i]));
       blurb.appendChild(pElement);
       pElements.push(pElement);
    }
    canvas.width = blurb.width;
  
  }
  
  
  
    // inside setup
  // create p elements; create textnodes; 
  // appendChild p elements to blurb; appendChild textnodes
  // p.style.left = eventPoints[i];
  
  
    // inside interval
    // for(int i=0; i<eventPoints.length; i++)
  // if(window.scrollX < eventPoints[i] - range*2)p[i].style.display = "none";
  // if(window.scrollX < eventPoints[i] - range)  p[i].style.color = "lightgray";
  // if(window.scrollX > eventPoints[i] + range)  p[i].style.color = "lightgray";
  // if(window.scrollX > eventPoints[i] + range*2)p[i].style.display = "none";
  
  });
  
