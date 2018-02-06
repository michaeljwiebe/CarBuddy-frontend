import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { reviewsFetch, carsFetch } from '../actions';
// import { Card } from './common';

class CarList extends Component {
	render(){
		// contentContainerClasses = "content-container cars-and-reviews-container";
		var carAvatar;
		// carListBtn = "";
		var carListStyles = "cars-and-reviews";
		var carList = this.props.cars.map(
			function(car) {
				let removeCar;
				let editReviewBtn;
				carAvatar = car.avatar_url;

				if (car.ownerId === this.props.user.uid) {
					removeCar = (
						<button 
							className="btn value-btn" 
							onClick={this.deleteCar} 
							value={car.uid}
						>
							Remove Car
						</button>
					);
				}
				let reviews = this.props.reviews.map(
					function(review) {
						editReviewBtn = "";
						if (review.userId === this.props.user.uid) {
							editReviewBtn = (
								<button
									className="btn value-btn btn-edit-review"
									onClick={this.props.editReview}
									value={JSON.stringify(review)}
								>
									Edit Review
								</button>
							);
						}
						if (car.uid === review.carId) {
							return (
								<div key={review.uid} className="flex review">
									<div className="review-title">{review.title}</div>
									<div className="review-description">{review.description}</div>
									<div className="review-reviewer-rating">
										{review.rating}
										<i className="fa fa-star" aria-hidden="true" /> -
										{" " + review.username}
										{editReviewBtn}
									</div>
								</div>
							);
						}
					}.bind(this)
				);

				return (
					<div key={car.uid} className="flex car-description-reviews">
						<div className="car-make-model">{car.makeModel}</div>
						<div className="car-description">
							<img src={carAvatar} className="car-img-small" alt="car" />
							<div>Year: {car.year}</div>
							<div>MPG: {car.mpg}</div>
							<div>Cost per day: ${car.price}</div>
						</div>
						<div className="car-reviews">{reviews}</div>
						<div>
							<button
								className="btn value-btn"
								onClick={this.props.newReview}
								value={JSON.stringify(car.uid)}
							>
								Review this car
							</button>
							{removeCar}
						</div>
					</div>
				);
			}.bind(this)
		);
		return <div className={carListStyles}>{carList}</div>
	}

	deleteCar(event){
		console.log('car uid',event.target.value)
		firebase.database().ref(`cars/${event.target.value}`).set(null)
	}

	componentWillMount(){
		this.props.reviewsFetch();
	}

}

const mapStateToProps = state => {
	console.log("carlist state", state)
	const user = state.auth.user;
	const reviews = _.map(state.reviews, (val, uid) =>{
		return { ...val, uid };
	})
	return { user, reviews };
}

export default connect(mapStateToProps, {carsFetch, reviewsFetch})(CarList);