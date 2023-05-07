import './App.css';
import Router from './core/router/Router';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './core/store/hooks/useAppDispatch';
import { login } from './core/store/slices/authSlice';

function App() {
	const dispatch = useAppDispatch();
	const [initialLoad, setInitialLoad] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) dispatch(login(token));
		setInitialLoad(false);
	}, []);

	if (initialLoad) return <></>;

	return <Router />;
}

export default App;
