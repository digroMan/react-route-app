import { SelectUser } from '../SelectUser/SelectUser';
import Logo from '../Logo/Logo';


function Header() {
	return (
		<>
			<Logo imgSrc={'./cart.svg'}/>
			<SelectUser />
		</>
	);
}

export default Header;
