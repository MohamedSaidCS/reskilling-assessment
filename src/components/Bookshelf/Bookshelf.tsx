import { FC } from 'react';
import { Book } from '../../core/types/book';
import BookCard from '../BookCard/BookCard';

interface BookShelfProps {
	title: string;
	books: Book[];
}

const Bookshelf: FC<BookShelfProps> = ({ title, books }) => {
	return (
		<div className='bookshelf'>
			<h2 className='bookshelf-title'>{title}</h2>
			<div className='bookshelf-books'>
				<ol className='books-grid'>
					{books.map((book) => (
						<BookCard key={book.id} book={book} />
					))}
				</ol>
			</div>
		</div>
	);
};

export default Bookshelf;
