import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Card } from './common';

class CarList extends Component {

	render(){

		// contentContainerClasses = "content-container cars-and-reviews-container";
		var carAvatar;
		// carListBtn = "";
		var carListStyles = "cars-and-reviews";
		var carList = this.props.cars.map(
			function(car, index) {
				let removeCar;
				let editReviewBtn;
				carAvatar = car.avatar_url;

				if (car.owner_id === this.props.user.id) {
					removeCar = (
						<button className="btn value-btn" onClick={this.deleteCar} value={car.id}>
							Remove Car
						</button>
					);
				}
				let reviews = this.props.reviews.map(
					function(review, index) {
						editReviewBtn = "";
						if (review.reviewer.id === this.props.user.id) {
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
									<div className="review-description">{review.description}</div>
									<div className="review-reviewer-rating">
										{review.rating}
										<i className="fa fa-star" aria-hidden="true" /> -
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
						<div className="car-make-model">{car.make_model}</div>
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
		return <div className={carListStyles}>{carList}</div>
	}

}

const mapStateToProps = state => {
	const user = state.auth.user
	const cars = _.map(state.cars, (val, uid) => {
		return { ...val, uid };
	})
}

export default connect(mapStateToProps, {})(CarList);