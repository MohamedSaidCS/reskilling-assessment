import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { getAllBooks } from '../../core/api/api';
import { useAppDispatch } from '../../core/store/hooks/useAppDispatch';
import { setBooks } from '../../core/store/slices/booksSlice';

const Wrapper = () => {
	const dispatch = useAppDispatch();

	useQuery({
		queryKey: ['books'],
		queryFn: getAllBooks,
		onSuccess: (data) => {
			dispatch(setBooks(data));
		},
	});

	return <Outlet />;
};

export default Wrapper;
