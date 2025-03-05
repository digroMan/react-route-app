import JournalItem from '../JournalItem/JournalItem';
import CardButton from '../CardButton/CardButton';
import './JournalList.css';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function JournalList({items, setItem}) {
	const {userId} = useContext(UserContext);
	if(!items.length) return (
		<>
			{userId}
			<p>Воспоминаний нет, создайте первое</p>
		</>
	);

	const sortItems = (a,b) => (Number(b.date)-Number(a.date));

	return (
		<div className='journal-list'>
			{items.sort(sortItems).map((item) => (
				<CardButton key={item.id} onClick={()=>setItem(item.id)}>
					<JournalItem id={item.id} title={item.title} tag={item.tag} date={item.date} post={item.post}/>
				</CardButton>
			))}
		</div>
	);
}

export default JournalList;
