document.addEventListener("DOMContentLoaded", function(event) {
  
   AyanaBot = function(){
        var heart = Bot();
        heart.canvas = document.getElementById("ayanaCanvas");
        heart.imgUrl = "https://i.imgur.com/F5EnIoa.png";
        heart.spriteWidth = 23;
        heart.spriteHeight = 32;
        heart.standup = {x:53,y:7};
        heart.walkup1 = {x:76,y:7};
        heart.walkup2 = {x:99,y:7};
        heart.standdown = {x:54,y:39};
        heart.walkdown1 = {x:77,y:39};
        heart.walkdown2 = {x:100,y:39};
        heart.standleft = {x:54,y:72};
        heart.walkleft1 = {x:77,y:72};
        heart.walkleft2 = {x:100,y:72};
        heart.standright = {x:54,y:104};
        heart.walkright1 = {x:78,y:104};
        heart.walkright2 = {x:101,y:104};
        heart.special1 = {x:0,y:0};
        heart.special2 = {x:0,y:0};
        heart.botX = 10;
        heart.botY = 10;
  
        function create(parent){
         var robot = function(){};
         robot.prototype = parent;
         return new robot()
    }
  
        return create(heart);
    }
  
  
  });
  