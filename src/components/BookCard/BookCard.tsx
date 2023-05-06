import { ChangeEvent, FC, useState } from 'react';
import { Book } from '../../core/types/book';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBook } from '../../core/api/api';
import { Shelves } from '../../core/types/shelves';
import placeholder from '../../assets/images/placeholder.png';

interface BookCardProps {
	book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);

	const bookMutation = useMutation({
		mutationFn: ({ bookId, shelf }: { bookId: string; shelf: Shelves }) => updateBook(bookId, shelf),
		onMutate: () => setLoading(true),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
		onSettled: () => setLoading(false),
	});

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		bookMutation.mutate({ bookId: book.id, shelf: e.target.value as Shelves });
	};

	return (
		<li>
			<div className='book'>
				<div className='book-top'>
					<div
						className='book-cover'
						style={{
							width: 128,
							height: 193,
							backgroundImage: `url("${book.imageLinks?.smallThumbnail || placeholder}")`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
					>
						{loading && <div className='book-cover-loading'>Loading...</div>}
					</div>
					<div className='book-shelf-changer'>
						<select value={book.shelf || 'none'} onChange={onChangeHandler} disabled={loading}>
							<option value='none' disabled>
								Move to...
							</option>
							<option value='currentlyReading'>Currently Reading</option>
							<option value='wantToRead'>Want to Read</option>
							<option value='read'>Read</option>
							<option value='none'>None</option>
						</select>
					</div>
				</div>
				<div className='book-title'>{book.title}</div>
				<div className='book-authors'>{book.authors?.join(', ') || 'No Author'}</div>
			</div>
		</li>
	);
};

export default BookCard;
