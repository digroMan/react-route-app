import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';

function JournalAddButton({clearForm}) {

	return (
		<div className='journal-add-button'>
			<CardButton className={'card-button_center'} onClick={clearForm} >Новая запись</CardButton>
		</div>
	);
}

export default JournalAddButton;
