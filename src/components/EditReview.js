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
					className="input input-select"
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
				<div className="btn btn-make-review" onClick={this.handleUpdateReview}>
					Update Review
				</div>
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
