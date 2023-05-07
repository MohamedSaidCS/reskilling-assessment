import { useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '../../core/store/hooks/useAppDispatch';
import { logout } from '../../core/store/slices/authSlice';
import { resetBooks } from '../../core/store/slices/booksSlice';
import { Link } from 'react-router-dom';

const Header = () => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();

	const logoutHandler = () => {
		queryClient.clear();
		localStorage.clear();
		dispatch(resetBooks());
		dispatch(logout());
	};

	return (
		<div className='list-books-title'>
			<Link to={'/'}>MyReads</Link>
			<button onClick={logoutHandler}>Logout</button>
		</div>
	);
};

export default Header;
