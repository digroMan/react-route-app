import { useEffect, useState } from 'react';
import style from './App.module.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';

// date: new Intl.DateTimeFormat('ru').format(new Date()),

const INITIAL_DATE = [
	// {
	// 	id: 1,
	// 	title:'Lorem ipsum dolor sit amet.',
	// 	date: new Date(),
	// 	tag:'Lorem qui',
	// 	post: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, in?'
	// },
	// {
	// 	id: 2,
	// 	title:'Lorem ipsum dolor sit amet.',
	// 	date: new Date(),
	// 	tag:'Lorem qui',
	// 	post: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, in?'
	// }
];

function App() {
	const [noteList, setNoteList] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));
		if(data){
			setNoteList([...data]);
		}
	}, []);

	useEffect(() => {
		if(!noteList.length) return;
		localStorage.setItem('data', JSON.stringify(noteList));
	}, [noteList]);

	const handlerAddNote = newNote => {
		setNoteList(preListNote => [...preListNote, {
			id: preListNote.length > 0 ? Math.max(...preListNote.map(i => i.id))+ 1 : 1,
			title: newNote.title,
			tag: newNote.tag,
			post: newNote.post,
			date: newNote.date
		}]);
	};

	return (
		<div className={style['container-box']}>
			<LeftPanel>
				<Header/>
				<JournalAddButton></JournalAddButton>
				<JournalList items={noteList} />
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={handlerAddNote}/>
			</Body>
		</div>
	);
}

export default App;
