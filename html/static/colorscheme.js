document.addEventListener("DOMContentLoaded", function(event) {
  var themes = ["themesBasic","themesGreen","themesRed","themesBlue"];
  var colorClass = document.cookie;
  var cookieIsSet = false;
  for(var i = themes.length - 1; i>=0; i--)
    if(colorClass === themes[i]){ cookieIsSet = true; colorClass = themes[i];}
  
 if(!cookieIsSet) colorClass = "themesBasic";
 

  var ids = ["body","header","main","footer","article","aside"];      
   
   for(var i = 0; i < ids.length; i++){
         var element = document.getElementById(ids[i]);
         element.className = colorClass + " works_on_smartphone";
       }

});
