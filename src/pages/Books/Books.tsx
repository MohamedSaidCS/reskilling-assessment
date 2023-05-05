import { useQuery } from '@tanstack/react-query';
import { Book } from '../../core/types/book';
import { getAllBooks } from '../../core/api/api';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Bookshelf from '../../components/Bookshelf/Bookshelf';

type Books = { currentlyReading: Book[]; wantToRead: Book[]; read: Book[] };

const shelves: { title: string; key: keyof Books }[] = [
	{ title: 'Currently Reading', key: 'currentlyReading' },
	{ title: 'Want to Read', key: 'wantToRead' },
	{ title: 'Read', key: 'read' },
];

const Books = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['books'],
		queryFn: getAllBooks,
		select: (data) =>
			data.reduce<Books>(
				(accumulator, currentValue) => {
					accumulator[currentValue.shelf].push(currentValue);
					return accumulator;
				},
				{ currentlyReading: [], wantToRead: [], read: [] }
			),
	});

	if (isError) return <div>Error</div>;

	return (
		<div className='app'>
			<div className='list-books'>
				<Header />
				<div className='list-books-content'>
					{shelves.map((shelf) => (
						<Bookshelf key={shelf.key} title={shelf.title} isLoading={isLoading} books={isLoading ? [] : data[shelf.key]} />
					))}
				</div>
				<div className='open-search'>
					<Link to={'/search'}>Add a book</Link>
				</div>
			</div>
		</div>
	);
};

export default Books;
