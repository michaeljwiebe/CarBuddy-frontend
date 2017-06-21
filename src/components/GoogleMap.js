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
        this.center = { lat: 39.9524, lng: -75.1636 };
        this.zoom = 12;
        this.state = {
            styles: {
                position: "fixed",
                width: "100vw",
                height: "10vh",
                bottom: "0px"
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.car) {
            this.setState({
                styles: {
                    position: "fixed",
                    width: "50vw",
                    height: "43vh",
                    top: "0",
                    right: "0",
                    zIndex: 5
                }
            });
        } else {
            this.setState({
                styles: {
                    position: "fixed",
                    width: "100vw",
                    height: "10vh",
                    bottom: "0px"
                }
            });
        }
        this.setState({ issues: nextProps.issues });
    }

    render() {
        return (
            <GoogleMapReact
                style={this.state.styles}
                bootstrapURLKeys={{
                    key: "AIzaSyCFrQcAO1Xbv9gTVT9KLDFZnMZznSvhMg4"
                }}
                defaultCenter={this.center}
                defaultZoom={this.zoom}
            />
        );
    }
}

export default GoogleMap;
