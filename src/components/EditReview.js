import React, { Component } from "react";

class EditReview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: props.reviewToEdit.title,
			description: props.reviewToEdit.description,
			rating: props.reviewToEdit.rating,
			id: props.reviewToEdit.id
		};
		this.handleUpdateReview = this.handleUpdateReview.bind(this);
		this.updateTitle = this.updateTitle.bind(this);
		this.updateDescription = this.updateDescription.bind(this);
		this.updateRating = this.updateRating.bind(this);
	}
	render() {
		return (
			<div>
				<input onChange={this.updateTitle} value={this.state.title} />
				<input onChange={this.updateDescription} value={this.state.description} />
				<input onChange={this.updateRating} value={this.state.rating} />
				<div onClick={this.handleUpdateReview}>Update Review</div>
			</div>
		);
	}
	handleUpdateReview() {
		this.props.updateReview(this.state);
	}
	updateTitle(event) {
		this.setState({ title: event.target.value });
	}
	updateDescription(event) {
		this.setState({ description: event.target.value });
	}
	updateRating(event) {
		this.setState({ rating: event.target.value });
	}
	componentWillReceiveProps(newProps) {
		this.setState({
			title: newProps.reviewToEdit.title,
			description: newProps.reviewToEdit.description,
			rating: newProps.reviewToEdit.rating,
			id: newProps.reviewToEdit.id
		});
	}
}
export default EditReview;
