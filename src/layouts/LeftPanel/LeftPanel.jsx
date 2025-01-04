import style from './LeftPanel.module.css';

function LeftPanel({children}) {

	return (
		<div className={style['left-panel']}>
			{children}
		</div>
	);
}

export default LeftPanel;
