import style from './App.module.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { ProviderUserContext } from './context/user.context';


// const INITIAL_DATE = [
// 	// {
// 	// 	id: 1,
// 	// 	title:'Lorem ipsum dolor sit amet.',
// 	// 	date: new Date(),
// 	// 	tag:'Lorem qui',
// 	// 	post: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, in?'
// 	// },
// 	// {
// 	// 	id: 2,
// 	// 	title:'Lorem ipsum dolor sit amet.',
// 	// 	date: new Date(),
// 	// 	tag:'Lorem qui',
// 	// 	post: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, in?'
// 	// }
// ];


function App() {
	const [noteList, setNoteList] = useLocalStorage('data');


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
		<ProviderUserContext>
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
		</ProviderUserContext>
	);
}

export default App;
