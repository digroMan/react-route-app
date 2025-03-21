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


function App() {
	const [noteList, setNoteList] = useLocalStorage('data');
	const [selectedItem, setSelectedItem] = useState({});

	const handlerAddNote = newNote => {
		// Проверить id, они не прилеют в localStorage
		debugger;
		if(!newNote.id){
			setNoteList([...noteList, {
				id: noteList.length > 0 ? Math.max(...noteList.map(i => i.id))+ 1 : 1,
				...newNote
			}]);
		}
		if(newNote.id){
			setNoteList([...noteList.map(noteItem =>{
				if(noteItem.id === newNote.id){
					return {...newNote};
				}
				return noteItem;
			})]);
		}
	};

	const handlerEditNote = modifiedNote => {
		const editableNote = noteList.find(item => item.id === modifiedNote.id);
		const newNoteList = noteList.filter(item => item.id !== modifiedNote.id);
		setNoteList([...newNoteList, {...editableNote, ...modifiedNote}]);
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
					<JournalForm onSubmit={handlerAddNote} onSubmitEdit={handlerEditNote} data={selectedItem}/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
