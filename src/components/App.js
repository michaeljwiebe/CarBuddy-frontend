//Start time to end time calculation, how to access weekdays?
//paperclip
//AWS for group project
//Use react google map component?
//geolocation broken

//hide other cars on review or reservation

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
            user: null,
            car_id: null,
            reserveCar: false,
            reviewCar: false,
            reviewToEdit: null
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
        this.closeUpdateReview = this.closeUpdateReview.bind(this);
        this.deleteCar = this.deleteCar.bind(this);
        this.addCar = this.addCar.bind(this);
    }

    render() {
        let welcomeMsg;
        let newCar;
        let signInComponent;
        let signUpComponent;
        let signOutBtn;
        let carsAndReviews;
        let openReviewEditor;
        let newReservation;
        let newReview;

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
            openReviewEditor = (
                <EditReview
                    reviewToEdit={this.state.reviewToEdit}
                    updateReview={this.updateReview}
                    closeUpdateReview={this.closeUpdateReview}
                />
            );
        }

        if (this.state.user === null) {
            signUpComponent = <SignUp createUser={this.createUser} />;
            signInComponent = <SignIn signIn={this.signIn} />;
            openReviewEditor = "";
        } else {
            welcomeMsg = <div>Welcome {this.state.user.name}!</div>;
            signOutBtn = <button onClick={this.signOut}>Sign Out</button>;
            newCar = (
                <div>
                    Add a car to your account: <NewCar addCar={this.addCar} />
                </div>
            );
            carsAndReviews = this.state.cars.map(
                function(car, index) {
                    let removeCar;
                    let editReviewBtn;

                    if (car.owner_id === this.state.user.id) {
                        removeCar = (
                            <button onClick={this.deleteCar} value={car.id}>
                                Remove Car
                            </button>
                        );
                    }
                    let reviews = this.state.reviews.map(
                        function(review, index) {
                            editReviewBtn = "";
                            if (review.reviewer.id === this.state.user.id) {
                                editReviewBtn = (
                                    <button
                                        onClick={this.editReview}
                                        value={JSON.stringify(review)}
                                    >
                                        Edit
                                    </button>
                                );
                            }
                            if (car.id === review.car_id) {
                                return (
                                    <div key={index}>
                                        <div>{review.reviewer.name}</div>
                                        <div>{review.title}</div>
                                        <div>{review.description}</div>
                                        <div>{review.rating}</div>
                                        <div>{editReviewBtn}</div>
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
                                {car.make_model}
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
                            {removeCar}
                        </div>
                    );
                }.bind(this)
            );
        }

        console.log("App state:");
        console.log(this.state);

        return (
            <div className="App">
                <div>
                    <div>{welcomeMsg}</div>
                    <div>{signInComponent}</div>
                    <div>{signUpComponent}</div>
                    <div>{signOutBtn}</div>
                    <div>{newCar}</div>
                    <div>{carsAndReviews}</div>
                    <div>{openReviewEditor}</div>
                    <div>
                        <div>{newReservation}</div>
                        <div>{newReview}</div>
                    </div>

                </div>
            </div>
        );
    }
    addCar(props) {
        axios
            .post("/cars", {
                data: {
                    make_model: props.make_model,
                    year: props.year,
                    MPG: props.year,
                    price: props.year,
                    lat: props.lat,
                    lng: props.lng,
                    owner_id: this.state.user.id
                }
            })
            .then(
                function(response) {
                    this.setState({ cars: response.data });
                }.bind(this)
            );
    }

    deleteCar(event) {
        axios({
            method: "delete",
            url: "/cars/" + event.target.value
        }).then(
            function(response) {
                this.setState({ cars: response.data });
            }.bind(this)
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
                this.setState({ reviews: response.data, reviewToEdit: null });
            }.bind(this)
        );
    }
    closeUpdateReview() {
        this.setState({ reviewToEdit: null });
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
                    this.setState({ reviews: response.data, reviewCar: false });
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
            .then(
                function(response) {
                    this.setState({ reservations: response.data });
                }.bind(this)
            );
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
                    this.setState({ user: response.data });
                }.bind(this)
            );
    }
    signIn(props) {
        axios
            .post("/sign_in", {
                data: {
                    username: props.username,
                    password: props.password
                }
            })
            .then(
                function(response) {
                    this.setState({
                        user: response.data,
                        viewReviews: true,
                        viewReservations: true
                    });
                }.bind(this)
            );
    }
    signOut() {
        this.setState({
            user: null,
            reviewToEdit: null,
            car_id: null,
            reserveCar: false,
            reviewCar: false
        });
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
