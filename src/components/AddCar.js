import React, { Component } from "react";

class AddCar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			make_model: "",
			year: "",
			MPG: "",
			price: "",
			lat: "",
			lng: "",
			loading: false
		};
		this.updateYear = this.updateYear.bind(this);
		this.updateMake_Model = this.updateMake_Model.bind(this);
		this.updateMPG = this.updateMPG.bind(this);
		this.updatePrice = this.updatePrice.bind(this);
		this.handleAddCar = this.handleAddCar.bind(this);
		this.showLoadIcon = this.showLoadIcon.bind(this);
	}

	render() {
		let loadIcon;
		if (this.state.loading === true) {
			loadIcon = <i className="fa fa-cog fa-spin fa-3x fa-fw" />;
		}

		console.log(this.state.lng, this.state.lat);
		return (
			<div className="inputs-container">
				<input
					className="input"
					onChange={this.updateMake_Model}
					value={this.state.make_model}
					placeholder="Make and Model"
				/>
				<input
					className="input"
					onChange={this.updateYear}
					value={this.state.year}
					placeholder="Year"
				/>
				<input
					className="input"
					onChange={this.updateMPG}
					value={this.state.MPG}
					placeholder="MPG"
				/>
				<input
					className="input"
					onChange={this.updatePrice}
					value={this.state.price}
					placeholder="Price"
				/>
				<form action="" encType="multipart/form-data">
					<div>Upload a photo:</div>
					<input className="input" type="file" name="picture" defaultValue="fileName" />
				</form>
				<br />
				<div className="btn" onClick={this.handleAddCar}>Add Car</div>
				<div>{loadIcon}</div>
			</div>
		);
	}
	handleAddCar() {
		this.showLoadIcon();
		navigator.geolocation.getCurrentPosition(
			function(position) {
				this.setState(
					{
						lat: position.coords.latitude,
						lng: position.coords.longitude
					},
					function() {
						this.props.addCar(this.state);
						this.setState({
							make_model: "",
							year: "",
							MPG: "",
							price: "",
							lat: "",
							lng: ""
						});
					}.bind(this)
				);
			}.bind(this)
		);
	}
	showLoadIcon() {
		this.setState({ loading: true });
	}
	updateMake_Model(event) {
		this.setState({ make_model: event.target.value });
	}
	updateYear(event) {
		this.setState({ year: event.target.value });
	}
	updateMPG(event) {
		this.setState({ MPG: event.target.value });
	}
	updatePrice(event) {
		this.setState({ price: event.target.value });
	}
}

export default AddCar;
