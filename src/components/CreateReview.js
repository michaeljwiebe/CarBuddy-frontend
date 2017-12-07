import React, { Component } from "react";
import { connect } from 'react-redux';

import ReviewForm from './ReviewForm';
import { reviewCreated } from '../actions';

class CreateReview extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		title: '',
	// 		description:'',
	// 		rating: ''
	// 	};
	// 	this.updateTitle = this.updateTitle.bind(this);
	// 	this.updateDescription = this.updateDescription.bind(this);
	// 	this.updateRating = this.updateRating.bind(this);
	// }
	render() {
		console.log(this.props)
		return (
			<div className="inputs-container">
				<ReviewForm 
					title=''
					description=''
					rating=''
				/>
				<div className="btn btn-make-review" onClick={this.createReview.bind(this)}>
					Save Review
				</div>
			</div>
		);
	}

	createReview() {
		const { title, description, rating, carToReview } = this.props;
		console.log(title, description, rating, carToReview);
		this.props.reviewCreated({ title, description, rating, carId: carToReview });
		this.props.resetView();
	}

	// updateTitle(value) {
	// 	this.setState({ title: value });
	// }

	// updateDescription(value) {
	// 	this.setState({ description: value });
	// }

	// updateRating(value) {
	// 	this.setState({ rating: value });
	// }
}

const mapStateToProps = ( state ) => {
	const { title, description, rating } = state.reviewForm;
	return { title, description, rating };
}

export default connect(mapStateToProps, { reviewCreated })(CreateReview);
