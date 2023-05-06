import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Auth from '../../pages/Auth/Auth';
import Books from '../../pages/Books/Books';
import Book from '../../pages/Book/Book';
import Search from '../../pages/Search/Search';
import { useAppSelector } from '../store/hooks/useAppSelector';
import { getAuthState } from '../store/slices/authSlice';

const Router = () => {
	const { loggedIn } = useAppSelector(getAuthState);

	const router = createBrowserRouter([
		{ path: '/auth', element: loggedIn ? <Navigate to={'/'} /> : <Auth /> },

		{
			path: '/',
			element: loggedIn ? <Books /> : <Navigate to={'/auth'} />,
			children: [{ path: ':id', element: <Book /> }],
		},
		{
			path: '/search',
			element: loggedIn ? <Search /> : <Navigate to={'/auth'} />,
		},
	]);

	return <RouterProvider router={router} />;
};

export default Router;
