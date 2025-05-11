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
	const [selectedItem, setSelectedItem] = useState(null);

	const handlerAddNote = newNote => {
		if(newNote.id){
			setNoteList([...noteList.map(item =>{ 
				if(item.id === newNote.id) return newNote; 
				else return item;
			})]);            
		}
		if(!newNote.id){
			setNoteList([...noteList, {
				...newNote,
				id: noteList.length > 0 ? Math.max(...noteList.map(i => i.id))+ 1 : 1
			}]);
		}
	};

	const handlerDeleteItem= id =>{
		setNoteList([...noteList.filter(item => item.id !== id)]);
	};


	return (
		<UserContextProvider>
			<div className={style['container-box']}>
				<LeftPanel>
					<Header/>
					<JournalAddButton clearForm={() => setSelectedItem(null)}/>
					<JournalList items={noteList} setItem={setSelectedItem}/>
				</LeftPanel>
				<Body>
					<JournalForm 
						onSubmit={handlerAddNote} 
						onDeletingNote={handlerDeleteItem}
						data={selectedItem && noteList.find(item => item.id === selectedItem.id)}
					/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
