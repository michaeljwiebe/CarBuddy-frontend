//send url back to frontend
//fix users controller for image, send user id
// problem with StartReservation.css?!? - some classes not getting applied
//AWS for group project -- maybe not!
//is google map bootstrapURLKeys that is there already ok?
//build nav for buttons, make it stay on page, make display change only

//add image for user
//add image for car
//small map for each car location on ReserveCar
//add Stripe payment system

import React, { Component } from "react";
import axios from "axios";

import "../css/App.css";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AddCar from "./AddCar";
import EditUser from "./EditUser";
import UserReservations from "./UserReservations";
import StartReservation from "./StartReservation";
import StartReview from "./StartReview";
import EditReview from "./EditReview";
import GoogleMap from "./GoogleMap";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cars: [],
			reviews: [],
			reservations: [],
			signUp: false,
			user: { name: "Michael Wiebe", id: 1 },
			carToReview: null,
			reviewToEdit: null,
			reserveCar: false,
			addCar: false,
			viewCarsAndReviews: true,
			viewReservations: false,
			editUser: false
		};
		this.signIn = this.signIn.bind(this);
		this.signUp = this.signUp.bind(this);
		this.signOut = this.signOut.bind(this);
		this.createUser = this.createUser.bind(this);
		this.editUser = this.editUser.bind(this);
		this.updateUserInfo = this.updateUserInfo.bind(this);
		this.uploadImage = this.uploadImage.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
		this.startReservation = this.startReservation.bind(this);
		this.makeReservation = this.makeReservation.bind(this);
		this.startReview = this.startReview.bind(this);
		this.makeReview = this.makeReview.bind(this);
		this.viewReservations = this.viewReservations.bind(this);
		this.editReview = this.editReview.bind(this);
		this.updateReview = this.updateReview.bind(this);
		this.showCarsAndReviews = this.showCarsAndReviews.bind(this);
		this.deleteCar = this.deleteCar.bind(this);
		this.addCar = this.addCar.bind(this);
		this.openAddCar = this.openAddCar.bind(this);
	}

	render() {
		let hamburgerIcon;
		let welcomeMsg;
		let newCar;
		let signInComponent;
		let signUpBtn;
		let signUpComponent;
		let signOutBtn;
		let carsAndReviews;
		let openReviewEditor;
		let startCarReservationBtn;
		let newReservation;
		let userReservationsBtn;
		let userReservations;
		let newReview;
		let googleMap;
		let editUserBtn;
		let editUser;

		if (this.state.reserveCar === true) {
			newReservation = (
				<StartReservation
					makeReservation={this.makeReservation}
					reservations={this.state.reservations}
					cars={this.state.cars}
				/>
			);
		}
		if (this.state.carToReview !== null) {
			newReview = (
				<StartReview carToReview={this.state.carToReview} makeReview={this.makeReview} />
			);
		}
		if (this.state.reviewToEdit !== null) {
			openReviewEditor = (
				<EditReview
					reviewToEdit={this.state.reviewToEdit}
					updateReview={this.updateReview}
				/>
			);
		}

		if (this.state.user === null) {
			signInComponent = <SignIn signIn={this.signIn} />;
			signUpBtn = <div onClick={this.signUp}>Sign Up</div>;
			if (this.state.signUp === true) {
				signUpComponent = <SignUp createUser={this.createUser} />;
			}
			openReviewEditor = null;
		} else {
			hamburgerIcon = (
				<div onClick={this.hamburgerToggle} className="hamburger-show-btn">&#9776</div>
			);
			editUserBtn = <button onClick={this.editUser}>Edit User</button>;
			userReservationsBtn = <button onClick={this.viewReservations}>Reservations</button>;
			startCarReservationBtn = (
				<button onClick={this.startReservation}>
					Reserve a car
				</button>
			);
			welcomeMsg = <div>Welcome {this.state.user.name}!</div>;
			signOutBtn = <button onClick={this.signOut}>Sign Out</button>;
			if (this.state.editUser === true) {
				editUser = (
					<EditUser
						user={this.state.user}
						deleteUser={this.deleteUser}
						updateUserInfo={this.updateUserInfo}
					/>
				);
			}
			if (this.state.addCar === true) {
				newCar = <AddCar addCar={this.addCar} />;
			} else {
				newCar = <button onClick={this.openAddCar}>Add a car</button>;
			}
			if (this.state.viewReservations === true) {
				userReservations = (
					<UserReservations
						allReservations={this.state.reservations}
						user_id={this.state.user.id}
						cars={this.state.cars}
					/>
				);
			}
			if (this.state.viewCarsAndReviews === true) {
				googleMap = <GoogleMap cars={this.state.cars} />;
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
											Edit Review
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
								<button onClick={this.startReview} value={JSON.stringify(car)}>
									Review this car
								</button>
								{removeCar}
							</div>
						);
					}.bind(this)
				);
			} else {
				carsAndReviews = (
					<button onClick={this.showCarsAndReviews}>
						Cars and Reviews
					</button>
				);
			}
		}

		console.log(this.state);
		//adjust layout
		//pick color scheme
		//make hamburger menu slide on

		return (
			<div className="App">
				<div>
					<div>{welcomeMsg}</div>
					<div>{signInComponent}</div>
					<div>{signUpBtn}</div>
					<div>{signUpComponent}</div>
				</div>
				<div>
					{hamburgerIcon}
					<div className="hamburger">
						<div className="user-avatar" />
						<div onClick={this.hamburgerToggle} className="hamburger-close-btn">X</div>
						<div>{signOutBtn}</div>
						<div>{editUserBtn}</div>
						<div>{newCar}</div>
					</div>
					<div>{googleMap}</div>
					<div>{newReview}</div>
					<div>{newReservation}</div>
					<div>{carsAndReviews}</div>
					<div>{editUser}</div>
					<div>{userReservations}</div>
					<div>{openReviewEditor}</div>
					<div className="menu flex">
						<div className="menu-item">{userReservationsBtn}</div>
						<div className="menu-item">{startCarReservationBtn}</div>
					</div>

				</div>
			</div>
		);
	}
	hamburgerToggle() {
		let hamburgerMenu = document.getElementsByClassName("hamburger")[0];
		hamburgerMenu.classList.toggle("hamburger-show");
	}
	openAddCar() {
		this.setState({
			addCar: true,
			carToReview: null,
			reviewToEdit: null,
			reserveCar: false,
			viewCarsAndReviews: false,
			viewReservations: false,
			editUser: false
		});
	}
	addCar(props) {
		axios
			.post("/cars", {
				data: {
					make_model: props.make_model,
					year: props.year,
					mpg: props.mpg,
					price: props.price,
					lat: props.lat,
					lng: props.lng,
					owner_id: this.state.user.id
				}
			})
			.then(
				function(response) {
					this.setState({
						cars: response.data,
						addCar: false,
						viewCarsAndReviews: true
					});
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
	showCarsAndReviews() {
		this.setState({
			carToReview: null,
			viewCarsAndReviews: true,
			addCar: false,
			reviewToEdit: null,
			reserveCar: false,
			viewReservations: false,
			editUser: false
		});
	}
	viewReservations() {
		this.setState({
			carToReview: null,
			viewCarsAndReviews: false,
			addCar: false,
			reviewToEdit: null,
			reserveCar: false,
			viewReservations: true,
			editUser: false
		});
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
	editReview(event) {
		this.setState({
			reviewToEdit: JSON.parse(event.target.value),
			viewCarsAndReviews: false
		});
	}

	startReview(event) {
		this.setState({
			carToReview: JSON.parse(event.target.value),
			viewCarsAndReviews: false,
			addCar: false,
			reviewToEdit: null,
			reserveCar: false,
			viewReservations: false,
			editUser: false
		});
	}

	makeReview(props) {
		axios
			.post("/reviews", {
				data: {
					car_id: props.car_id,
					title: props.title,
					description: props.description,
					rating: props.rating,
					reviewer_id: this.state.user.id
				}
			})
			.then(
				function(response) {
					this.setState({
						reviews: response.data,
						carToReview: null,
						viewCarsAndReviews: true
					});
				}.bind(this)
			);
	}

	makeReservation(props) {
		axios
			.post("/reservations", {
				data: {
					car_id: props.car_id,
					start_date: props.start_date,
					end_date: props.end_date,
					reservation_hours: props.reservation_hours,
					renter_id: this.state.user.id
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
			reserveCar: true,
			viewCarsAndReviews: false,
			carToReview: null,
			addCar: false,
			reviewToEdit: null,
			viewReservations: false,
			editUser: false
		});
	}
	signUp() {
		this.setState({ signUp: true });
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
					this.uploadImage();
					this.setState({ user: response.data, signUp: false });
				}.bind(this)
			);
	}
	deleteUser() {
		console.log(this.state.user.id);
		axios({
			method: "delete",
			url: "/users/" + this.state.user.id
		}).then(
			function(response) {
				this.signOut();
			}.bind(this)
		);
	}
	editUser() {
		this.setState({
			reserveCar: false,
			viewCarsAndReviews: false,
			carToReview: null,
			addCar: false,
			reviewToEdit: null,
			viewReservations: false,
			editUser: true
		});
	}
	updateUserInfo(props) {
		axios({
			method: "patch",
			url: "/users/" + this.state.user.id,
			params: {
				username: props.username,
				password: props.password,
				name: props.name,
				address: props.address,
				zip: props.zip
			}
		}).then(
			function(response) {
				this.uploadImage();
				this.setState({ user: response.data, editUser: false, viewCarsAndReviews: true });
			}.bind(this)
		);
	}

	uploadImage() {
		var data = new FormData();
		var imagedata = document.querySelector('input[type="file"]').files[0];

		if (imagedata === undefined) {
			return;
		}

		data.append("data", imagedata);

		fetch("/users/image", {
			method: "POST",
			body: data
		}).then(
			function(response) {
				console.log(response.data);
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
						user: response.data
					});
				}.bind(this)
			);
	}
	signOut() {
		this.setState({
			user: null,
			reviewToEdit: null,
			reserveCar: false,
			carToReview: null,
			viewReservations: false,
			editUser: false
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
