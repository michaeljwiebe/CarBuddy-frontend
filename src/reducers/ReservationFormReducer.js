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
	RESERVATIONS_FETCH_SUCCESS
} from '../actions/types';

const initialState = {
	startAmpm: '',
	startHour: '',
	startDay: '',
	startMonth: '',
	startYear: '',
	startDate: '',
	endAmpm: '',
	endHour: '',
	endDay: '',
	endMonth: '',
	endYear: '',
	endDate: ''
};

export default (state = initialState, action) => {
	console.log('reservationsformreducer', action);

	switch(action.type){
		case START_AMPM_UPDATED:
			return { ...state,  startAmpm: action.payload };
		case START_HOUR_UPDATED:
			return { ...state,  startHour: action.payload };
		case START_DAY_UPDATED:
			return { ...state,  startDay: action.payload };
		case START_MONTH_UPDATED:
			return { ...state,  startMonth: action.payload };
		case START_YEAR_UPDATED:
			return { ...state,  startYear: action.payload };
		case START_DATE_UPDATED:
			return { ...state,  startDate: action.payload };

		case END_AMPM_UPDATED:
			return { ...state,  endAmpm: action.payload };
		case END_HOUR_UPDATED:
			return { ...state,  endHour: action.payload };
		case END_DAY_UPDATED:
			return { ...state,  endDay: action.payload };
		case END_MONTH_UPDATED:
			return { ...state,  endMonth: action.payload };
		case END_YEAR_UPDATED:
			return { ...state,  endYear: action.payload };
		case END_DATE_UPDATED:
			return { ...state,  endDate: action.payload };

		default:
			return state;
	}
}