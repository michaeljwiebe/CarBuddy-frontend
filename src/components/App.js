import React, { Component } from "react";
import axios from "axios";

import "../css/App.css";

import NewCar from "./NewCar";

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
        console.log(this.state);
        return (
            <div className="App">
                <NewCar />
            </div>
        );
    }
    componentWillMount() {
        axios.get("/cars").then(
            function(response) {
                this.setState({ cars: response.data });
            }.bind(this)
        );
        axios.get("/reservations").then(
            function(response) {
                this.setState({ reservations: response.data });
            }.bind(this)
        );
        axios.get("/reviews").then(
            function(response) {
                this.setState({
                    reviews: response.data
                });
            }.bind(this)
        );
    }
}

export default App;
