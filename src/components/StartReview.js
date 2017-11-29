import React, { Component } from "react";
import { connect } from 'react-redux';

import { 
	reviewTitleChanged, 
	reviewDescriptionChanged, 
	reviewRatingChanged,
	reviewCreated,
	reviewsFetch
} from '../actions';

//Its really nice to have these small components that handle simple functions such as this one. My ability to focus and close in on the problem becomes so much greater using this method of increasing modularity. Though with many of these components, writing them was simple enough that I didn't end up having very many issues to deal with at all. I'd call that a win!


class StartReview extends Component {

	componentWillMount(){
		this.props.reviewsFetch();
	}

	render() {
		const { reviewTitleChanged, reviewDescriptionChanged, reviewRatingChanged } = this.props;
		const { title, description, rating } = this.props;
		return (
			<div className="inputs-container">
				<input
					className="input"
					type="text"
					onChange={event => reviewTitleChanged(event.target.value)}
					placeholder="Title"
					value={ title }
				/>
				<input
					className="input"
					type="textarea"
					onChange={event => reviewDescriptionChanged(event.target.value)}
					placeholder="Description"
					value={ description }
				/>
				<select
					className="input"
					type="integer"
					onChange={event => reviewRatingChanged(event.target.value)}
					placeholder="Rating"
					value={ rating }
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
				<div className="btn btn-make-review" onClick={this.createReview.bind(this)}>
					Post Review
				</div>
			</div>
		);
	}
	createReview() {
		const { title, description, rating, carToReview } = this.props;
		this.props.reviewCreated({title, description, rating, carId: carToReview.uid});
	}

}

const mapStateToProps = ({ reviewForm }) => {
	const { title = '', description = '', rating = '' } = reviewForm;
	return { title, description, rating };
}

export default connect(mapStateToProps, { 
	reviewTitleChanged, 
	reviewDescriptionChanged, 
	reviewRatingChanged,
	reviewCreated,
	reviewsFetch
})(StartReview);
