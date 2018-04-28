document.addEventListener("DOMContentLoaded", function(event) {
  Bot = function(){
  
    var bot = {
       name:"",
       canvas:{},
       imgUrl:{},
       spriteWidth:0,
       spriteHeight:0,
       standup:{x:0,y:0},
       walkup1:{x:0,y:0},
       walkup2:{x:0,y:0},
       standdown:{x:0,y:0},
       walkdown1:{x:0,y:0},
       walkdown2:{x:0,y:0},
       standleft:{x:0,y:0},
       walkleft1:{x:0,y:0},
       walkleft2:{x:0,y:0},
       standright:{x:0,y:0},
       walkright1:{x:0,y:0},
       walkright2:{x:0,y:0},
       special1:{x:0,y:0},
       special2:{x:0,y:0},
       speed: 100,
       step: 5,
       botX: 0, //add to canvasX = this.canvas.getBoundingClientRect()
       botY: 0,
       pageX: 0, // last mouse click - window.scrollX
       pageY: 0,
       initFocusX: 10,
       initFocusY: 10,
       sprite: {},
       currentPose: "standdown",
       currentPoseXY: {x:0, y:0},
       siblings: [],
       minigame: function(){},
       think: function(){
     var me = {};
           var canvasX = this.canvas.getBoundingClientRect().left;
           var canvasY = this.canvas.getBoundingClientRect().top;
     me.x = canvasX + this.botX; 
     me.y = canvasY + this.botY;
           me.forwardRange = this.botX + this.spriteWidth + this.step;
           me.downwardRange = this.botY + this.spriteHeight + this.step;
           me.upwardRange = this.botY - this.step;
           me.backwardRange = this.botX - this.step; 
  
    if(this.pageX > me.x + this.step)
               if(!(me.forwardRange >= this.canvas.width))
                 return "right";
          
          if(this.pageX < me.x - this.step)
               if(!(me.backwardRange <= 0)) 
                 return "left";
  
          if(this.pageY > me.y + this.step)
               if(!(me.downwardRange >= this.canvas.height))
                 return "down";
      
          if(this.pageY < me.y - this.step)
               if(!(me.upwardRange <= 0))
                 return "up";
  
          return "stand";
       },
       changePose: function(direction){
     if(direction === "right") 
         if(this.currentPose === "walkright1"){
                   this.currentPose = "walkright2";
                          this.currentPoseXY = this.walkright2;
       } else {this.currentPose = "walkright1"; this.currentPoseXY = this.walkright1;}
     if(direction === "left") 
         if(this.currentPose === "walkleft1"){
                   this.currentPose = "walkleft2";
                          this.currentPoseXY = this.walkleft2;
       } else {this.currentPose = "walkleft1"; this.currentPoseXY = this.walkleft1;}
     if(direction === "up") 
         if(this.currentPose === "walkup1"){
                   this.currentPose = "walkup2";
                          this.currentPoseXY = this.walkup2;
       } else {this.currentPose = "walkup1"; this.currentPoseXY = this.walkup1;}
     if(direction === "down") 
         if(this.currentPose === "walkdown1"){
                   this.currentPose = "walkdown2";
                          this.currentPoseXY = this.walkdown2;
       } else {this.currentPose = "walkdown1"; this.currentPoseXY = this.walkdown1;}
     if(direction === "stand"){ 
         var c = this.currentPose
         if(c === "walkright1" || c === "walkright2"){
                   this.currentPose = "standright";
                          this.currentPoseXY = this.standright;
       } 
         if(c === "walkleft1" || c === "walkleft2"){
                   this.currentPose = "standleft";
                          this.currentPoseXY = this.standleft;
       } 
         if(c === "walkup1" || c === "walkup2"){
                   this.currentPose = "standup";
                          this.currentPoseXY = this.standup;
       } 
         if(c === "walkdown1" || c === "walkdown2"){
                   this.currentPose = "standdown";
                          this.currentPoseXY = this.standdown;
       } 
         }
       },
       changeLocation: function(direction){
     if(direction === "right")this.botX += this.step;
     if(direction === "left")this.botX -= this.step;
     if(direction === "up")this.botY -= this.step;
     if(direction === "down")this.botY += this.step;
     if(this.botY < 0) this.botY = 0; if(this.botX < 0) this.botX = 0;
           if(this.botY + this.spriteHeight > this.canvas.height) this.botY = this.canvas.height - this.spriteHeight;
           if(this.botX + this.spriteWidth > this.canvas.width) this.botX = this.canvas.width - this.spriteWidth;
       },
       move: function(direction){
     this.changePose.call(this,direction); this.changeLocation.call(this,direction);
       },
       draw: function(){
  
         var context = this.canvas.getContext('2d');
               context.clearRect(0,0,this.canvas.width,this.canvas.height);
               context.drawImage(this.sprite, this.currentPoseXY.x, this.currentPoseXY.y,
               this.spriteWidth, this.spriteHeight, this.botX, self.botY,
               this.spriteWidth, this.spriteHeight);
  
       },
       live: function(){
            self = this;
           setInterval(function(){
           var choice = self.think();
               self.move(choice);
               self.draw();
         self.minigame(); 
     },self.speed);
       },
       onClick: function(e){
         this.pageX = e.pageX - window.scrollX;
         this.pageY = e.pageY - window.scrollY;
       },
       init: function(){ 
     /// draws function, starts loop, starts listening for mouse clicks
    this.sprite = new Image();
          this.sprite.src = this.imgUrl;
          var clicked = this.onClick.bind(this);
          this.canvas.addEventListener("mousedown", clicked, false);
          this.pageX = this.canvas.getBoundingClientRect().left + this.initFocusX; 
    this.pageY = this.canvas.getBoundingClientRect().top + this.initFocusY + 10;
          this.live.call(this);
       }
    
  
    };
  
      function create(parent){
         var robot = function(){};
         robot.prototype = parent;
         return new robot()
      }
  
    return create(bot);
  } // end of Bot() class
  }); // end up wrapper function
  