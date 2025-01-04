import style from './Body.module.css';

function Body({children}) {

	return (
		<div className={style['body']}>
			{children}
		</div>
	);
}

export default Body;
