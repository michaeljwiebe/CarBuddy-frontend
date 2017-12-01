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
	render() {
		const { 
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
			</div>
		);
	}

	createCar() {
		const { makeModel, year, price, mileage } = this.props;
		this.props.carCreated(makeModel, year, price, mileage);
	}
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
