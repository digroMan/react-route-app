import style from './JournalForm.module.css';
import Button from '../Button/Button';
import { useEffect, useReducer } from 'react';
import classnames from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';

function JournalForm({onSubmit}) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;

	useEffect(() => {
		let timerId;
		if(!isValid.timestamp || !isValid.title || !isValid.post){
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
		dispatchForm({type: 'RESET_FORM'});
	}, [isFormReadyToSubmit]);


	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		dispatchForm({type: 'SUBMIT', payload: formProps});
	};

	const changeValueInput = (evt) => {
		let {name, value: inputValue} = evt.target;
		const dataInput = {input: name, value: inputValue};
		dispatchForm({type: 'FILL_VALUES', payload: dataInput});
	};
	
    
	return (
		<form className={style['journal-form']} onSubmit={addJournalItem}>
			<div>
				<input 
					className={
						classnames(
							style['journal-form__input'],
							style['journal-form__input_title'], 
							{
								[style['journal-form__input_invalid']] : !isValid.title
							}
						)
					} 
					name='title' 
					type="text"
					value={values.title}
					onChange={(evt) => changeValueInput(evt)}
				/>
			</div>
			<div className={style['journal-form__input-container']}>
				<label className={style['journal-form__label']} htmlFor="date">
					<img className={style['journal-form__label-img']} src="/calendar.svg" alt="Иконка календаря" />
					<div className={style['journal-form__label-text']}>Дата:</div>
				</label>
				<input 
					name='date' 
					type="date" 
					id='date'
					value={values.date}
					onChange={(evt) => changeValueInput(evt)}
					className={classnames(style['journal-form__input'], {
						[style['journal-form__input_invalid']] : !isValid.date
					})} 
				/>
			</div>
			<div className={style['journal-form__input-container']}>
				<label className={style['journal-form__label']} htmlFor="tag">
					<img className={style['journal-form__label-img']} src="/folder.svg" alt="Иконка папки" />
					<div className={style['journal-form__label-text']}>Метки:</div>
				</label>
				<input 
					name='tag' 
					type="text" 
					id='tag'
					value={values.tag}
					onChange={(evt) => changeValueInput(evt)}
					className={classnames(style['journal-form__input'])}
				/>
			</div>
			<textarea 
				className={classnames(style['journal-form__textarea'], {
					[style['journal-form__textarea_invalid']] : !isValid.post
				})} 
				name='post'
				value={values.post}
				onChange={(evt) => changeValueInput(evt)}
				cols={30} 
				rows={10}
			/>
			<Button text="Сохранить"/>
		</form>
	);
}

export default JournalForm;
