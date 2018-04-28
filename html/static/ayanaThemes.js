document.addEventListener("DOMContentLoaded", function(event) {
  
    var ayana = AyanaBot();
     ayana.canvas.height = window.innerHeight *1.1;
     ayana.canvas.width = window.innerWidth / 4;
  
   
    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  
    function minigame(){
        canvas = document.getElementById('ayanaCanvas');
        var context = canvas.getContext('2d');
        //canvas.width = window.innerWidth / 4;
        //canvas.height = window.innerHeight * 1.1;
        var canvasLeft = 0;
        var canvasTop = 0;
        var canvasBottom = canvasTop + canvas.height;
        var canvasRight = canvasLeft + canvas.width;
        var block = canvasBottom / 3;
        var greenHeight = canvasBottom - (block * (1 + 1/3))
        var blueHeight = canvasBottom - block;
        var redHeight  = canvasBottom - (block * (2/3));
        var basicHeight = canvasBottom - (block * (1/3));
        var basicColor = '#2D2D2A', basicClass = "themesBasic";
        var blueColor = '#2176FF', blueClass = "themesBlue";
        var redColor = '#F79824', redClass = "themesRed";
        var greenColor = '#ABC798', greenClass = "themesGreen";
       
  
        for (var i = 0; i < 4; i++){
            var height = 0, color = "black";
            if(i === 0) {height = basicHeight; color = basicColor;}
            if(i === 1) {height = blueHeight; color = blueColor;}
            if(i === 2) {height = redHeight; color = redColor;}
            if(i === 3) {height = greenHeight; color = greenColor;}
            context.beginPath(); context.moveTo(canvasLeft, height);
            context.lineTo(canvasRight, height); context.lineWidth = 2;
            context.strokeStyle = color; context.stroke();
        }
  
        var standing = (this.currentPose === "standdown" || this.currentPose === "standup"
                     || this.currentPose === "standright" || this.currentPose === "standleft"); 
        var ids = ["body","header","main","footer","article","aside"];      
        var tempChoice = basicClass, save = false;
  
        if(this.botY > greenHeight && standing) {tempChoice = greenClass; save = true;}
        if(this.botY > blueHeight && standing)  {tempChoice = blueClass; save = true;}
        if(this.botY > redHeight && standing)   {tempChoice = redClass; save =  true}
        if(this.botY > basicHeight && standing) {tempChoice = basicClass; save = true;}
  
        if(save){
          document.cookie = tempChoice;
          for(var i = 0; i < ids.length; i++){
             var element = document.getElementById(ids[i]);
             element.className = tempChoice + " works_on_smartphone";
           } 
           return;
        }
  
    }
  
  
    ayana.minigame = minigame;
    ayana.init();
  
  
  });
  