import firebase from 'firebase';
import { 
	START_AMPM_UPDATED,
	START_HOUR_UPDATED,
	START_DAY_UPDATED,
	START_MONTH_UPDATED,
	START_YEAR_UPDATED,
	START_DATE_UPDATED,
	END_AMPM_UPDATED,
	END_HOUR_UPDATED,
	END_DAY_UPDATED,
	END_MONTH_UPDATED,
	END_YEAR_UPDATED,
	END_DATE_UPDATED,
	RESERVATION_CREATED,
	RESERVATION_DELETED,
	// RESERVATION_INITIALIZED,
	RESERVATIONS_FETCH_SUCCESS
} from './types';

export const reservationCreated = ({startAmpm, endAmpm, startHour, endHour, startDay, endDay, startMonth, endMonth, startYear, endYear, carId}) => {
	return(dispatch) => {
		const { currentUser } = firebase.auth();
		firebase.database().ref(`reservations`)
		.push({ 
			startAmpm,
			endAmpm,
			startHour,
			endHour,
			startDay,
			endDay,
			startMonth,
			endMonth,
			startYear,
			endYear,
			carId,
			userId: currentUser.uid,
			username: currentUser.displayName
		});
		dispatch({ type: RESERVATION_CREATED });
	};
};

// export const reservationSaveChanges = (carId, description, rating, reservationId, title, userId, username) => {
// 	console.log(title, description, rating, reservationId)
// 	return(dispatch) => {
// 		firebase.database().ref(`reservations/${reservationId}`)
// 		.set({
// 			carId,
// 			description,
// 			rating,
// 			title,
// 			userId,
// 			username
// 		})
// 		dispatch({ type: RESERVATION_SAVE_CHANGES })
// 	}
// }

export const reservationDeleted = (reservationId) => {
	return (dispatch) => {
		firebase.database().ref(`reservations/${reservationId}`)
			.set(null);
		dispatch({type: RESERVATION_DELETED});
	};
};

// export const reservationInitialized = () => {
// 	return({ 
// 		type: RESERVATION_INITIALIZED
// 	});
// };

export const startAmpmChanged = (value) => {
	return({
		type: START_AMPM_UPDATED,
		payload: value
	});
};
export const startHourChanged = (value) => {
	return({
		type: START_HOUR_UPDATED,
		payload: value
	});
};
export const startDayChanged = (value) => {
	return({
		type: START_DAY_UPDATED,
		payload: value
	});
};
export const startMonthChanged = (value) => {
	return({
		type: START_MONTH_UPDATED,
		payload: value
	});
};
export const startYearChanged = (value) => {
	return({
		type: START_YEAR_UPDATED,
		payload: value
	});
};
export const startDateChanged = (value) => {
	return({
		type: START_DATE_UPDATED,
		payload: value
	});
};

export const endAmpmChanged = (value) => {
	return({
		type: END_AMPM_UPDATED,
		payload: value
	});
};
export const endHourChanged = (value) => {
	return({
		type: END_HOUR_UPDATED,
		payload: value
	});
};
export const endDayChanged = (value) => {
	return({
		type: END_DAY_UPDATED,
		payload: value
	});
};
export const endMonthChanged = (value) => {
	return({
		type: END_MONTH_UPDATED,
		payload: value
	});
};
export const endYearChanged = (value) => {
	return({
		type: END_YEAR_UPDATED,
		payload: value
	});
};
export const endDateChanged = (value) => {
	return({
		type: END_DATE_UPDATED,
		payload: value
	});
};


export const reservationsFetch = () => {
	return (dispatch) => {
		// const { currentUser } = firebase.auth();
		firebase.database().ref(`reservations`)
			.on('value', snapshot => {
				dispatch({ type: RESERVATIONS_FETCH_SUCCESS, payload: snapshot.val() });
			});
	};
};


