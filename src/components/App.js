//remove console logs?
//problems with urls, can't add car or edit review localhost...?

//XMLHttpRequest cannot load //https://carbuddy.herokuapp.com/reviews/8?title=Not+worth+it&description=Expensive+and+guzzles+gas!+Maybe+that%27s+what+you%27re+into+though.&rating=3.
//Method PATCH is not allowed by Access-Control-Allow-Methods in preflight response.

//moved
//trans skills in PI to healthcare
//reflect, start in tech because it is transforming world
//community - building relationships, connecting people
//economy - using resources wisely, supporting local people
//avid cyclist, beautifully connect community and economy
//fully featured one page react web app with rails backend currently hosted on heroku and AWS
//purpose to make it easier for people to give up car
//keep money locally, facilitate better use of resources, and build community
//incorporates paperclip gem for attaching images, google maps, 4 database tables, 10 components, and 16 API calls
//When buttons are clicked, App's state changes and 'if' statements in the render function direct a different component to be displayed without changing the route.
//blood, sweat, tears, and hundreds of milligrams of caffeinne
//-----START VIDEO

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
			userImage: null,
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
		this.modifyURL = this.modifyURL.bind(this);
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
		let hamburger;
		let welcomeMsg;
		let addCarBtn;
		let addCar;
		let signInComponent;
		let signUpBtn;
		let signUpComponent;
		let signOutBtn;
		let contentContainerClasses;
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
			userAvatar = null;
			if (this.state.signIn === true) {
				signUpBtn = <div className="btn btn-sign-up" onClick={this.signUp}>Sign Up</div>;
				signInComponent = <div><SignIn signIn={this.signIn} /> {signUpBtn} </div>;
			}
			if (this.state.signUp === true) {
				signUpComponent = <SignUp createUser={this.createUser} />;
			}
			openReviewEditor = null;
		} else {
			userAvatar = this.state.userImage;
			logoText = "logo logo-main-text";
			logoImage = "logo logo-main-image";
			logoContainer = "logo logo-main-container";
			hamburgerIcon = (
				<div onClick={this.hamburgerToggle} className=" btn hamburger-show-btn">
					<i className="fa fa-bars" aria-hidden="true" />
				</div>
			);
			addCarBtn = <div className="hamburger-btn" onClick={this.openAddCar}>Add a car</div>;
			editUserBtn = <div className="hamburger-btn" onClick={this.editUser}>Edit User</div>;
			signOutBtn = <div className="hamburger-btn" onClick={this.signOut}>Sign Out</div>;
			hamburger = (
				<div className="hamburger flex">
					<img src={userAvatar} className="user-avatar" alt="user" />
					<div className="hamburger-btns-container">
						{addCarBtn}
						{editUserBtn}
						{signOutBtn}
					</div>
					<div onClick={this.hamburgerToggle} className="hamburger-close-btn">
						<i className="fa fa-window-close-o" aria-hidden="true" />
					</div>
				</div>
			);
			userReservationsBtn = (
				<div
					className="btn footer-menu-btn btn-reservations"
					onClick={this.viewReservations}
				>
					Reservations
				</div>
			);
			startCarReservationBtn = (
				<div className="btn footer-menu-btn btn-find-car" onClick={this.startReservation}>
					Find a car
				</div>
			);
			carsAndReviewsBtn = (
				<div onClick={this.showCarsAndReviews} className="btn footer-menu-btn btn-cars">
					Cars
				</div>
			);
			welcomeMsg = <div className="welcome-msg">Welcome {this.state.user.name}!</div>;
			footer = (
				<div className="footer-menu flex">
					{userReservationsBtn}
					{startCarReservationBtn}
					{carsAndReviewsBtn}
				</div>
			);

			if (this.state.editUser || this.state.addCar || this.state.carToReview) {
				contentContainerClasses = "content-container";
			}
			if (this.state.viewReservations || this.state.reserveCar) {
				contentContainerClasses = "content-container reservations-and-reserve-container";
			}
			if (this.state.viewCarsAndReviews) {
				contentContainerClasses = "content-container cars-and-reviews-container";
			}
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
						userId={this.state.user.id}
						cars={this.state.cars}
					/>
				);
			}
			if (this.state.viewCarsAndReviews === true) {
				let bigMap = {
					position: "relative",
					width: "100%",
					maxWidth: "500px",
					height: "20vh",
					margin: "0 auto",
					top: "98px",
					zIndex: "3",
					borderBottom: "1px solid black",
					borderTop: "1px solid black"
				};
				let bigMapZoom = 12;
				googleMap = (
					<GoogleMap
						styles={bigMap}
						zoom={bigMapZoom}
						cars={this.state.cars}
						lat={39.9524}
						lng={-75.1636}
					/>
				);
				carsAndReviewsStyles = "cars-and-reviews";
				carsAndReviews = this.state.cars.map(
					function(car, index) {
						let removeCar;
						let editReviewBtn;
						carAvatar = car.avatar_url;

						if (car.owner_id === this.state.user.id) {
							removeCar = (
								<button
									className="btn value-btn"
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
											className="btn value-btn btn-edit-review"
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
									{car.make_model}
								</div>
								<div className="car-description">
									<img src={carAvatar} className="car-img-small" alt="car" />
									<div>Year: {car.year}</div>
									<div>MPG: {car.mpg}</div>
									<div>Cost per day: ${car.price}</div>
								</div>
								<div className="car-reviews">
									{reviews}
								</div>
								<div>
									<button
										className="btn value-btn"
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
					<div className="header">
						<div className={logoContainer}>
							<div className={logoImage}>
								<i className="fa fa-car" aria-hidden="true" />
							</div>
							<div className={logoText}>carBuddy</div>
						</div>
						{hamburgerIcon}
					</div>
					{welcomeMsg}
					<div className="signinup-container">
						{signInComponent}
					</div>
					<div>{signUpComponent}</div>
				</div>
				{hamburger}
				<div>
					<div className={contentContainerClasses}>
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
			.post("https://carbuddy.herokuapp.com/cars", {
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
					this.loadCars();
					this.setState({
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

		fetch("https://carbuddy.herokuapp.com/cars/image", {
			method: "POST",
			body: data
		})
			.then(function(response) {
				return response.json();
			})
			.then(
				function(data) {
					this.loadCars();
				}.bind(this)
			);
	}

	modifyArrayURLs(array) {
		array.forEach(
			function(car) {
				car.avatar_url = this.modifyURL(car.avatar_url);
				return car;
			}.bind(this)
		);
	}

	deleteCar(event) {
		axios({
			method: "delete",
			url: "https://carbuddy.herokuapp.com/cars/" + event.target.value
		}).then(
			function(response) {
				this.loadCars();
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
			url: "https://carbuddy.herokuapp.com/reviews/" + props.id,
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
					viewCarsAndReviews: true
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
			.post("https://carbuddy.herokuapp.com/reviews", {
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
			.post("https://carbuddy.herokuapp.com/reservations", {
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
			.post("https://carbuddy.herokuapp.com/users", {
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
		axios({
			method: "delete",
			url: "https://carbuddy.herokuapp.com/users/" + this.state.user.id
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
			url: "https://carbuddy.herokuapp.com/users/" + this.state.user.id,
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
			url = "https://carbuddy.herokuapp.com/users/update_image/" + userInfo.id;
		} else {
			url = "https://carbuddy.herokuapp.com/users/upload_image";
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
				return response.json();
			})
			.then(
				function(data) {
					let imageURL = data.avatar_url.split("");
					let secondHalfUrl = imageURL.splice(32);
					secondHalfUrl.splice(0, 0, "http://carbuddy.s3.amazonaws.com");
					let returningImageURL = secondHalfUrl.join("");

					this.setState({
						userImage: returningImageURL,
						editUser: false,
						viewCarsAndReviews: true
					});
				}.bind(this)
			);
	}
	modifyURL(url) {
		let imageURL = url.split("");
		let secondHalfUrl = imageURL.splice(32);
		secondHalfUrl.splice(0, 0, "http://carbuddy.s3.amazonaws.com");
		let returningImageURL = secondHalfUrl.join("");
		return returningImageURL;
	}

	signIn(props) {
		axios
			.post("https://carbuddy.herokuapp.com/sign_in", {
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
						let userImage = this.modifyURL(response.data.avatar_url);
						this.setState({
							user: response.data,
							userImage: userImage,
							viewCarsAndReviews: true
						});
					}
				}.bind(this)
			);
	}
	signOut() {
		this.hamburgerToggle();
		this.setState({
			user: null,
			signIn: true,
			reviewToEdit: null,
			reserveCar: false,
			carToReview: null,
			viewReservations: false,
			editUser: false
		});
	}
	loadCars() {
		axios.get("https://carbuddy.herokuapp.com/cars").then(
			function(response) {
				response.data.forEach(
					function(car) {
						car.avatar_url = this.modifyURL(car.avatar_url);
					}.bind(this)
				);
				this.setState({ cars: response.data });
			}.bind(this)
		);
	}
	loadReviews() {
		axios.get("https://carbuddy.herokuapp.com/reviews").then(
			function(response) {
				this.setState({
					reviews: response.data
				});
			}.bind(this)
		);
	}
	loadReservations() {
		axios.get("https://carbuddy.herokuapp.com/reservations").then(
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
