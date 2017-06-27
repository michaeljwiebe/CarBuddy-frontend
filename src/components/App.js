//AWS for group project -- maybe not!
//screen is insisting on being taller than i want
//buttons can be styled, why not use those?
//shadow effects on buttons/cars/reservation divs
//max-width on body/app -- how do phone browsers work with varying pixel densities?
//move signup button below inputs
//map won't shrink with page
//sign in error message

//after reserve car, jump to my reservations page
//add cost to my reservations
//car address?
//small map for each car location on ReserveCar
//add Stripe payment system

import React, { Component } from "react";
import axios from "axios";

import "../css/App.css";
import "../css/hamburger-menu.css";
import "../css/inputs-and-buttons.css";
import "../css/cars-and-reviews.css";
import "../css/footer.css";

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
		this.uploadUserImage = this.uploadUserImage.bind(this);
		this.uploadCarImage = this.uploadCarImage.bind(this);
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
		this.loadCars = this.loadCars.bind(this);
		this.loadReviews = this.loadReviews.bind(this);
		this.loadReservations = this.loadReservations.bind(this);
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
		let logoText;
		let logoImage;
		let logoContainer;
		let userAvatar;
		let carAvatar;
		let footer;

		if (this.state.reserveCar === true) {
			newReservation = (
				<StartReservation
					makeReservation={this.makeReservation}
					reservations={this.state.reservations}
					cars={this.state.cars}
					inputs={true}
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
			logoText = "logo logo-sign-in-text";
			logoImage = "logo logo-sign-in-image";
			if (this.state.signIn === true) {
				signInComponent = <SignIn signIn={this.signIn} />;
				signUpBtn = <div className="btn btn-sign-up" onClick={this.signUp}>Sign Up</div>;
			}
			if (this.state.signUp === true) {
				signUpComponent = <SignUp createUser={this.createUser} />;
			}
			openReviewEditor = null;
		} else {
			userAvatar = this.state.user.avatar;
			logoText = "logo logo-main-text";
			logoImage = "logo logo-main-image";
			logoContainer = "logo logo-main-container";
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
				<div className="footer-menu-btn btn-find-car" onClick={this.startReservation}>
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
			footer = (
				<div className="footer-menu flex">
					{userReservationsBtn}
					{startCarReservationBtn}
					{carsAndReviewsBtn}
				</div>
			);
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
						carAvatar = car.avatar;

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
											<div className="review-reviewer-rating">
												{review.rating}
												<i className="fa fa-star" aria-hidden="true" />
												{" "}
												-
												{" " + review.reviewer.name}
												{editReviewBtn}
											</div>
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
									<img src={carAvatar} className="car-img-small" alt="car" />
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
					<div className={logoContainer}>
						<div className={logoImage}>
							<i className="fa fa-car" aria-hidden="true" />
						</div>
						<div className={logoText}>carBuddy</div>
					</div>
					<div>{welcomeMsg}</div>
					<div>
						{signInComponent}
						{signUpBtn}
					</div>
					<div>{signUpComponent}</div>
				</div>
				<div>
					{hamburgerIcon}
					<div className="hamburger">
						<div onClick={this.hamburgerToggle} className="hamburger-close-btn">
							<i className="fa fa-window-close-o" aria-hidden="true" />
						</div>
						<div className="hamburger-content-container">
							<img src={userAvatar} className="user-avatar" alt="user" />
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
					{footer}
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
					this.uploadCarImage();
					this.setState({
						cars: response.data,
						addCar: false,
						viewCarsAndReviews: true
					});
				}.bind(this)
			);
	}

	uploadCarImage() {
		var data = new FormData();
		var imagedata = document.querySelector('input[type="file"]').files[0];

		if (imagedata === undefined) {
			return;
		}

		data.append("data", imagedata);

		fetch("/cars/image", {
			method: "POST",
			body: data
		})
			.then(function(response) {
				console.log(response);
				return response.json();
			})
			.then(
				function(data) {
					console.log(data);
					this.loadCars();
					// this.setState({ user: data, editUser: false, viewCarsAndReviews: true });
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
					this.setState({
						reservations: response.data,
						viewCarsAndReviews: false,
						carToReview: null,
						reviewToEdit: null,
						reserveCar: false,
						addCar: false,
						viewReservations: true,
						editUser: false
					});
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
					this.uploadUserImage({ method: "upload" });
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
				this.uploadUserImage({ method: "update", id: this.state.user.id });
			}.bind(this)
		);
	}

	uploadUserImage(userInfo) {
		let url;
		if (userInfo.method === "update") {
			url = "/users/update_image/" + userInfo.id;
		} else {
			url = "/users/upload_image";
		}
		var data = new FormData();
		var imagedata = document.querySelector('input[type="file"]').files[0];

		if (imagedata === undefined) {
			return;
		}

		data.append("data", imagedata);

		fetch(url, {
			method: "POST",
			body: data
		})
			.then(function(response) {
				console.log(response);
				return response.json();
			})
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
	loadCars() {
		axios.get("/cars").then(
			function(response) {
				this.setState({ cars: response.data });
			}.bind(this)
		);
	}
	loadReviews() {
		axios.get("/reviews").then(
			function(response) {
				this.setState({
					reviews: response.data
				});
			}.bind(this)
		);
	}
	loadReservations() {
		axios.get("/reservations").then(
			function(response) {
				this.setState({ reservations: response.data });
			}.bind(this)
		);
	}
	componentWillMount() {
		this.loadCars();
		this.loadReviews();
		this.loadReservations();
	}
}

export default App;
