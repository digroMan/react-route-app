import JournalItem from '../JournalItem/JournalItem';
import CardButton from '../CardButton/CardButton';
import './JournalList.css';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context';

function JournalList({items, setItem}) {
	const {userId} = useContext(UserContext);
	const sortItems = (a,b) => (Number(b.date)-Number(a.date));
	
	const filteredItems = useMemo(() => {
		return items.filter(el => el.userId === userId).sort(sortItems);
	}, [userId, items]);
	
	if(!items.length) return (
		<>
			<p>Воспоминаний нет, создайте первое</p>
		</>
	);

	return (
		<div className='journal-list'>
			{filteredItems.map((item) => (
				<CardButton key={item.id} onClick={()=>setItem(item)}>
					<JournalItem id={item.id} title={item.title} tag={item.tag} date={item.date} post={item.post}/>
				</CardButton>
			))}
		</div>
	);
}

export default JournalList;
