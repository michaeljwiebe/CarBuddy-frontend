import React, { Component } from "react";
import { connect } from 'react-redux';

import { 
	carCreated, 
	carMakeModelChanged, 
	carYearChanged, 
	carPriceChanged, 
	carMileageChanged 
} from '../actions';

class AddCar extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		make_model: "",
	// 		year: "",
	// 		mpg: "",
	// 		price: "",
	// 		lat: props.lat,
	// 		lng: props.lng,
	// 		loading: false
	// 	};
	// 	this.updateYear = this.updateYear.bind(this);
	// 	this.updateMake_Model = this.updateMake_Model.bind(this);
	// 	this.updateMPG = this.updateMPG.bind(this);
	// 	this.updatePrice = this.updatePrice.bind(this);
	// 	this.handleAddCar = this.handleAddCar.bind(this);
	// 	this.showLoadIcon = this.showLoadIcon.bind(this);
	// }

	render() {
		const { 
			carCreated, 
			carMakeModelChanged, 
			carYearChanged, 
			carPriceChanged, 
			carMileageChanged 
		} = this.props;

		const { 
			makeModel,
			price,
			year,
			mileage
		} = this.props;

		// let loadIcon;
		// if (this.state.loading === true) {
		// 	loadIcon = <i className="fa fa-cog fa-spin fa-3x fa-fw" />;
		// }

		// console.log(this.state.lng, this.state.lat);
		return (
			<div className="inputs-container">
				<input
					className="input"
					onChange={event => carMakeModelChanged(event.target.value)}
					value={makeModel}
					placeholder="Make and Model"
				/>
				<input
					className="input"
					onChange={event => carYearChanged(event.target.value)}
					value={year}
					placeholder="Year"
				/>
				<input
					className="input"
					onChange={event => carMileageChanged(event.target.value)}
					value={mileage}
					placeholder="MPG"
				/>
				<input
					className="input"
					onChange={event => carPriceChanged(event.target.value)}
					value={price}
					placeholder="Price"
				/>
				<form action="" encType="multipart/form-data">
					<div>Upload a photo:</div>
					<input
						className="input btn"
						type="file"
						name="picture"
						defaultValue="fileName"
					/>
				</form>
				<br />
				<div 
					className="btn" 
					onClick={this.createCar.bind(this)}>
					Add Car
				</div>
				{/*<div>{loadIcon}</div>*/}
			</div>
		);
	}


	// showLoadIcon() {
	// 	this.setState({ loading: true });
	// }

	createCar() {
		const { makeModel, year, price, mileage } = this.props;
		this.props.carCreated(makeModel, year, price, mileage);
	}

	// handleAddCar() {
	// 	this.showLoadIcon();
	// 	this.props.addCar(this.state);
	// 	this.setState({
	// 		make_model: "",
	// 		year: "",
	// 		mpg: "",
	// 		price: "",
	// 		lat: "",
	// 		lng: ""
	// 	});
	// }

	// updateMake_Model(event) {
	// 	this.setState({ make_model: event.target.value });
	// }

	// updateYear(event) {
	// 	this.setState({ year: event.target.value });
	// }

	// updateMPG(event) {
	// 	this.setState({ mpg: event.target.value });
	// }

	// updatePrice(event) {
	// 	this.setState({ price: event.target.value });
	// }
}

const mapStateToProps = ({ carForm }) => {
	const { makeModel, year, price, mileage } = carForm;
	return { makeModel, year, price, mileage };
}

export default connect(mapStateToProps, { 
	carCreated, 
	carMakeModelChanged, 
	carYearChanged, 
	carPriceChanged, 
	carMileageChanged 
})(AddCar);
