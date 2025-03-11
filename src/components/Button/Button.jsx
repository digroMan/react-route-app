import cn from 'classnames';
import styles from './Button.module.css';

export const Button = ({children, onClick}) => {

	return (
		<>
			<button className={cn(styles.button, styles.accent)} onClick={onClick}>{children}</button>
		</>
	);
};