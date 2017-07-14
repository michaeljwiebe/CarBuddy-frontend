# carBuddy
I was inspired to build this app because I am an avid bicyclist and I believe it is in the interest of Philadelphia and everyone in it to reduce the number of cars on the road. A user-friendly and effective carsharing platform would do this by making it easier for car owners to get rid of their cars and learn to function without one while still having access to nearby cars when truly necessary.

## Development
I developed this single page app with a React.js frontend and a Ruby on Rails [backend](https://github.com/michaeljwiebe/carbuddy-backend). It was a great learning experience to build a full-stack fully featured (CRUD - Create Read Update Destroy) single page app incorporating 16 API calls to the backend.

### Challenges
The way I deal track down bugs is by testing different solutions then commenting the results of those tests inside my code at the site of the bug. I've found this technique to be extremely useful for resolving issues, not just in javascript but when working with responsive design in CSS as well.

A significant challenge was handling creation of reservations with user-controlled start and end times. I first attempted to incorporate a couple different existing date time pickers which both turned out to have issues making them hard to work with. Rather than use these I decided to build my own date time picker using HTML <select> tags linked to javascript objects. I built concise logic to show 28, 29, 30, or 31 days depending on the month and year selected.  I also converted back and forth between world/military and US time though I discovered afterwards that I may not have needed to.

Another challenge with making reservations was preventing cars from being double booked. To solve this I researched the javascript Date object and used the built-in functionality to convert dates to milliseconds and use simple 'if' statement inequalities to check for overlapping reservation times.

## Future Development

CONVENIENCE
no sign in error message
add titles for inputs on edit user
add avg reviews to start reservation car description
display car address
update car location
click background to close hamburger

STYLE POINTS
images scale on reserve car
images remain centered on reserve car with page width change
shadow effects on buttons/cars/reservation divs
buttons can be styled, why not use those?

EXTRA FEATURES
Display car stats on reservations and find a car
add Stripe payment system

## Known Issues
-Getting a preflight request error when sending PATCH requests to Heroku. This was not an error a week ago using the same deployment of the backend. From what I understand this is an error that happens when only certain methods are allowed for APIs. But I do have update methods which correspond to PATCH and show up in the terminal with rails routes
-mobile landscape view experiences difficulties with positioning due to use of vw and vh
-map won't shrink with page -- likely due to excessive nested divs with styling that i can't change
-car image in logo slides left below 420px -- i don't understand why this happens

## Technical description
The app has 10 components with the main one, App.js, controlling the rendering of all the others through booleans or objects in App.js's state. All API calls are performed through App.js with the exception of two which happen in the UserReservation.js component as an experiment in reduction of complexity. When buttons are clicked, App.js's state is changed and 'if' statements in the render function direct a different component to be displayed without changing the route. I systematically followed this format in all of my components. The following is a simplified and commented example of this format:

import React, { Component } from "react";

class App extends Component(
    constructor(props){
        super(props); //required for React
        //this.state stores data from the backend and holds booleans that determine what is rendered by default. Button clicks change these booleans and will cause the app to render different components
        this.state = {
            cars: [],
            reservations: [],
            viewCars: true,
            viewReservations: false
        };

        //below binding of this is necessary for functions using this keyword in React

        this.viewCars = this.viewCars.bind(this);
        this.viewReservations = this.viewReservations.bind(this);
    }

    viewCars(){
        this.setState({
            viewcars: true,
            viewReservations: false
        });
    }

    viewReservations(){
        this.setState({
            viewcars: false,
            viewReservations: true
        });
    }

    render(){
        let cars = null;
        let reservations = null;
        let viewCarsBtn = <div onClick={this.viewCars}>Cars</div>
        let viewReservationsBtn = <div onClick={this.viewReservations}>Reservations</div>

        if (this.state.viewCars = true){
            cars = <Cars cars={this.state.cars} />
        }
        if (this.state.viewReservations = true){
            reservations = <Reservations reservations={this.state.reservations} />
        }

        return(
            //all React content being rendered must be wrapped in a single HTML element
            <div className="content">
                {viewCarsBtn}
                {viewReservationsBtn}
                {cars}
                {reservations}
            </div>
        )
    }
)




## React Documentation

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
