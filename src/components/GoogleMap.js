import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const MarkerComponent = ({ text }) => (
	<div
		style={{
			position: "relative",
			color: "white",
			background: "red",
			height: 5,
			width: 5,
			top: -2.5,
			left: -2.5
		}}
	>
		{text}
	</div>
);

class GoogleMap extends Component {
	constructor(props) {
		super(props);
		this.center = { lat: props.lat, lng: props.lng };
		this.zoom = props.zoom;
		this.styles = props.styles;
		this.state = {
			cars: props.cars
		};
	}
	render() {
		let carMarkers = this.state.cars.map(function(car, index) {
			return <MarkerComponent index={index} lat={car.lat} lng={car.lng} />;
		});
		return (
			<GoogleMapReact
				style={this.styles}
				bootstrapURLKeys={{
					key: "AIzaSyCFrQcAO1Xbv9gTVT9KLDFZnMZznSvhMg4"
				}}
				defaultCenter={this.center}
				defaultZoom={this.zoom}
			>
				{carMarkers}
			</GoogleMapReact>
		);
	}

	componentWillReceiveProps(newProps) {
		this.setState({ cars: newProps.cars });
	}
}

export default GoogleMap;
