import { Navigate, createBrowserRouter } from 'react-router-dom';
import Auth from '../../pages/Auth/Auth';
import Books from '../../pages/Books/Books';
import Book from '../../pages/Book/Book';
import Search from '../../pages/Search/Search';

const token = localStorage.getItem('token');

export const router = createBrowserRouter([
	{ path: '/auth', element: !token ? <Navigate to={'/'} /> : <Auth /> },

	{
		path: '/',
		element: !token ? <Books /> : <Navigate to={'/auth'} />,
		children: [{ path: ':id', element: <Book /> }],
	},
	{
		path: '/search',
		element: !token ? <Search /> : <Navigate to={'/auth'} />,
	},
]);
