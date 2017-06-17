// add car, renter, and owner object to reviews and reservations in the backend? or filter through results to display only ones with correct ID.

import React, { Component } from "react";
import axios from "axios";

import "../css/App.css";

import NewCar from "./NewCar";
import StartReservation from "./StartReservation";
import StartReview from "./StartReview";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            reviews: [],
            reservations: [],
            car_id: null,
            reserveCar: false,
            reviewCar: false
        };
        this.startReservation = this.startReservation.bind(this);
        this.makeReservation = this.makeReservation.bind(this);
        this.startReview = this.startReview.bind(this);
        this.makeReview = this.makeReview.bind(this);
    }
    render() {
        let reservation;
        let review;

        if (this.state.reserveCar === true) {
            reservation = (
                <StartReservation
                    makeReservation={this.makeReservation}
                    car_id={this.state.car_id}
                />
            );
        }
        if (this.state.reviewCar === true) {
            review = (
                <StartReview
                    makeReview={this.makeReview}
                    car_id={this.state.car_id}
                />
            );
        }
        console.log(this.state);
        let cars = this.state.cars.map(
            function(car, index) {
                return (
                    <div key={index}>
                        <div className="car-make-model"> {car.make_model} </div>
                        <div className="car-img" />
                        <div className="car-mpg" />
                        <div className="car-address" />
                        <button onClick={this.startReservation} value={car.id}>
                            Reserve this car
                        </button>
                        <button onClick={this.startReview} value={car.id}>
                            Review this car
                        </button>
                    </div>
                );
            }.bind(this)
        );
        return (
            <div className="App">
                <div>
                    <div>Add a car to your account: <NewCar /></div>
                    <div>{cars}</div>
                    <div>{reservation}</div>
                    <div>{review}</div>
                </div>
            </div>
        );
    }

    startReview(event) {
        this.setState({
            car_id: event.target.value,
            reviewCar: !this.state.reviewCar
        });
    }

    makeReview(props) {
        axios
            .post("/reviews", {
                data: {
                    car_id: props.car_id,
                    title: props.title,
                    description: props.description,
                    rating: props.rating
                }
            })
            .then(function(response) {
                console.log(response);
            });
    }

    makeReservation(props) {
        axios
            .post("/reservations", {
                data: {
                    car_id: props.car_id,
                    start_time: props.start_time,
                    start_AMPM: props.start_AMPM,
                    end_time: props.end_AMPM,
                    end_AMPM: props.end_AMPM
                }
            })
            .then(function(response) {
                console.log(response);
            });
    }
    startReservation(event) {
        this.setState({
            car_id: event.target.value,
            reserveCar: !this.state.reserveCar
        });
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
