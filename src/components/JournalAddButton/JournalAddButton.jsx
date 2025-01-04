import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';

function JournalAddButton() {

	return (
		<div className='journal-add-button'>
			<CardButton className={'card-button_center'}>Новая запись</CardButton>
		</div>
	);
}

export default JournalAddButton;
