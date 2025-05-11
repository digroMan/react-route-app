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
		userId: null,
		id: null
	},
	isFormReadyToSubmit: false // Готовность формы к сабмиту
};

export function formReducer (preState, action) {
	switch (action.type) {
	case 'SET_VALUES':
		return {...preState, values: {...preState.values, ...action.payload}};
	case 'CLEAR':
		// return {...preState, ...INITIAL_STATE};
		return {...INITIAL_STATE};
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