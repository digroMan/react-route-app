import styles from './Logo.module.css';
import { memo } from 'react';

function Logo ({imgSrc}) {

	console.log('Logo');

	return (
		<img className={styles.logo} src={imgSrc} alt="Логотип" />
	);
}

export default memo(Logo);