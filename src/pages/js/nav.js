window.onload = start;
function start(){
  var proBG = document.getElementById("proBG").addEventListener("click", showPage);
  var sideAcc = document.getElementById("sideAcc").addEventListener("click", showProfile);
  
  var sideAcc = document.getElementById("colour_Scheme").addEventListener("click", function(){
    document.getElementById("ProfileColours").style.display = "block";
    document.getElementById("ProfileSideAcc").style.display = "none";
  });

  var sideAcc = document.getElementById("colourBtn").addEventListener("click", function(){
    document.getElementById("ProfileSideAcc").style.display = "block";
    document.getElementById("ProfileColours").style.display = "none";
  });

  function showPage(){
    document.getElementById("upcomming").style.filter = "blur(0)";
    document.getElementById("mainFeed").style.filter = "blur(0)";
    document.getElementById("sideBar").style.filter = "blur(0)";
    document.getElementById("profile").style.display = "none";
  }

  function showProfile(){
    document.getElementById("upcomming").style.filter = "blur(3px)";
    document.getElementById("mainFeed").style.filter = "blur(3px)";
    document.getElementById("sideBar").style.filter = "blur(3px)";
    document.getElementById("profile").style.display = "block";
  }
}