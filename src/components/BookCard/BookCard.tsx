import { ChangeEvent, FC } from 'react';
import { Book } from '../../core/types/book';
import { Shelves } from '../../core/types/shelves';
import { Link } from 'react-router-dom';
import useBookMutation from '../../core/hooks/useBookMutation';
import placeholder from '../../assets/images/placeholder.png';

interface BookCardProps {
	book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
	const bookMutation = useBookMutation();

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		bookMutation.mutate({ bookId: book.id, shelf: e.target.value as Shelves });
	};

	return (
		<li>
			<div className='book'>
				<div className='book-top'>
					<Link
						to={`/book/${book.id}`}
						className='book-cover'
						style={{
							width: 128,
							height: 193,
							backgroundImage: `url("${book.imageLinks?.smallThumbnail || placeholder}")`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
					>
						{bookMutation.isLoading && <div className='book-cover-loading'>Loading...</div>}
					</Link>
					<div className='book-shelf-changer'>
						<select value={book.shelf || 'none'} onChange={onChangeHandler} disabled={bookMutation.isLoading}>
							<option disabled>Move to...</option>
							<option value='currentlyReading'>Currently Reading</option>
							<option value='wantToRead'>Want to Read</option>
							<option value='read'>Read</option>
							<option value='none'>None</option>
						</select>
					</div>
				</div>
				<Link to={`/book/${book.id}`} className='book-title'>
					{book.title}
				</Link>
				<div className='book-authors'>{book.authors?.join(', ') || 'No Author'}</div>
			</div>
		</li>
	);
};

export default BookCard;
