export const INITIAL_STATE = {
	isValid: { // Форма валидна по умолчанию
		title: true,
		date: true,
		post: true
	},
	values: { // Значения которые находятся в форме
		title: '',
		date: '',
		post: '',
		tag: ''
	},
	isFormReadyToSubmit: false // Готовность формы к сабмиту
};

export function formReducer (preState, action) {
// preState - предидущее состояние
// action - то что нужно сделать. Имеет тип, дополнительные данные в виде payLoad (получаемое состояние) 
	switch (action.type) {
	case 'RESET_VALIDITY':
		return {...preState, isValid: INITIAL_STATE.isValid};
	case 'SUBMIT':{
		const titleValidity = Boolean(preState.values.title?.trim().length);
		const postValidity = Boolean(preState.values.post?.trim().length);
		const dateValidity = Boolean(preState.values.date);
		return {
			...preState,
			isValid: {
				title: titleValidity,
				date: dateValidity,
				post: postValidity
			},
			isFormReadyToSubmit: titleValidity && postValidity && dateValidity
		};
	};
	case 'FILL_VALUES': {
		const {input, value} = action.payload;
		return {...preState, values: {...preState.values, [input]: value}};
	}
	case 'EDITING_VALUES': {
		return {
			...preState,
			value: {
				title: action.payload.title,
				date: action.payload.date,
				post: action.payload.post,
				tag: action.payload.tag
			}
		};
		// return {...preState, values: {...preState.values, [input]: value}};
	}
	case 'RESET_FORM': {
		return {...preState, values: INITIAL_STATE.values, isFormReadyToSubmit: INITIAL_STATE.isFormReadyToSubmit};
	}
	}
};