import React, { Component } from "react";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            zip: "",
            username: "",
            password: ""
        };
        this.updateName = this.updateName.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.updateZip = this.updateZip.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
    }
    render() {
        return (
            <div>
                <input
                    type="text"
                    onChange={this.updateName}
                    placeholder="name"
                />
                <input
                    type="text"
                    onChange={this.updateAddress}
                    placeholder="address"
                />
                <input
                    type="integer"
                    onChange={this.updateZip}
                    placeholder="zip"
                />
                <input
                    type="text"
                    onChange={this.updateUsername}
                    placeholder="username"
                />
                <input
                    type="text"
                    onChange={this.updatePassword}
                    placeholder="password"
                />
                <button onClick={this.handleCreateUser}>Sign Up!</button>
            </div>
        );
    }
    handleCreateUser() {
        this.props.createUser(this.state);
    }
    updateName(event) {
        this.setState({ name: event.target.value });
    }
    updateAddress(event) {
        this.setState({ address: event.target.value });
    }
    updateZip(event) {
        this.setState({ zip: event.target.value });
    }
    updateUsername(event) {
        this.setState({ username: event.target.value });
    }
    updatePassword(event) {
        this.setState({ password: event.target.value });
    }
}

export default SignUp;
