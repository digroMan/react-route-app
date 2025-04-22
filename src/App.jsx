import style from './App.module.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContextProvider } from './context/user.context';
import { useState } from 'react';


// const INITIAL_DATE = [
// 	{
// 		id: 1,
// 		userId: 1,
// 		title:'Lorem ipsum dolor sit amet.',
// 		date: new Date(),
// 		tag:'Lorem qui',
// 		post: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, in?'
// 	},
// 	{
// 		id: 2,
// 		userId: 2,
// 		title:'Lorem ipsum dolor sit amet.',
// 		date: new Date(),
// 		tag:'Lorem qui',
// 		post: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, in?'
// 	}
// ];


function App() {
	const [noteList, setNoteList] = useLocalStorage('data');
	const [selectedItem, setSelectedItem] = useState({});

	const handlerAddNote = newNote => {
		if(!newNote.id){
			setNoteList([...noteList, {
				id: noteList.length > 0 ? Math.max(...noteList.map(i => i.id))+ 1 : 1,
				...newNote
			}]);
		}
		if(newNote.id){
			setNoteList([...noteList.map(item =>{ 
				if(item.id === newNote.id) return newNote; 
				else return item;
			})]);            
		}
	};

	return (
		<UserContextProvider>
			<div className={style['container-box']}>
				<LeftPanel>
					<Header/>
					<JournalAddButton></JournalAddButton>
					<JournalList items={noteList} setItem={setSelectedItem}/>
				</LeftPanel>
				<Body>
					<JournalForm 
						onSubmit={handlerAddNote} 
						data={noteList.find(item => item.id === selectedItem.id)}
					/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
