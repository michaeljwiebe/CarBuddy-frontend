import React, { Component } from "react";
import _ from 'lodash';
import { connect } from 'react-redux';

import ReviewForm from './ReviewForm';
import { 
	reviewTitleChanged, 
	reviewDescriptionChanged, 
	reviewRatingChanged,
	reviewSaveChanges,
	reviewDeleted
} from '../actions';

//Its really nice to have these small components that handle simple functions such as this one. My ability to focus and close in on the problem becomes so much greater using this method of increasing modularity. Though with many of these components, writing them was simple enough that I didn't end up having very many issues to deal with at all. I'd call that a win!

class EditReview extends Component {

	constructor(props){
		super(props);
		console.log('props', props)
		const { title, description, rating } = this.props.reviewToEdit;
		this.state = {
			title,
			description,
			rating
		}
		this.updateTitle = this.updateTitle.bind(this);
		this.updateDescription = this.updateDescription.bind(this);
		this.updateRating = this.updateRating.bind(this);
	}

	componentWillMount(){
		// _.each(this.props.reviewToEdit, (value, prop) => this.props.reviewFieldUpdate({ prop, value }))
		this.props.reviewRatingChanged(this.state.rating);
		this.props.reviewTitleChanged(this.state.title);
		this.props.reviewDescriptionChanged(this.state.description);
	}

	// componentWillReceiveProps(nextProps){
	// 	let title, description, rating, carId, uid, username, userId;
	// 	if (nextProps.reviewToEdit !== null){
	// 		var selectedReview = nextProps.reviewsDb.filter(review => { //this was causing a loop when set to this.state
	// 			return review.uid === nextProps.reviewToEdit.uid
	// 		})
	// 		this.setState({
	// 			title: selectedReview[0].title,
	// 			description: selectedReview[0].description,
	// 			rating: selectedReview[0].rating,
	// 			carId: selectedReview[0].carId,
	// 			uid: selectedReview[0].uid,
	// 			username: selectedReview[0].username,
	// 			userId: selectedReview[0].userId
	// 		})
	// 		console.log('selectedReview', selectedReview)
	// 	}
	// 	console.log(title, description, rating);
	// }



	render() {
		console.log('EditReview props',  this.props);
		console.log('EditReview state',  this.state);
		const { 
			reviewToEdit
		} = this.props;
		// const {
		// 	title,
		// 	description,
		// 	rating
		// } = this.state;
		
		//find the specific review to edit if it exists
		// let title, description, rating, carId, uid, username, userId;
		// if (reviewToEdit !== null){
		// 	var selectedReview = this.props.reviewsDb.filter(review => { //this was causing a loop when set to this.state
		// 		return review.uid === reviewToEdit.uid
		// 	})
		// 	title = selectedReview[0].title;
		// 	description = selectedReview[0].description;
		// 	rating = selectedReview[0].rating;
		// 	carId = selectedReview[0].carId;
		// 	uid = selectedReview[0].uid;
		// 	username = selectedReview[0].username;
		// 	userId = selectedReview[0].userId;
		// 	console.log('selectedReview', selectedReview)
		// } else {
		// 	title = this.props.title;
		// 	description = this.props.description;
		// 	rating = this.props.rating;
		// }
		// console.log(title, description, rating);

		return (
			<div className="inputs-container">
				<ReviewForm 
					{...this.state}
				/>
				<button 
					className="btn btn-make-review" 
					onClick={this.updateReview.bind(this)}
				>
					Save Review
				</button>
				<button
					className="btn btn-make-review"
					onClick={event => {
						this.props.reviewDeleted(event.target.value)
						this.props.resetView()
					}}	
					value={this.props.reviewToEdit.uid}
				>
					Delete Review
				</button>
			</div>
		);
	}
	updateReview () {
		const { title, description, rating } = this.props;
		const { uid, username, userId, carId } = this.props.reviewToEdit;
		console.log('editReview props', this.props)
		this.props.reviewSaveChanges(carId, description, rating, uid, title, userId, username);
		this.props.resetView();
	}

	updateTitle(value) {
		this.setState({ title: value });
	}

	updateDescription(value) {
		this.setState({ description: value });
	}

	updateRating(value) {
		this.setState({ rating: value });
	}

}

const mapStateToProps = ({ reviewForm, reviews }) => {
	const { title = '', description = '', rating = '' } = reviewForm;
	return { title, description, rating };
}

export default connect(mapStateToProps, { 
	reviewTitleChanged, 
	reviewDescriptionChanged, 
	reviewRatingChanged,
	reviewSaveChanges,
	reviewDeleted
})(EditReview);
