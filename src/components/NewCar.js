import React, { Component } from "react";
import axios from "axios";

class NewCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            make_model: "",
            year: "",
            MPG: "",
            price: "",
            lat: "",
            lng: ""
        };
        this.updateYear = this.updateYear.bind(this);
        this.updateMake_Model = this.updateMake_Model.bind(this);
        this.updateMPG = this.updateMPG.bind(this);
        this.updatePrice = this.updatePrice.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.saveCar = this.saveCar.bind(this);
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <input
                    onChange={this.updateMake_Model}
                    value={this.state.make_model}
                    placeholder="Make and Model"
                />
                <input
                    onChange={this.updateYear}
                    value={this.state.Year}
                    placeholder="Year"
                />
                <input
                    onChange={this.updateMPG}
                    value={this.state.MPG}
                    placeholder="MPG"
                />
                <input
                    onChange={this.updatePrice}
                    value={this.state.price}
                    placeholder="Price"
                />
                <button onClick={this.updateLocation}>Get location</button>
                <button onClick={this.saveCar}>Save Car</button>
            </div>
        );
    }

    saveCar() {
        axios
            .post("/cars", {
                data: {
                    make_model: this.state.make_model,
                    year: this.state.year,
                    MPG: this.state.year,
                    price: this.state.year,
                    lat: this.state.lat,
                    lng: this.state.lng
                }
            })
            .then(function(response) {
                console.log(response);
            });
    }

    updateLocation() {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            }.bind(this)
        );
    }
    updateMake_Model(event) {
        this.setState({ make_model: event.target.value });
    }
    updateYear(event) {
        this.setState({ year: event.target.value });
    }
    updateMPG(event) {
        this.setState({ MPG: event.target.value });
    }
    updatePrice(event) {
        this.setState({ price: event.target.value });
    }
}

export default NewCar;
