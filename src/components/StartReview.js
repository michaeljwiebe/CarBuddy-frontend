import React, { Component } from "react";

class StartReview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			description: "",
			rating: "",
			car_id: props.carToReview.id
		};
		this.updateTitle = this.updateTitle.bind(this);
		this.updateDescription = this.updateDescription.bind(this);
		this.updateRating = this.updateRating.bind(this);
		this.handleMakeReview = this.handleMakeReview.bind(this);
	}
	render() {
		console.log(this.props);
		console.log(this.state);
		return (
			<div>
				<input
					type="text"
					onChange={this.updateTitle}
					placeholder="Title"
					value={this.state.title}
				/>
				<input
					type="textarea"
					onChange={this.updateDescription}
					placeholder="Description"
					value={this.state.description}
				/>
				<input
					type="integer"
					onChange={this.updateRating}
					placeholder="Rating"
					value={this.state.rating}
				/>
				<button onClick={this.handleMakeReview}>Post Review</button>
			</div>
		);
	}
	handleMakeReview() {
		this.props.makeReview(this.state);
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
}

export default StartReview;
