import './JournalItem.css';

const JournalItem = ({title, tag, date, post}) => {
	const formateDate = new Intl.DateTimeFormat('ru').format(new Date(date));
	return (
		<div className='journal-item'>
			<h2 className='journal-item__header'>{title}</h2>
			<div className='journal-item__body'>
				<div className='journal-item__date'>{formateDate}</div>
				<div className='journal-item__text'>{tag}</div>
				<div className='journal-item__text'>{post}</div>
			</div>
		</div>
	);
};

export default JournalItem;
