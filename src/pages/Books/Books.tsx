import { useQuery } from '@tanstack/react-query';
import { Book } from '../../core/types/book';
import { getAllBooks } from '../../core/api/api';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import BookShelf from '../../components/BookShelf/BookShelf';

type CategorizedBooks = { currentlyReading: Book[]; wantToRead: Book[]; read: Book[] };

const shelves: { title: string; key: keyof CategorizedBooks }[] = [
	{ title: 'Currently Reading', key: 'currentlyReading' },
	{ title: 'Want to Read', key: 'wantToRead' },
	{ title: 'Read', key: 'read' },
];

const Books = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['books'],
		queryFn: getAllBooks,
		staleTime: Infinity,
		select: (data) =>
			data.reduce<CategorizedBooks>(
				(accumulator, currentValue) => {
					accumulator[currentValue.shelf].push(currentValue);
					return accumulator;
				},
				{ currentlyReading: [], wantToRead: [], read: [] }
			),
	});

	if (isError) return <div>Error</div>;

	return (
		<>
			<Header />
			<div className='list-books-content'>
				{shelves.map((shelf) => (
					<BookShelf key={shelf.key} title={shelf.title} isLoading={isLoading} books={isLoading ? [] : data[shelf.key]} />
				))}
			</div>
			<div className='open-search'>
				<Link to={'/search'}>Add a book</Link>
			</div>
		</>
	);
};

export default Books;
