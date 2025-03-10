import { useState, useEffect } from 'react';

export function useLocalStorage(key) {
	const [data, setData] = useState([]);
	useEffect(() => {
		const json = localStorage.getItem(key);
		let res;
		try {
			res = JSON.parse(json);
		} catch (error) {
			console.log(error);
			console.log('Записей в localStorage нет');
		}
		
		if(res){
			setData([...res]);
		}
	}, []);

	const saveData = (newData) => {
		if(!newData.length) return;
		localStorage.setItem(key, JSON.stringify(newData));
		setData(newData);
	};


	return [data, saveData];
}