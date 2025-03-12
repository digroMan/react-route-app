import { useCallback, useState } from 'react';
import {Button} from '../Button/Button';
import { SelectUser } from '../SelectUser/SelectUser';
import Logo from '../Logo/Logo';

const logos = ['./cart.svg' , './vite.svg'];

function Header() {
	const [logoIndex, setLogoIndex] = useState(0);

	console.log('Header');
	
	const toggleLogo = useCallback(() => {
		console.log('fun');
		setLogoIndex(preState => Number(!preState));
	}, []);

	return (
		<>
			<Logo/>
			<SelectUser />
			<Button onClick={toggleLogo}>Смена логотипа</Button>
		</>
	);
}

export default Header;
