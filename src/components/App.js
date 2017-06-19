//Start time to end time calculation, how to access weekdays?
//DatePicker react component?

import React, { Component } from "react";
import axios from "axios";

import "../css/App.css";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
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
            user: "",
            signIn: true,
            signUp: false,
            car_id: null,
            reserveCar: false,
            reviewCar: false,
            viewReviews: false,
            viewReservations: false
        };
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.createUser = this.createUser.bind(this);
        this.startReservation = this.startReservation.bind(this);
        this.makeReservation = this.makeReservation.bind(this);
        this.startReview = this.startReview.bind(this);
        this.makeReview = this.makeReview.bind(this);
        this.viewReviews = this.viewReviews.bind(this);
        this.viewReservations = this.viewReservations.bind(this);
    }
    render() {
        let reservation;
        let review;
        let signInComponent;
        let signUpComponent;
        let signOutBtn;

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
        if (this.state.viewReviews === true) {
        }
        if (this.state.user === "") {
            signUpComponent = <SignUp createUser={this.createUser} />;
            signInComponent = <SignIn signIn={this.signIn} />;
        } else {
            signOutBtn = <button onClick={this.signOut}>Sign Out</button>;
        }

        console.log(this.state);
        let cars = this.state.cars.map(
            function(car, index) {
                let reviews = this.state.reviews.map(function(review, index) {
                    if (car.id === review.car_id) {
                        return (
                            <div key={index}>
                                <div>{review.reviewer.name}</div>
                                <div>{review.title}</div>
                                <div>{review.description}</div>
                                <div>{review.rating}</div>
                            </div>
                        );
                    } else {
                        return <span />;
                    }
                });
                console.log(reviews);
                return (
                    <div key={index}>
                        <div className="car-make-model"> {car.make_model} </div>
                        <div className="car-img" />
                        <div className="car-mpg" />
                        <div className="car-address" />
                        <div>{reviews}</div>
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
                    <div>{signInComponent}</div>
                    <div>{signUpComponent}</div>
                    <div>{signOutBtn}</div>
                    <div>{cars}</div>
                    <div>{reservation}</div>
                    <div>{review}</div>
                </div>
            </div>
        );
    }
    viewReviews() {}
    viewReservations() {}

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
    createUser(props) {
        axios
            .post("/users", {
                data: {
                    name: props.name,
                    address: props.address,
                    zip: props.zip,
                    username: props.username,
                    password: props.password
                }
            })
            .then(
                function(response) {
                    console.log(response);
                    this.setState({ user: response.data });
                }.bind(this)
            );
    }
    signIn(props) {
        axios
            .get("/users", {
                data: {
                    username: props.username,
                    password: props.password
                }
            })
            .then(
                function(response) {
                    console.log(response);
                    this.setState({ user: response.data });
                }.bind(this)
            );
    }
    signOut() {
        this.setState({ user: "" });
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
