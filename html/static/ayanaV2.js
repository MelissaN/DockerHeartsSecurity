document.addEventListener("DOMContentLoaded", function(event) {
  
  AyanaV2 = function(){
    var ayana = AyanaBot();
    ayana.frame = 0;
    ayana.speed = 100;
    ayana.botX = window.innerWidth;
    ayana.botY = ayana.canvas.height /2;
    ayana.initFocusX = 0;
    ayana.initFocusY = ayana.botY;
    ayana.comfortZone = ayana.spriteHeight;
  
  
    ayana.walkspeed = 100;
    ayana.walkright = [[78,104],[101,104]];
    ayana.walkleft = [[77,72],[100,72]];
    ayana.walkup = [[76,7],[99,7]];
    ayana.walkdown = [[77,39],[100,39]];
  
    ayana.runspeed = 50;
    ayana.runright = [[151,91],[175,91]];
    ayana.runleft = [[150,63],[173,63]];
    ayana.runup = [[146,5],[167,5]];
    ayana.rundown = [[147,36],[169,36]];
   
    ayana.bikespeed = 20;
    ayana.bikeright = [[201,39],[201,39],[201,39]];
    ayana.bikeleft  = [[202,6],[202,6],[202,6]];
    ayana.bikeup    = [[287,6],[287,6],[287,6]];
    ayana.bikedown  = [[288,44],[288,44],[288,44]];
   
    ayana.mode = "walk";
    ayana.direction = "down";
    ayana.modes = [[ayana.walkright,ayana.walkleft,ayana.walkup,ayana.walkdown],
                   [ayana.runright,ayana.runleft,ayana.runup,ayana.rundown],
                   [ayana.bikeright,ayana.bikeleft,ayana.bikeup,ayana.bikedown]];
    ayana.defaultSpriteWidth = ayana.spriteWidth;
    ayana.defaultSpriteHeight = ayana.spriteHeight;  
  
    ayana.newChangePose = function(direction){
  
      var oldDirection = this.direction;
      var directions = ["right","left","up","down"];
      var dw = this.defaultSpriteWidth, dh = this.defaultSpriteHeight; 
  
      var runWidths =  [dw,dw,dw-1,dw], runHeights = [dh-4, dh-4, dh, dh-5];
      var walkWidths = [dw,dw,dw,dw],  walkHeights = [dh,dh,dh,dh];
      var bikeWidths = [dw,dw,dw,dw],  bikeHeights = [dh,dh,dh,dh];
  
      var widths =  [walkWidths, runWidths, bikeWidths];
      var heights = [walkHeights, runHeights, bikeHeights];
  
      var mode = 0; 
      var frame = this.frame++ % 2;
  
      if(this.mode === "run")   mode = 1;
      if(this.mode === "bike") {mode = 2; frame = this.frame % 3;}
  
      var width = widths[mode], height = heights[mode];
  
  
      for(var i=0; i<4; i++){
         if(directions[i] === direction){
           this.spriteWidth = width[i]; this.spriteHeight = height[i];
           this.direction = directions[i]; pose = i;
           this.currentPoseXY = {x:this.modes[mode][i][frame][0], 
                                 y:this.modes[mode][i][frame][1]};
         }
      }
  
     if(direction === "stand"){
        this.spriteWidth = widths[0][0]; this.spriteHeight = heights[0][0];
        if(oldDirection === "right") this.currentPoseXY = this.standright;
        if(oldDirection === "left") this.currentPoseXY = this.standleft;
        if(oldDirection === "up") this.currentPoseXY = this.standup;
        if(oldDirection === "down") this.currentPoseXY = this.standdown;
     }
  
    };
  
    ayana.changeMode = function(){
      var me = {};
      me.x = this.botX + this.canvas.getBoundingClientRect().left;
      me.y = this.botY + this.canvas.getBoundingClientRect().top;
      
      var distanceX = this.pageX > me.x ? this.pageX - me.x : me.x - this.pageX; 
      var distanceY = this.pageY > me.y ? this.pageY - me.y : me.y - this.pageY;
      var widescreen = window.innerWidth > 1.2 * window.innerHeight;
      var walkTrigger = widescreen ? 50 : 20;
      var runTrigger = widescreen ? 200 : 75;
  
      var walk = (distanceX < walkTrigger && distanceY < walkTrigger);
      var run = (distanceX < runTrigger && distanceY < runTrigger && !walk);
      var bike = (!walk && !run);
  
  
      if(walk){this.mode = "walk"; this.speed = this.walkspeed; this.step = 5;}
      if(run){this.mode = "run";  this.speed = this.runspeed;   this.step = 10;}
      if(bike){this.mode = "bike"; this.speed = this.bikespeed; this.step = 15;}
    }
  
    ayana.move = function(direction){
           this.changeMode.call(this);
     this.newChangePose.call(this,direction); 
           this.changeLocation.call(this,direction);
       };
    // new change pose methods - think() stays the same
   //ayana.init();
  function create(parent){
         var robot = function(){};
         robot.prototype = parent;
         return new robot()
    }
   return create(ayana);
  }
  
  });
  
