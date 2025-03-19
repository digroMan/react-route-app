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
		tag: '',
		userId: null
		// id: 0
	},
	isFormReadyToSubmit: false // Готовность формы к сабмиту
};

export function formReducer (preState, action) {
// preState - предидущее состояние
// action - то что нужно сделать. Имеет тип, дополнительные данные в виде payLoad (получаемое состояние) 
	switch (action.type) {
	case 'SET_VALUES':
		return {...preState, values: {...preState.values, ...action.payload}};
	// case 'SET_ID':
	// 	return {...preState, id: action.payload};
	// case 'SET_USER_ID':
	// 	return {...preState, userId: action.payload};
	case 'CLEAR':
		return {...preState, values: INITIAL_STATE.values, isFormReadyToSubmit: INITIAL_STATE.isFormReadyToSubmit, id: INITIAL_STATE.id};
	case 'RESET_VALIDITY':
		return {...preState, isValid: INITIAL_STATE.isValid};
	case 'SUBMIT':{
		const titleValidity = Boolean(preState.values.title?.trim().length);
		const postValidity = Boolean(preState.values.post?.trim().length);
		const dateValidity = Boolean(preState.values.date);
		const hasUser = Boolean(preState.values.userId);
		return {
			...preState,
			isValid: {
				title: titleValidity,
				date: dateValidity,
				post: postValidity
			},
			isFormReadyToSubmit: titleValidity && postValidity && dateValidity && hasUser
		};
	};
	case 'FILL_VALUES': {
		const {input, value} = action.payload;
		return {...preState, values: {...preState.values, [input]: value}};
	}
	}
};