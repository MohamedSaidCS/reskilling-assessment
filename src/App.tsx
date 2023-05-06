import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './core/router/Router';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './core/store/hooks/useAppDispatch';
import { login } from './core/store/slices/authSlice';

function App() {
	const dispatch = useAppDispatch();
	const [initialLoad, setInitialLoad] = useState(true);

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
			},
		},
	});

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) dispatch(login(token));
		setInitialLoad(false);
	}, []);

	return <QueryClientProvider client={queryClient}>{!initialLoad && <Router />}</QueryClientProvider>;
}

export default App;
