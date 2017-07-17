import React, { Component } from "react";

//Its really nice to have these small components that handle simple functions such as this one. My ability to focus and close in on the problem becomes so much greater using this method of increasing modularity. Though with many of these components, writing them was simple enough that I didn't end up having very many issues to deal with at all. I'd call that a win!

class StartReview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			description: "",
			rating: "",
			car_id: props.carToReview
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
			<div className="inputs-container">
				<input
					className="input"
					type="text"
					onChange={this.updateTitle}
					placeholder="Title"
					value={this.state.title}
				/>
				<input
					className="input"
					type="textarea"
					onChange={this.updateDescription}
					placeholder="Description"
					value={this.state.description}
				/>
				<select
					className="input"
					type="integer"
					onChange={this.updateRating}
					placeholder="Rating"
					value={this.state.rating}
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
				<div className="btn btn-make-review" onClick={this.handleMakeReview}>
					Post Review
				</div>
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
