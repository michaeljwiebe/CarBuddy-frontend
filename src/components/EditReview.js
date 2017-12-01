import React, { Component } from "react";
import _ from 'lodash';
import { connect } from 'react-redux';

import { 
	reviewTitleChanged, 
	reviewDescriptionChanged, 
	reviewRatingChanged,
	reviewCreated,
	reviewsFetch,
	reviewUpdated
} from '../actions';

//Its really nice to have these small components that handle simple functions such as this one. My ability to focus and close in on the problem becomes so much greater using this method of increasing modularity. Though with many of these components, writing them was simple enough that I didn't end up having very many issues to deal with at all. I'd call that a win!

class EditReview extends Component {

	constructor(props){
		super(props);
		console.log('props' ,props)
		this.state = {
			reviews: this.props.reviewsDb,
			title: '',
			description: '',
			rating: '',
			carId: '',
			uid: '',
			username: '',
			userId: ''
		}
	}

	componentWillMount(){
		this.props.reviewsFetch();
	}

	componentWillReceiveProps(nextProps){
		let title, description, rating, carId, uid, username, userId;
		if (nextProps.reviewToEdit !== null){
			var selectedReview = nextProps.reviewsDb.filter(review => { //this was causing a loop when set to this.state
				return review.uid === nextProps.reviewToEdit.uid
			})
			this.setState({
				title: selectedReview[0].title,
				description: selectedReview[0].description,
				rating: selectedReview[0].rating,
				carId: selectedReview[0].carId,
				uid: selectedReview[0].uid,
				username: selectedReview[0].username,
				userId: selectedReview[0].userId
			})
			console.log('selectedReview', selectedReview)
		}
		console.log(title, description, rating);
	}



	render() {
		console.log('EditReview props',  this.props);
		console.log('EditReview state',  this.state);
		const { 
			reviewTitleChanged, 
			reviewDescriptionChanged, 
			reviewRatingChanged,
			reviewToEdit
		} = this.props;
		const {
			title,
			description,
			rating
		} = this.state;
		
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
				<input
					className="input"
					type="text"
					onChange={event => reviewTitleChanged(event.target.value)}
					placeholder="Title"
					value={ this.props.title || title }
				/>
				<input
					className="input"
					type="textarea"
					onChange={event => reviewDescriptionChanged(event.target.value)}
					placeholder="Description"
					value={ this.props.description || description }
				/>
				<select
					className="input"
					type="integer"
					onChange={event => reviewRatingChanged(event.target.value)}
					placeholder="Rating"
					value={ this.props.rating || rating }
				>
					<option value="">Click here to select a rating</option>
					<option value="5">5 Stars</option>
					<option value="4">4 Stars</option>
					<option value="3">3 Stars</option>
					<option value="2">2 Stars</option>
					<option value="1">1 Stars</option>
					<option value="0">0 Stars</option>
				</select>
				<br />
				<button 
					className="btn btn-make-review" 
					onClick={this.createReview.bind(this)}
					value={reviewToEdit }
				>
					Post Review
				</button>
			</div>
		);
	}
	createReview(event) {
		const reviewId = event.target.value.uid;
		console.log('reviewID', reviewId)
		const { title, description, rating, carToReview, reviewToEdit } = this.props;
		if (carToReview !== null){
			this.props.reviewCreated({title, description, rating, carId: carToReview});
		} else if (reviewToEdit !== null) {
			this.props.reviewUpdated({title, description, rating, reviewId})
		}
		this.props.updateReview();
	}

	componentWillMount(){
		this.props.reviewsFetch();
	}

}

const mapStateToProps = ({ reviewForm, reviews }) => {
	const { title = '', description = '', rating = '' } = reviewForm;
	const reviewsDb = _.map(reviews, (val, uid) => {
		return { ...val, uid };
	})
	return { title, description, rating, reviewsDb };
}

export default connect(mapStateToProps, { 
	reviewTitleChanged, 
	reviewDescriptionChanged, 
	reviewRatingChanged,
	reviewCreated,
	reviewsFetch,
	reviewUpdated
})(EditReview);
