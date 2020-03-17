var mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    colours = ["-", "lightblue", "-", "lightgreen", "pink", "-", "lightgreen", "-"],
    weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

var today = new Date(),
    dd = String(today.getDate()).padStart(2),
    mm = String(today.getMonth() + 1).padStart(2),
    yyyy = today.getFullYear(),
    currentDate = new Date();

var change = false,
    change2 = false,
    listened = false;

var d = document;
window.onload = prntCal;
function prntCal() {

    //reset cal 
    const box = document.getElementById("date-section2");
    box.innerHTML = "";


    var Starting_dayOfTheWeek = new Date(yyyy, mm - 1, 0).getDay();
    let para;
    let dayText;
    let res1;
    let res2;

    d.getElementById("dateTitle").innerHTML = mon[mm - 1] + ", " + yyyy;
    for (var i = 0; i < Starting_dayOfTheWeek + 1; i++) {
        if (Starting_dayOfTheWeek != 6) {
            var emptyFeild = d.createElement("div");
            box.appendChild(emptyFeild);
        }
    }

    for (var i = 1; i <= getDaysInMonth(mm, yyyy); i++) {
        para = d.createElement("div");
        para.className = "day";
        para.id = "d" + i;
        para.padding = "5px";
        para.style.animation = "slideInLeft 0." + i + "s";
        para.title = i + " " + mon[mm - 1] + ", " + yyyy;

        var br = d.createElement("BR");
        para.appendChild(br);

        dayText = d.createElement("label");
        dayText.textContent = i;
        para.appendChild(dayText);

        var press = colours[Math.floor((Math.random() * 6) + 1)];
        if (press != "-") {
            res1 = d.createElement("div");
            res1.className = "reserve";
            res1.setAttribute('style', "background-color: " + press);
            para.appendChild(res1);
        }

        var press2 = colours[Math.floor((Math.random() * 6) + 1)];
        if (press2 != "-") {
            res2 = d.createElement("div");
            res2.className = "reserve";
            res2.setAttribute('style', "background-color: " + press2);
            para.appendChild(res2);
        }

        box.appendChild(para);

        //current day marker on calendar
        if (currentDate.getMonth() == mm - 1 && currentDate.getFullYear() == yyyy) {
            if (i < currentDate.getDate()) {
                para.style.opacity = "0.4";

            } else if (i == currentDate.getDate()) {
                dayText.style.backgroundColor = "#2F93F2";
                dayText.style.padding = "5px 7px 5px 5px";
                dayText.style.color = "white";
                dayText.style.borderRadius = "10px";
            }
        }
    }


    d.getElementById("popBg").addEventListener("click", function () {
        d.getElementById("popupDisplay").style.display = "none";
        d.getElementsByClassName("Calendar")[0].style.filter = "blur(0)";
        d.getElementById("sideCal").style.filter = "blur(0)";
    });

    if (!listened) {
        init();
        listened = true;
    }
}

function addEvent() {
    var temp = d.getElementsByClassName("day");
    for (var i = 0; i <= 17; i++) {
        temp[i].addEventListener("click", function () {
            d.getElementById("popupDisplay").style.display = "block";
            d.getElementsByClassName("Calendar")[0].style.filter = "blur(2px)";
            d.getElementById("sideCal").style.filter = "blur(2px)";
            d.getElementById("popDate").innerHTML = temp[i].title;
            console.log(temp[i].title);
        }, false)
    }
}



var getDaysInMonth = function (month, year) {
    return new Date(year, month, 0).getDate();
};

function init() {
    addEvent();
    printStatusOfmonths();
    d.getElementById("calNav1").addEventListener("click", function () {
        mm--;
        if (!change) {
            if (mm <= 0) {
                mm = 12;
                yyyy--;
            }
            today = new Date(yyyy, mm, 0);
            console.log(today);
            change = true;
            prntCal();
        }
    });
    d.getElementById("calNav1").addEventListener("mouseup", function () { change = false; });


    d.getElementById("calNav2").addEventListener("click", function () {
        mm++;
        if (!change2) {
            if (mm >= 13) {
                mm = 1;
                yyyy++;
            }
            today = new Date(yyyy, mm, 0);
            console.log(today);
            change = true;
            prntCal();
        }
    });
    d.getElementById("calNav2").addEventListener("mouseup", function () { change2 = false; });

    d.getElementById("sideDatePrint").innerHTML = weekday[currentDate.getDay()] + ", " + dd + " " + mon[currentDate.getMonth()];

    d.getElementById("sideInfo").addEventListener("click", function () {
        yyyy = currentDate.getFullYear();
        mm = currentDate.getMonth()
        dd = 0;
        prntCal();
    });


}

var colours2 = ["lightblue", "lightgreen", "pink", "yellow"];

function printStatusOfmonths() {
    var elem = d.getElementsByClassName("cal_stat_details");
    for (var i = 0; i <= 3; i++) {
        elem[i].style.backgroundColor = colours2[(Math.floor(Math.random() * 4) + 1) - 1];
    }
}