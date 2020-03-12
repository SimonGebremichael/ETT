var mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var colours = ["-", "lightblue", "-", "lightgreen", "pink", "-", "lightgreen", "-"];
var today = new Date();
var dd = String(today.getDate()).padStart(2);
var mm = String(today.getMonth() + 1).padStart(2);
var yyyy = today.getFullYear();

window.onload = start;
function start() {

    const box = document.getElementById("date-section")

    let para;
    let dayText;
    let res1;
    let res2;
    let br;
    let selectedDate;

    
    const currentDate = new Date()
    document.getElementById("dateTitle").innerHTML = dd + " " + mon[mm - 1] + ", " + yyyy;

    for (var i = 1; i <= 31; i++) {
        para = document.createElement("div");
        para.className = "day";
        para.id = "d" + i;
        para.title = dd + " " + mon[mm - 1] + ", " + yyyy;

        br = document.createElement("div");
        para.appendChild(br);


        dayText = document.createElement("label");
        dayText.textContent = i;
        para.appendChild(dayText);


        var press = colours[Math.floor((Math.random() * 6) + 1)];
        if (press != "-") {
            res1 = document.createElement("div");
            res1.className = "reserve";
            res1.setAttribute('style', "background-color: " + press);
            para.appendChild(res1);
        }

        var press2 = colours[Math.floor((Math.random() * 6) + 1)];
        if (press2 != "-") {
            res2 = document.createElement("div");
            res2.className = "reserve";
            res2.setAttribute('style', "background-color: " + press2);
            para.appendChild(res2);
        }


        box.appendChild(para);

        if (i < currentDate.getDate()) {
            para.setAttribute('style', 'color:#D2D2D2;')
        }
    }


   


    addEvent();
    document.getElementById("popBg").addEventListener("click", function () {
        document.getElementById("popupDisplay").style.display = "none";
        document.getElementsByClassName("Calendar")[0].style.filter = "blur(0)";
        document.getElementById("sideCal").style.filter = "blur(0)";
    });
}

function addEvent() {
    var temp = document.getElementsByClassName("day");
    for (var i = 0; i <= 17; i++) {
        temp[i].addEventListener("click", function () {

            document.getElementById("popupDisplay").style.display = "block";
            document.getElementsByClassName("Calendar")[0].style.filter = "blur(2px)";
            document.getElementById("sideCal").style.filter = "blur(2px)";
            document.getElementById("popDate").innerHTML = temp[i].title;
            console.log(temp[i].title);
        }, false)
    }
}

