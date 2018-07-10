document.addEventListener("DOMContentLoaded", function(event) {
  
      var badsis = AyanaV2();
      badsis.think = fastMode;
      badsis.playMode = playMode;
      badsis.initFocusX = 0; 
      badsis.initFocusY = badsis.botY;
      badsis.init = sisInit;
      badsis.live = sisLive;
      badsis.botX = 5;
      badsis.botY = 10;
      badsis.defaultModeChange = badsis.modeChange;
 
 
      badsis.init();
 
      var ayana = AyanaV2();
      ayana.draw = function(){};
      ayana.botX = 0;
      ayana.init();     
 
      var goodsis = AyanaV2();
      goodsis.init = sisInit; goodsis.live = sisLive;
      goodsis.botX = 0; 
      goodsis.botY = goodsis.canvas.height - goodsis.spriteHeight - 3;
      goodsis.think = watchMode;
      goodsis.changeMode = function(){this.mode="walk";} 
      goodsis.init();
 
     badsis.siblings.push(goodsis); badsis.siblings.push(ayana);
     ayana.siblings.push(goodsis); ayana.siblings.push(badsis);
     goodsis.siblings.push(badsis); goodsis.siblings.push(ayana);     
 
    /// particular sister psychologies ///
 
    function playMode(){
      this.changeMode = function() {
              this.mode="run"; this.speed = this.runspeed; this.step = 10;
              var dx = this.pageX > this.botX ? this.pageX - this.botX : this.botX - this.pageX;
              var dy = this.pageX < this.botY ? this.botY - this.pageY : this.pageY - this.botY;
              if(dx < this.comfortZone * 1.5 && dx > dy) 
                {this.mode = "walk";this.speed = this.walkspeed;this.step = 5;} 
              if(dy < this.comfortZone * 1.5 && dy > dx) 
                {this.mode = "walk";this.speed = this.walkspeed;this.step = 5;}
      }
 
      var sibX = this.siblings[1].botX;
      var sibY = this.siblings[1].botY;
      var dir = this.siblings[1].direction;
      if(dir === "up"){this.pageX = sibX; this.pageY = sibY;}
      if(dir === "down"){this.pageX = sibX; this.pageY = sibY;}
      if(dir === "right"){this.pageX = sibX; this.pageY = sibY;}
      if(dir === "left"){this.pageX = sibX; this.pageY = sibY;}
 
      var dX = this.pageX > this.botX ? this.pageX - this.botX : this.botX - this.pageX;
      var dY = this.pageY > this.botY ? this.pageY - this.botY : this.botY - this.pageY;
     
      if(this.pageX > this.botX + this.comfortZone && dX > dY) return "right";
      if(this.pageX < this.botX - this.comfortZone && dX > dY) return "left";
      if(this.pageY > this.botY + this.comfortZone && dX <= dY) return "down";
      if(this.pageY < this.botY - this.comfortZone && dX <= dY) return "up";
      return "stand";
 
    }
 
    function fastMode(){
      if(this.siblings[1].botX < this.canvas.width / 2) return "right";
      else this.think = this.playMode;
      return "stand";
 
    }
 
    function watchMode(){
      this.pageX = this.siblings[1].botX;
      this.pageY = this.siblings[1].botY;
      var range = this.spriteHeight * 3,      r2 = range * range;
      var distanceX = this.pageX - this.botX, d2X = distanceX * distanceX; 
      var distanceY = this.pageY - this.botY, d2Y = distanceY * distanceY;
      var moveHorizontal = (d2X > d2Y) ? true : false;
      var movement = moveHorizontal ? distanceX : distanceY, m2 = movement * movement; 
      if(m2 > r2)
        if(moveHorizontal)
           if(distanceX > 0) return "right";
           else return "left"
        else
           if(distanceY > 0) return "down";
           else return "up";   
 
      return "stand";
    }
 
    /// generic sister functions ///
 
     function collisionResolution(direction){
        var rRange = this.botX + this.comfortZone;
        var lRange = this.botX - this.comfortZone;
        var uRange = this.botY - this.comfortZone;
        var dRange = this.botY + this.comfortZone;
        
        for(var f = 0; f < this.siblings.length; f++){
          var sis = this.siblings[i];
          if(direction === "left" && sis.botX < this.botX && sis.botX > lRange)
             if((uRange < sis.botY || dRange > sis.botY))
               if(sis.botY < this.botY) return "down";
               else return "up";
 
          if(direction === "right" && sis.botX > this.botX && sis.botX < rRange)
             if((uRange < sis.botY || dRange > sis.botY))
               if(sis.botY < this.botY) return "down";
               else return "up";
 
          if(direction === "up" && sis.botY < this.botY && sis.botY > uRange)
            if(lRange < sis.botX || rRange > sis.botX) 
              if(sis.botX > this.botX) return "left";
              else return "right";
 
          if(direction === "down" && sis.botY > this.botY && sis.botY < dRange)
            if(lRange < sis.botX || rRange > sis.botX)
              if(sis.botX > this.botX) return "left";
              else return "right";
          }
       return direction;
     }
 
     function wallCollision(direction){
        if(direction === "right") if(this.botX + this.comfortZone > this.canvas.width) return "stand";
        if(direction === "left") if(this.botX - this.comfortZone < 0) return "stand";
        if(direction === "up") if(this.botY - this.comfortZone < 0) return "stand";
        if(direction === "down") if(this.botY + this.comfortZone > this.canvas.height) return "stand";
        return direction;
     }
 
 
     function sisInit(){
        
   this.sprite = new Image();
         this.sprite.src = this.imgUrl;
         this.pageX = this.canvas.getBoundingClientRect().left + this.initFocusX; 
   this.pageY = this.canvas.getBoundingClientRect().top + this.initFocusY + 10;
         this.live.call(this);
 
     }
 
     function sisLive(){
 
          var self = this;
          setInterval(function(){
          var choice = self.think();
              self.move(choice);
    },self.speed);
 
     }
 
 
      //// drawing the sisters //// 
      var childArray = [ayana];
      var loc = 1;
      var print_area = document.getElementById("location");
      var ret_loc = document.getElementById("return_location")
      setInterval(function(){
	var a = ayana.canvas.width;
	var botX = ayana.botX;
	if (botX <= (1/12) * a) loc = 1;
	else if (botX <= (2/12) * a) loc = 2;
	else if (botX <= (3/12) * a) loc = 3;
	else if (botX <= (4/12) * a) loc = 4;
	else if (botX <= (5/12) * a) loc = 5;
	else if (botX <= (6/12) * a) loc = 6;
	else if (botX <= (7/12) * a) loc = 7;
	else if (botX <= (8/12) * a) loc = 8;
	else if (botX <= (9/12) * a) loc = 9;
	else if (botX <= (10/12) * a) loc = 10;
	else if (botX <= (11/12) * a) loc = 11;
	else
		loc = 12;
	ret_loc.value = loc
	print_area.innerHTML = loc;
	var streetfiles = document.getElementsByClassName("streetfile");
	for (var i = streetfiles.length - 1; i>= 0; i--)
		if(streetfiles[i].getAttribute("data-location") != loc)
			streetfiles[i].style.display = "none"
		else
			streetfiles[i].style.display = "block"
    var context = badsis.canvas.getContext('2d');
    context.clearRect(0,0,badsis.canvas.width,badsis.canvas.height);
          for(var i=0; i<childArray.length; i++){
        var sib = childArray[i];
              context.drawImage(sib.sprite, sib.currentPoseXY.x, sib.currentPoseXY.y,
                 sib.spriteWidth, sib.spriteHeight, sib.botX, sib.botY,
              sib.spriteWidth, sib.spriteHeight);
          }
      },100);
     
 
     
 });
