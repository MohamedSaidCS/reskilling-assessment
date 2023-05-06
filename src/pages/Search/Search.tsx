import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchBooks } from '../../core/api/api';
import { Book } from '../../core/types/book';
import BookCard from '../../components/BookCard/BookCard';
import { useAppSelector } from '../../core/store/hooks/useAppSelector';
import { getBooks } from '../../core/store/slices/booksSlice';

const Search = () => {
	const [search, setSearch] = useState('');
	const [query, setQuery] = useState('');
	const [books, setBooks] = useState<Book[]>([]);
	const myBooks = useAppSelector(getBooks);

	const { isFetching, isFetched, isError } = useQuery({
		queryKey: ['search', query],
		queryFn: async () => searchBooks(query),
		enabled: !!query,
		select: (data) => {
			if (!Array.isArray(data)) return data;
			else
				return data.map((book) => {
					const foundBook = myBooks.find((b) => b.id === book.id);
					if (foundBook) book.shelf = foundBook.shelf;
					return book;
				});
		},
		onSuccess: (data) => {
			if (Array.isArray(data)) setBooks(data);
			else setBooks([]);
		},
	});

	let timeout: NodeJS.Timeout;

	useEffect(() => {
		timeout = setTimeout(() => setQuery(search), 500);
		return () => {
			clearTimeout(timeout);
		};
	}, [search]);

	if (isError) return <div>Error</div>;

	return (
		<div className='search-books'>
			<div className='search-books-bar'>
				<Link to={'/'} className='close-search'>
					Close
				</Link>
				<div className='search-books-input-wrapper'>
					<input type='text' placeholder='Search by title, author, or ISBN' value={search} onChange={(e) => setSearch(e.target.value)} />
				</div>
			</div>
			<div className='search-books-results'>
				<ol className='books-grid'>
					{isFetching && <p>Searching...</p>}

					{isFetched &&
						!isFetching &&
						(books.length === 0 ? <p>No results found.</p> : books.map((book) => <BookCard key={book.id} book={book} />))}
				</ol>
			</div>
		</div>
	);
};

export default Search;
