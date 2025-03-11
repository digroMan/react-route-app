import styles from './JournalForm.module.css';
import {Button} from '../Button/Button';
import { useContext, useEffect, useReducer, useRef } from 'react';
import classnames from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm({onSubmit, data}) {
	// const [formState, setFormState] = useState();
	const {userId} = useContext(UserContext);
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();

	const focusError = (isValid) => {
		const {title, date, post} = isValid;
		switch (true) {
		case !title:
			titleRef.current.focus();
			break;
		case !date:
			dateRef.current.focus();
			break;
		case !post:
			postRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		let timerId;
		if(!isValid.timestamp || !isValid.title || !isValid.post){
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if(!isFormReadyToSubmit) return;
		onSubmit(values);
		dispatchForm({type: 'CLEAR'});
	}, [isFormReadyToSubmit, onSubmit, values]);

	useEffect(() => {
		if(!data) return;
		dispatchForm({type: 'SET_VALUES', payload: {...data}});
	}, [data]);

	useEffect(() => {
		dispatchForm({type: 'SET_VALUES', payload: {userId}});
	}, [userId]);

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({type: 'SUBMIT'});
	};

	const changeValueInput = (evt) => {
		let {name, value: inputValue} = evt.target;
		const dataInput = {input: name, value: inputValue};
		dispatchForm({type: 'FILL_VALUES', payload: dataInput});
	};
	
    
	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<Input 
					className={'journal-form__input_title'} 
					isValid={isValid.title}
					name='title'
					type="text"
					ref={titleRef}
					value={values.title}
					onChange={(evt) => changeValueInput(evt)}
				/>
			</div>
			<div className={styles['journal-form__input-container']}>
				<label className={styles['journal-form__label']} htmlFor="date">
					<img className={styles['journal-form__label-img']} src="/calendar.svg" alt="Иконка календаря" />
					<div className={styles['journal-form__label-text']}>Дата:</div>
				</label>
				<Input 
					name='date'
					type="date"
					ref={dateRef} 
					id='date'
					value={values.date}
					isValid={isValid.date}
					onChange={(evt) => changeValueInput(evt)} 
				/>
			</div>
			<div className={styles['journal-form__input-container']}>
				<label className={styles['journal-form__label']} htmlFor="tag">
					<img className={styles['journal-form__label-img']} src="/folder.svg" alt="Иконка папки" />
					<div className={styles['journal-form__label-text']}>Метки:</div>
				</label>
				<Input 
					name='tag' 
					type="text" 
					id='tag'
					value={values.tag}
					onChange={(evt) => changeValueInput(evt)}
				/>
			</div>
			<textarea 
				className={classnames(styles['journal-form__textarea'], {
					[styles['journal-form__textarea_invalid']] : !isValid.post
				})} 
				name='post'
				ref={postRef}
				value={values.post}
				onChange={(evt) => changeValueInput(evt)}
				cols={30} 
				rows={10}
			/>
			<Button>Сохранить</Button>
		</form>

	);
}

export default JournalForm;
