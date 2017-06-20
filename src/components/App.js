//Start time to end time calculation, how to access weekdays?
//work on editReview
//passing in review object, why does reviewToEdit show "object Object" when i log state after clicking edit?
//how to access review from reviewtoedit?

import React, { Component } from "react";
import axios from "axios";

import "../css/App.css";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NewCar from "./NewCar";
import StartReservation from "./StartReservation";
import StartReview from "./StartReview";
import EditReview from "./EditReview";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            reviews: [],
            reservations: [],
            user: "",
            car_id: null,
            reserveCar: false,
            reviewCar: false,
            reviewToEdit: null
            // viewReviews: false,
            // viewReservations: false
        };
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.createUser = this.createUser.bind(this);
        this.startReservation = this.startReservation.bind(this);
        this.makeReservation = this.makeReservation.bind(this);
        this.startReview = this.startReview.bind(this);
        this.makeReview = this.makeReview.bind(this);
        this.viewReservations = this.viewReservations.bind(this);
        this.closeReservation = this.closeReservation.bind(this);
        this.closeReview = this.closeReview.bind(this);
        this.editReview = this.editReview.bind(this);
        this.updateReview = this.updateReview.bind(this);
    }

    render() {
        let newReservation;
        let newReview;
        let newCar;
        let signInComponent;
        let signUpComponent;
        let signOutBtn;
        let carsAndReviews;
        let reviewEditor;

        if (this.state.user === "") {
            signUpComponent = <SignUp createUser={this.createUser} />;
            signInComponent = <SignIn signIn={this.signIn} />;
        } else {
            signOutBtn = <button onClick={this.signOut}>Sign Out</button>;
            newCar = <div>Add a car to your account: <NewCar /></div>;
            carsAndReviews = this.state.cars.map(
                function(car, index) {
                    let reviews = this.state.reviews.map(
                        function(review, index) {
                            if (car.id === review.car_id) {
                                return (
                                    <div key={index}>
                                        <div>{review.reviewer.name}</div>
                                        <div>{review.title}</div>
                                        <div>{review.description}</div>
                                        <div>{review.rating}</div>
                                        <button
                                            onClick={this.editReview}
                                            value={JSON.stringify(review)}
                                        >
                                            Edit
                                        </button>
                                        <div>{reviewEditor}</div>
                                    </div>
                                );
                            } else {
                                return <span />;
                            }
                        }.bind(this)
                    );
                    return (
                        <div key={index}>
                            <div className="car-make-model">
                                {" "}{car.make_model}{" "}
                            </div>
                            <div className="car-img" />
                            <div className="car-mpg" />
                            <div className="car-address" />
                            <div>{reviews}</div>
                            <button
                                onClick={this.startReservation}
                                value={car.id}
                            >
                                Reserve this car
                            </button>
                            <button onClick={this.startReview} value={car.id}>
                                Review this car
                            </button>
                        </div>
                    );
                }.bind(this)
            );
        }

        if (this.state.reserveCar === true) {
            newReservation = (
                <StartReservation
                    makeReservation={this.makeReservation}
                    car_id={this.state.car_id}
                    closeReservation={this.closeReservation}
                />
            );
        }
        if (this.state.reviewCar === true) {
            newReview = (
                <StartReview
                    makeReview={this.makeReview}
                    closeReview={this.closeReview}
                />
            );
        }
        if (this.state.reviewToEdit !== null) {
            console.log(this.state.reviewToEdit);
            reviewEditor = (
                <EditReview
                    reviewToEdit={this.state.reviewToEdit}
                    updateReview={this.updateReview}
                />
            );
        }

        console.log("App state:");
        console.log(this.state);

        return (
            <div className="App">
                <div>
                    <div>{signInComponent}</div>
                    <div>{signUpComponent}</div>
                    <div>{signOutBtn}</div>
                    <div>{newCar}</div>
                    <div>{carsAndReviews}</div>
                    <div>{reviewEditor}</div>
                    <div>{newReservation}</div>
                    <div>{newReview}</div>
                </div>
            </div>
        );
    }
    viewReservations() {}

    closeReservation(props) {
        this.setState({ reserveCar: false });
    }
    closeReview(props) {
        this.setState({ reviewCar: false });
    }
    updateReview(props) {
        axios({
            method: "patch",
            url: "/reviews/" + props.id,
            params: {
                title: props.title,
                description: props.description,
                rating: props.rating
            }
        }).then(
            function(response) {
                this.setState({ reviews: response.data });
            }.bind(this)
        );
    }
    editReview(event) {
        this.setState({ reviewToEdit: JSON.parse(event.target.value) });
    }

    startReview(event) {
        this.setState({
            car_id: event.target.value,
            reviewCar: true
        });
    }

    makeReview(props) {
        axios
            .post("/reviews", {
                data: {
                    car_id: this.state.car_id,
                    title: props.title,
                    description: props.description,
                    rating: props.rating,
                    reviewer_id: this.state.user.id
                }
            })
            .then(
                function(response) {
                    console.log(response.data);
                    this.setState({ reviews: response.data });
                }.bind(this)
            );
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
            reserveCar: true
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
        console.log(props);
        axios
            .post("/sign_in", {
                data: {
                    username: props.username,
                    password: props.password
                }
            })
            .then(
                function(response) {
                    console.log(response);
                    this.setState({
                        user: response.data,
                        viewReviews: true,
                        viewReservations: true
                    });
                }.bind(this)
            );
    }
    signOut() {
        this.setState({ user: "" });
    }

    componentWillMount() {
        axios.get("/reviews").then(
            function(response) {
                this.setState({
                    reviews: response.data
                });
            }.bind(this)
        );
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
    }
}

export default App;
