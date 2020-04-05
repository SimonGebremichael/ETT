import React from 'react'

export default class upcomming extends React.Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.user = localStorage.getItem("access");
    }

    componentDidMount() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/crud/api/getUpcommingOffsites.php");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    var box = document.getElementById("upcommingResults");
                    if (data.Total != 0) {
                        for (var i = 0; i < data.Total; i++) {
                            box.appendChild(OffsiteItem(data.request[i]));
                        }
                    } else {
                        box.innerHTML = "no comming offsites :)";
                    }
                } catch (e) { 
                    console.log(e);
                    box.innerHTML = "there seems to be an issue :(";
                }
            }
        }
        xhr.send();
    }
    render() {
        return (
            <div id="upcomming">
                <div id="upcomingTittile">
                    <h2>Upcomming Offsites:</h2>
                </div><br />
                <div id="upcommingSort">
                    <h4>Sort By:</h4>
                    <select id="offSiteSort" value="Recent">
                        <option value="Recent">Recent</option>
                        <option value="allTime">All Time</option>
                        <option value="thisDay">This Day</option>
                        <option value="thisMonth">This Month</option>
                        <option value="thisYear">This Year</option>
                    </select>
                </div>

                <div id="upcommingResults">
                   
                </div>
            </div>
        )
    }
}


function OffsiteItem(person) {

    var OffsiteSatus = document.createElement("div");
    OffsiteSatus.id = "OffsiteSatus";
    var br = document.createElement("BR");

    var offImg = document.createElement("div");
    offImg.id = "offImg";
    var img = document.createElement("img");
    img.src = person.img;
    img.id = "OffsiteImg";
    offImg.appendChild(img);

    var offInfo = document.createElement("div");
    offInfo.id = "offInfo";
    var first_name = document.createElement("label");
    first_name.textContent = person.first_name + ", " + person.last_name;
    var email = document.createElement("label");
    email.innerHTML = "<br /> " + person.email;
    var active = document.createElement("button");
    active.id = "offsiteActivity";
    active.textContent = person.employee_status;
    offInfo.appendChild(first_name);
    offInfo.appendChild(br);
    offInfo.appendChild(email);
    offInfo.appendChild(br);
    offInfo.appendChild(active);

    var offsiteLeft = document.createElement("div");
    offsiteLeft.id = "offsiteLeft";
    var btn1 = document.createElement("button");
    btn1.id = "requestActivity";
    btn1.textContent = "Feb.17.20";
    var btn2 = document.createElement("button");
    btn2.id = "requestActivity";
    btn2.textContent = "Feb.17.20";
    offsiteLeft.appendChild(btn1);
    offsiteLeft.innerHTML += "&nbsp;&nbsp;";
    offsiteLeft.appendChild(btn2);


    var offsiteRight = document.createElement("div");
    offsiteRight.id = "offsiteRight";
    offsiteRight.className = "offsite_Right";
    var label = document.createElement("label")
    label.textContent = "remote";
    offsiteRight.appendChild(label);

    OffsiteSatus.appendChild(offImg);
    OffsiteSatus.appendChild(offInfo);
    OffsiteSatus.appendChild(offsiteLeft);
    OffsiteSatus.appendChild(offsiteRight);
    return OffsiteSatus;
}