var mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var colours = ["-", "lightblue", "-", "lightgreen", "pink", "-", "lightgreen", "-"];
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var today = new Date();
var dd = String(today.getDate()).padStart(2),
    mm = String(today.getMonth() + 1).padStart(2),
    yyyy = today.getFullYear();
const currentDate = new Date();
var change = false;



window.onload = start;
function start() {
    const box = document.getElementById("date-section");
    box.innerHTML = "";

    var Starting_dayOfTheWeek = new Date(yyyy + "-" + mm + "-01").getDay();
    let para;
    let dayText;
    let res1;
    let res2;

    document.getElementById("dateTitle").innerHTML = dd + " " + mon[mm - 1] + ", " + yyyy;
    document.getElementById("sideDatePrint").innerHTML = "Today: " + weekday[today.getDay()] + ", " + mon[mm - 1] + getDaysInMonth(mm, yyyy);

    for (var i = 0; i < Starting_dayOfTheWeek; i++) {
        var emptyFeild = document.createElement("div");
        box.appendChild(emptyFeild);
    }

    for (var i = 1; i <= getDaysInMonth(mm, yyyy); i++) {
        para = document.createElement("div");
        para.className = "day";
        para.id = "d" + i;
        para.padding = "5px";
        para.title = i + " " + mon[mm - 1] + ", " + yyyy;

        var br = document.createElement("BR");
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
            para.style.opacity = "0.4";

        } else if (i == currentDate.getDate()) {
            dayText.style.backgroundColor = "#2F93F2";
            dayText.style.padding = "5px 7px 5px 5px";
            dayText.style.color = "white";
            dayText.style.borderRadius = "10px";
        }
    }

    addEvent();
    document.getElementById("popBg").addEventListener("click", function () {
        document.getElementById("popupDisplay").style.display = "none";
        document.getElementsByClassName("Calendar")[0].style.filter = "blur(0)";
        document.getElementById("sideCal").style.filter = "blur(0)";
    });

    document.getElementById("calNav1").addEventListener("click", function () {
        mm--;
        if (!change) {
            today = new Date(2020, mm, 0);
            console.log(today);
            change = true;
            start();
        }
    });
    document.getElementById("calNav1").addEventListener("mouseup", function () {change = false;});





    document.getElementById("calNav2").addEventListener("click", function () {
        mm++;
        if (!change) {
            today = new Date(2020, mm, 0);
            console.log(today);
            change = true;
            start();
        }
    });

    document.getElementById("calNav2").addEventListener("mouseup", function () {change = false;});
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

var getDaysInMonth = function (month, year) {
    return new Date(year, month, 0).getDate();
};

function readyCal() {


}