import { useState } from 'react';
import {Button} from '../Button/Button';
import { SelectUser } from '../SelectUser/SelectUser';
import styles from './Header.module.css';

const logos = ['./cart.svg' , './vite.svg'];

function Header() {
	const [logoIndex, setLogoIndex] = useState(0);

	const toggleLogo = () => {
		setLogoIndex(preState => Number(!preState));
	};
	return (
		<>
			<img className={styles.header} src={logos[logoIndex]} alt="Логотип" />
			<SelectUser />
			<Button onClick={toggleLogo}>Смена логотипа</Button>
		</>
	);
}

export default Header;
