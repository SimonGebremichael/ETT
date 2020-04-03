import React from 'react'
import Offsite from './Offsite'
import ActiveRequests from './ActiveRequests'
import Upcomming from './Upcomming'
import Profile from '../Profile'
var data;
export default class team extends React.Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        console.log(props)
        this.user = this.props.match.params.id;
        this.state = {
            done: false
        }
    }

    componentDidMount() {
        var colours2 = ["lightblue", "lightgreen", "pink", "salmon"],
            colours3 = ["Remote", "Vacation", "Bithday", "Sick"];

        var elem = document.getElementsByClassName("request_Type");
        var elem2 = document.getElementsByClassName("request_Type_info");
        for (var i = 0; i < elem.length; i++) {
            var rand = (Math.floor(Math.random() * 4) + 1) - 1;
            elem[i].style.backgroundColor = colours2[rand];
            elem2[i].innerHTML = colours3[rand];
        }
    }

    componentWillMount() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/crud/api/getPerson.php?i=" + this.user);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                data = JSON.parse(xhr.responseText);
                console.log(data);
            }
        }
        xhr.send();

        this.setState({ done: true });
    }

    render() {
        return (
            <>
                <Profile />
                <div id="container_dashboard">
                    <Offsite id={data} />
                    <ActiveRequests />
                    <Upcomming />
                </div>
            </>
        );
    }
}
