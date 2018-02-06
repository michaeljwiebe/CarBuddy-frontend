import React, { Component } from "react";
import { connect } from 'react-redux';

import FormReview from './FormReview';
import { reviewCreated, reviewInitialized } from '../actions';

class CreateReview extends Component {
	componentWillMount(){
		this.props.reviewInitialized();
	}
	render() {
		return (
			<div className="inputs-container">
				<FormReview 
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
		this.props.reviewCreated({ title, description, rating, carId: carToReview });
		this.props.resetView();
	}
}

const mapStateToProps = ( state ) => {
	const { title, description, rating } = state.reviewForm;
	return { title, description, rating };
}

export default connect(mapStateToProps, { reviewCreated, reviewInitialized })(CreateReview);
