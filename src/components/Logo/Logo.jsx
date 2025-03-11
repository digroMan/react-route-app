import styles from './Logo.module.css';
import { memo } from 'react';

function Logo () {

	console.log('Logo');

	return (
		<img className={styles.logo} src={'./vite.svg'} alt="Логотип" />
	);
}

export default memo(Logo);