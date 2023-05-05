import { useQuery } from '@tanstack/react-query';
import { Book } from '../../core/types/book';
import { getAllBooks } from '../../core/api/api';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Bookshelf from '../../components/Bookshelf/Bookshelf';

const Books = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['books'],
		queryFn: getAllBooks,
		select: (data) =>
			data.reduce(
				(accumulator, currentValue) => {
					accumulator[currentValue.shelf].push(currentValue);
					return accumulator;
				},
				{
					currentlyReading: [],
					wantToRead: [],
					read: [],
				} as {
					currentlyReading: Book[];
					wantToRead: Book[];
					read: Book[];
				}
			),
	});

	if (isLoading || isError) return <div>Loading or Error</div>;

	return (
		<div className='app'>
			<div className='list-books'>
				<Header />
				<div className='list-books-content'>
					<div>
						<Bookshelf title='Currently Reading' books={data.currentlyReading} />
						<Bookshelf title='Want To Read' books={data.wantToRead} />
						<Bookshelf title='Read' books={data.read} />
					</div>
				</div>
				<div className='open-search'>
					<Link to={'/search'}>Add a book</Link>
				</div>
			</div>
		</div>
	);
};

export default Books;
