//send url back to frontend
//fix users controller for image, send user id
//AWS for group project -- maybe not!
//is google map bootstrapURLKeys that is there already ok?
//screen is insisting on being taller than i want
// buttons can be styled, why not use those?
//view available cars button not working
//shadow effects on buttons/cars/reservation divs
//max-width on body/app
//pick color scheme
//logo not showing up

//car address?
//add image for user
//add image for car
//small map for each car location on ReserveCar
//add Stripe payment system

import React, { Component } from "react";
import axios from "axios";

import "../css/App.css";
import "../css/hamburger-and-footer-menus.css";
import "../css/inputs-and-buttons.css";
import "../css/cars-and-reviews.css";

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
			signIn: true,
			// user: { name: "Michael Wiebe", id: 1 },
			// viewCarsAndReviews: true,
			user: null,
			viewCarsAndReviews: false,
			carToReview: null,
			reviewToEdit: null,
			reserveCar: false,
			addCar: false,
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
		let addCarBtn;
		let addCar;
		let signInComponent;
		let signUpBtn;
		let signUpComponent;
		let signOutBtn;
		let carsAndReviews;
		let carsAndReviewsBtn;
		let carsAndReviewsStyles;
		let openReviewEditor;
		let startCarReservationBtn;
		let newReservation;
		let userReservationsBtn;
		let userReservations;
		let newReview;
		let googleMap;
		let editUserBtn;
		let editUser;
		let logo;
		let avatar;

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
			logo = "logo logo-sign-in";
			if (this.state.signIn === true) {
				signInComponent = <SignIn signIn={this.signIn} />;
				signUpBtn = <div className="btn btn-sign-up" onClick={this.signUp}>Sign Up</div>;
			}
			if (this.state.signUp === true) {
				signUpComponent = <SignUp createUser={this.createUser} />;
			}
			openReviewEditor = null;
		} else {
			avatar = this.state.user.avatar;
			logo = "logo logo-main";
			hamburgerIcon = (
				<div onClick={this.hamburgerToggle} className=" btn hamburger-show-btn">
					<i className="fa fa-bars" aria-hidden="true" />
				</div>
			);
			editUserBtn = <div className="hamburger-btn" onClick={this.editUser}>Edit User</div>;
			userReservationsBtn = (
				<div className="footer-menu-btn btn-reservations" onClick={this.viewReservations}>
					Reservations
				</div>
			);
			startCarReservationBtn = (
				<div className="footer-menu-btn btn-reserve-car" onClick={this.startReservation}>
					Find a car
				</div>
			);
			carsAndReviewsBtn = (
				<div onClick={this.showCarsAndReviews} className="footer-menu-btn btn-cars">
					Cars
				</div>
			);
			welcomeMsg = <div className="welcome-msg">Welcome {this.state.user.name}!</div>;
			addCarBtn = <div className="hamburger-btn" onClick={this.openAddCar}>Add a car</div>;
			signOutBtn = <div className="hamburger-btn" onClick={this.signOut}>Sign Out</div>;
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
				addCar = <AddCar addCar={this.addCar} />;
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
				carsAndReviewsStyles = "cars-and-reviews";
				carsAndReviews = this.state.cars.map(
					function(car, index) {
						let removeCar;
						let editReviewBtn;

						if (car.owner_id === this.state.user.id) {
							removeCar = (
								<button
									className="value-btn"
									onClick={this.deleteCar}
									value={car.id}
								>
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
											className="value-btn btn-edit-review"
											onClick={this.editReview}
											value={JSON.stringify(review)}
										>
											Edit Review
										</button>
									);
								}
								if (car.id === review.car_id) {
									return (
										<div key={index} className="flex review">
											<div className="review-title">{review.title}</div>
											<div className="review-description">
												{review.description}
											</div>
											<div>
												<div className="review-reviewer-rating">
													{review.rating}
													<i className="fa fa-star" aria-hidden="true" />
													{" "}
													-
													{" " + review.reviewer.name}
												</div>
											</div>
											<div>{editReviewBtn}</div>
										</div>
									);
								}
							}.bind(this)
						);
						return (
							<div key={index} className="flex car-description-reviews">
								<div className="car-make-model">
									{car.year + " " + car.make_model}
								</div>
								<div className="car-description">
									<div className="car-img" />
									<div className="car-mpg" />
									<div className="car-address" />
								</div>
								<div className="car-reviews">
									{reviews}
								</div>
								<div>
									<button
										className="value-btn"
										onClick={this.startReview}
										value={JSON.stringify(car.id)}
									>
										Review this car
									</button>
									{removeCar}
								</div>
							</div>
						);
					}.bind(this)
				);
			}
		}

		console.log(this.state);

		return (
			<div className="App">
				<div>
					<img src="../images/carBuddy.gif" className={logo} alt="carBuddy logo" />
					<div>{welcomeMsg}</div>
					<div>{signInComponent}</div>
					<div>{signUpBtn}</div>
					<div>{signUpComponent}</div>
				</div>
				<div>
					{hamburgerIcon}
					<div className="hamburger">
						<div onClick={this.hamburgerToggle} className="hamburger-close-btn">
							<i className="fa fa-window-close-o" aria-hidden="true" />
						</div>
						<div className="hamburger-content-container">
							<img src={avatar} className="user-avatar" />
							{addCarBtn}
							{editUserBtn}
							{signOutBtn}
						</div>
					</div>
					<div className="content-container">
						{googleMap}
						{addCar}
						{newReview}
						{newReservation}
						<div className={carsAndReviewsStyles}>{carsAndReviews}</div>
						{editUser}
						{userReservations}
						{openReviewEditor}
					</div>
					<div className="footer-menu flex">
						{userReservationsBtn}
						{startCarReservationBtn}
						{carsAndReviewsBtn}
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
		this.hamburgerToggle();
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
				this.setState({
					reviews: response.data,
					reviewToEdit: null,
					carsAndReviews: true
				});
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
		this.setState({ signUp: true, signIn: false });
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
					this.setState({
						user: response.data,
						signUp: false,
						signIn: true,
						viewCarsAndReviews: true
					});
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
		this.hamburgerToggle();
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
		})
			.then(
				function(response) {
					console.log(response);
					return response.json();
				}.bind(this)
			)
			.then(
				function(data) {
					console.log(data);
					this.setState({ user: data, editUser: false, viewCarsAndReviews: true });
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
					if (response.data === "") {
						return;
					} else {
						this.setState({
							user: response.data,
							viewCarsAndReviews: true
						});
					}
				}.bind(this)
			);
	}
	signOut() {
		this.setState({
			user: null,
			signIn: true,
			reviewToEdit: null,
			reserveCar: false,
			carToReview: null,
			viewReservations: false,
			editUser: false
		});
		this.hamburgerToggle();
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
