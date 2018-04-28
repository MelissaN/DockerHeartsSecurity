document.addEventListener("DOMContentLoaded", function(event) {
  
    var imgInterface = document.getElementById("interface");
    var img1 = document.getElementById("img1");
    var img2 = document.getElementById("img2");
    var img3 = document.getElementById("img3");
    var images = [img1, img2, img3];
    var pointer = 0;
  
    imgInterface.addEventListener("click",loopPics,false);
  
    function loopPics(){
      pointer = ++pointer % 3;
      for(var i=0; i<3; i++)
        if(i === pointer)images[i].className = "imgshow";
        else images[i].className = "imghide";
  
  
    }
  
  
  
  
  
  });