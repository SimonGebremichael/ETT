import React, { Component, createElement } from 'react'

export default class statty extends React.Component {

    constructor(props) {
        super(props);
        // console.log(props.children.id);
        // console.log(props.children.name);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.carrier = "d_" + props.children.id;
        this.name = props.children.name;
        this.color = props.children.color;
    }
    componentDidMount() {
        var display = document.getElementById(this.carrier);
        var mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        for (var i = 0; i < 12; i++) {
            let container = document.createElement("div");

            let label = document.createElement("label");
            label.textContent = mon[i].substr(0, 1);
            label.style.marginLeft = "30%";


            let label2 = document.createElement("label");
            label2.id = "lbl" + i + this.carrier;
            label2.style.marginLeft = "20%";

            let diver = document.createElement("div");
            diver.style.height = "100%";
            diver.id = "stat_bg";
            diver.style.backgroundColor = this.color;
            diver.style.animation = "bounceIn 1." + i + "s";
            diver.className = "stat_bg_contain"  + this.carrier;
            diver.style.borderRight = "1px solid black";

            var div2 = document.createElement("div");
            div2.style.width = "100%";
            div2.className = "stat_display_item" + this.carrier;
            div2.id = "stat__id";

            diver.appendChild(div2);
            container.appendChild(label);
            container.appendChild(diver);
            container.appendChild(label2);
            display.appendChild(container);
        }

        let elem = document.getElementsByClassName("stat_display_item" + this.carrier);
        for (var i = 0; i < elem.length; i++) {
            var rand = (Math.floor(Math.random() * 15) + 0);
            var rand2 = rand * 11;

            rand > 9 ? elem[i].style.height = "0%" : elem[i].style.height = rand2 + "%";

            let totalUseOfMonth = document.getElementById("lbl" + i + this.carrier);
            rand > 9 ? totalUseOfMonth.textContent = 9 + "+" : totalUseOfMonth.textContent = 9-rand;
        }

        let elem2 = document.getElementsByClassName("stat_bg_contain"  + this.carrier);
        for (var i = 0; i < elem2.length; i++) {
            if(i < new Date().getMonth()){
                elem2[i].style.opacity = "0.5";
            }
        }
    }

    render() {
        return (
            <div id="dash_stat_items">
                <h3>{this.name}</h3>
                <div id={this.carrier} class="stat_displayer">
                </div>
            </div>
        )
    }
}
