import { forwardRef } from 'react';
import style from './Input.module.css';
import classnames from 'classnames';

const Input = forwardRef(function Input({ className, isValid = true , ...props}, ref) {

	return (
		<input 
			{...props}
			ref={ref}
			className={
				classnames(
					style['journal-form__input'],
					style[className && className], 
					{
						[style['journal-form__input_invalid']] : !isValid
					}
				)
			}
		/>
	);
});

export default Input;
