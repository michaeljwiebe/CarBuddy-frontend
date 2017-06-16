import React, { Component } from "react";
import axios from "axios";

import "../css/App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            reviews: [],
            reservations: []
        };
    }
    render() {
        return (
            <div className="App">
                <p className="App-intro">
                    To get started, edit
                    {" "}
                    <code>src/App.js</code>
                    {" "}
                    and save to reload.
                </p>
            </div>
        );
    }
    componentWillMount() {
        console.log(this.state);
        axios.get("/cars").then(function(response) {
            console.log(response);
            this.setState({ cars: response });
        });
        axios.get("/reservations").then(function(response) {
            console.log(response);
            this.setState({ reservations: response });
        });
        axios.get("/reviews").then(function(response) {
            console.log(response);
            this.setState({
                reviews: response
            });
        });
    }
}

export default App;
