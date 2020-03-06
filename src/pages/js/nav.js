window.onload = start;
function start(){
  var proBG = document.getElementById("proBG").addEventListener("click", showPage);
  var sideAcc = document.getElementById("sideAcc").addEventListener("click", showProfile);

  function showPage(){
    document.getElementById("upcomming").style.filter = "blur(0)";
    document.getElementById("mainFeed").style.filter = "blur(0)";
    document.getElementById("sideBar").style.filter = "blur(0)";
    // document.getElementById("header").style.filter = "blur(0)";
    document.getElementById("profile").style.display = "none";
  }

  function showProfile(){
    document.getElementById("upcomming").style.filter = "blur(3px)";
    document.getElementById("mainFeed").style.filter = "blur(3px)";
    document.getElementById("sideBar").style.filter = "blur(3px)";
    // document.getElementById("header").style.filter = "blur(3px)";
    document.getElementById("profile").style.display = "block";
  }

}


// // $(document).ready(function(){
// //   $("#proBG").click(function(){
// //     $("#upcomming").css("filter","blur(0)");
// //     $("#mainFeed").css("filter","blur(0)");
// //     $("#sideBar").css("filter","blur(0)");
// //     $("#header").css("filter","blur(0)");
// //     $("#profile").fadeToggle();
// //     profileDefualt();
    
// //   });

// //   $("#sideAcc").click(function(){
// //     $("#profile").show();
// //     $("#upcomming").css("filter","blur(3px)");
// //     $("#mainFeed").css("filter","blur(3px)");
// //     $("#sideBar").css("filter","blur(3px)");
// //     $("#header").css("filter","blur(3px)");
// //   });


// //   $("#colour_Scheme").click(function(){
// //     $("#ProfileColours").show();
// //     $("#ProfileSideAcc").hide();
// //   });

// //   $("#colourBtn").click(profileDefualt);

// //   function profileDefualt(){
// //     $("#ProfileColours").hide();
// //     $("#ProfileSideAcc").show();
// //   }
// });