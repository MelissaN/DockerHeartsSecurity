document.addEventListener("DOMContentLoaded", function(event) {
  
  //// Good Simple Sprite Sheet Tutorial ////
   /// https://www.simplifiedcoding.net/javascript-sprite-animation-tutorial-html5-canvas/
  
  // constants 
  
   var SPRITEWIDTH = 23;  var SPRITEHEIGHT = 32;
   var STANDUPX    = 53;  var STANDUPY     = 7;
   var WALKUP1X    = 76;  var WALKUP1Y     = 7;
   var WALKUP2X    = 99;  var WALKUP2Y     = 7;
  
   var STANDDOWNX = 54;   var STANDDOWNY = 39;
   var WALKDOWN1X = 77;   var WALKDOWN1Y = 39
   var WALKDOWN2X = 100;  var WALKDOWN2Y = 39
  
   var STANDLEFTX = 54;   var STANDLEFTY = 72;
   var WALKLEFT1X = 77;   var WALKLEFT1Y = 72;
   var WALKLEFT2X = 100;  var WALKLEFT2Y = 72;
  
   var STANDRIGHTX = 54;  var STANDRIGHTY = 104;
   var WALKRIGHT1X = 78;  var WALKRIGHT1Y = 104;
   var WALKRIGHT2X = 101; var WALKRIGHT2Y = 104; 
  
   var STEP = 5;
  
   var DEMO      = document.getElementById("listener_demo");
   var parent = DEMO.parentElement;
   var CONTEXT   = DEMO.getContext("2d");
   var SPRITE    = new Image();
   SPRITE.src    = /*"https://i.imgur.com/3cmrbVZ.png";*/"https://i.imgur.com/F5EnIoa.png";
   DEMO.addEventListener("mousedown",onClick, false);
   DEMO.width = window.innerWidth/2;
   DEMO.height = DEMO.width / 2;
   window.addEventListener("resize", resizeDemo, false);
   window.addEventListener("orientationchange", resizeDemo, false);
  
  
  
  //variables
  
   var mouseX       = DEMO.getBoundingClientRect().left;
   var mouseY       = DEMO.getBoundingClientRect().top;
   var trainerX     = 0;
   var trainerY     = 0;
   var currentPoseX = STANDDOWNX; 
   var currentPoseY = STANDDOWNY;
  
  
  // functions
  
   function onClick(e){
      mouseX = e.pageX - window.scrollX;
      mouseY = e.pageY - window.scrollY;
   }
  
   function resizeDemo(){
     DEMO.width = window.innerWidth / 2;
   }
  
   function changePose(direction){
     if(direction === "left"){ 
        if(currentPoseX === WALKLEFT1X){currentPoseX = WALKLEFT2X; currentPoseY = WALKLEFT2Y;}
        else                           {currentPoseX = WALKLEFT1X; currentPoseY = WALKLEFT1Y;}
        return;
     }
    
     if(direction === "right"){ 
        if(currentPoseX === WALKRIGHT1X){currentPoseX = WALKRIGHT2X; currentPoseY = WALKRIGHT2Y;}
        else                            {currentPoseX = WALKRIGHT1X; currentPoseY = WALKRIGHT1Y;}
        return;
     }
  
     if(direction === "up"){ 
        if(currentPoseX === WALKUP1X){currentPoseX = WALKUP2X; currentPoseY = WALKUP2Y;}
        else                         {currentPoseX = WALKUP1X; currentPoseY = WALKUP1Y;}
        return;
     }
  
     if(direction === "down"){ 
        if(currentPoseX === WALKDOWN1X){currentPoseX = WALKDOWN2X; currentPoseY = WALKDOWN2Y;}
        else                           {currentPoseX = WALKDOWN1X; currentPoseY = WALKDOWN1Y;}
        return;
     }
  
     if(direction === "stand"){ 
        if(currentPoseY === WALKLEFT1Y) {currentPoseX = STANDLEFTX;  currentPoseY = STANDLEFTY;}
        if(currentPoseY === WALKRIGHT1Y){currentPoseX = STANDRIGHTX; currentPoseY = STANDRIGHTY;}
        if(currentPoseY === WALKUP1Y)   {currentPoseX = STANDUPX;    currentPoseY = STANDUPY;}
        if(currentPoseY === WALKDOWN1Y) {currentPoseX = STANDDOWNX;  currentPoseY = STANDDOWNY;}
        return;
     }
  
   }
  
   function changeLocation(direction){
     if(direction === "left")   {trainerX -= STEP;}
     if(direction === "right")  {trainerX += STEP;}
     if(direction === "up")     {trainerY -= STEP;}
     if(direction === "down")   {trainerY += STEP;}
     if(trainerX < 0)           {trainerX = 0;}
     if(trainerY < 0)           {trainerY = 0;}
     if(trainerX > DEMO.width)  {trainerX = DEMO.width;}
     if(trainerY > DEMO.height) {trainerY = DEMO.height;}
   }
  
   function move(direction){
    changePose(direction);
    changeLocation(direction);
   }
  
   function draw(){
      CONTEXT.clearRect(0,0,DEMO.width,DEMO.height);
      CONTEXT.drawImage(SPRITE, currentPoseX,currentPoseY,SPRITEWIDTH,SPRITEHEIGHT,trainerX,trainerY,SPRITEWIDTH,SPRITEHEIGHT); 
   }
  
  
  // Game Play
   function findMouse(){
     var choice = "stand";
     var canvasX = DEMO.getBoundingClientRect().left;
     var canvasY = DEMO.getBoundingClientRect().top;
     var meX = canvasX + trainerX;
     var meY = canvasY + trainerY;
     var forwardRange = meX + SPRITEWIDTH + STEP;
     var downwardRange = meY + SPRITEHEIGHT + STEP;
     var backwardRange = meX - STEP;
     var upwardRange = meY - STEP;
  
     if(mouseX > forwardRange && forwardRange < canvasX + DEMO.width)  {choice = "right"; return choice;}
     if(mouseX < backwardRange && backwardRange > canvasX ) {choice = "left"; return choice;}
     if(mouseY > downwardRange && downwardRange < canvasY + DEMO.height) {choice = "down"; return choice;}
     if(mouseY < upwardRange && upwardRange > canvasY)   {choice = "up"; return choice;}
     
     return choice;
   }
      
  
  setInterval(function(){
     var choice = findMouse()
     move(choice);
     draw();
  }, 100);
  
  
  });