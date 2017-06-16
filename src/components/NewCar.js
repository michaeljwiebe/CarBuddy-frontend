import React, { Component } from "react";
import axios from "axios";

class NewCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            make_model: "",
            year: "",
            mpg: "",
            price: "",
            lat: "",
            lng: ""
        };
        this.updateYear = this.updateYear.bind(this);
        this.updateMake_Model = this.updateMake_Model.bind(this);
        this.updateMPG = this.updateMPG.bind(this);
        this.updatePrice = this.updatePrice.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
    }

    render() {
        return (
            <div>
                <input
                    onChange={this.updateMake_Model}
                    value={this.state.make_model}
                />
                <input onChange={this.updateYear} value={this.state.Year} />
                <input onChange={this.updateMPG} value={this.state.mpg} />
                <input onChange={this.updatePrice} value={this.state.price} />
                <button onClick={this.updateLocation} />
            </div>
        );
    }

    updateMake_Model(event) {
        this.setState({ make_model: event.target.value });
    }
}
