import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
	reviewTitleChanged, 
	reviewDescriptionChanged, 
	reviewRatingChanged
} from '../actions';

class FormReview extends Component {
	render(){
		const { title, description, rating } = this.props;
		return(
			<div className="inputs-container">
				<input
					className="input"
					type="text"
					onChange={event => this.props.reviewTitleChanged(event.target.value)}
					placeholder="Title"
					value={ title }
					
				/>
				<input
					className="input"
					type="textarea"
					onChange={event => this.props.reviewDescriptionChanged(event.target.value)}
					placeholder="Description"
					value={ description }
				/>
				<select
					className="input"
					type="integer"
					onChange={event => this.props.reviewRatingChanged(event.target.value)}
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
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	const { title, description, rating } = state.FormReview;
	return { title, description, rating };
}

export default connect(mapStateToProps, { 
	reviewTitleChanged, 
	reviewDescriptionChanged, 
	reviewRatingChanged 
})(FormReview);