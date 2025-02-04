import { SelectUser } from '../SelectUser/SelectUser';
import './Header.css';

function Header() {
	return (
		<>
			<div className='header'>Logotype</div>
			<SelectUser />
		</>
	);
}

export default Header;
