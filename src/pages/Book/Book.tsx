import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getOneBook } from '../../core/api/api';
import { ChangeEvent } from 'react';
import { Shelves } from '../../core/types/shelves';
import Header from '../../components/Header/Header';
import useBookMutation from '../../core/hooks/useBookMutation';

const Book = () => {
	const { id } = useParams();
	const queryClient = useQueryClient();

	const {
		data: book,
		isLoading,
		isFetching,
		isError,
	} = useQuery({
		queryKey: ['book', id],
		queryFn: () => getOneBook(id!),
	});

	const bookMutation = useBookMutation();

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		bookMutation.mutate(
			{ bookId: id!, shelf: e.target.value as Shelves },
			{
				onSuccess: (data, { shelf }) => {
					queryClient.setQueryData(['book', id], { ...book, shelf });
				},
			}
		);
	};

	if (isError) return <div>Error.</div>;

	return (
		<>
			<Header />
			<div className='book-page'>
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<>
						<h2 className='book-page-title'>{book.title}</h2>
						<div className='book-page-details-container'>
							<img className='book-page-details-cover' src={book.imageLinks.thumbnail} />
							<div className='book-page-details'>
								<div className='book-detail'>
									<h3>Title</h3>
									<p>{book.title}</p>
								</div>
								<div className='book-detail'>
									<h3>Subtitle</h3>
									<p>{book.subtitle || 'No subtitle'}</p>
								</div>
								<div className='book-detail'>
									<h3>Author(s)</h3>
									<p>{book.authors?.join(', ') || 'No Author'}</p>
								</div>
								<div className='book-detail'>
									<h3>Publisher</h3>
									<p>{book.publisher || 'Publisher not available'}</p>
								</div>
								<div className='book-detail'>
									<h3>Publish Date</h3>
									<p>{book.publishedDate}</p>
								</div>
								<div className='book-detail'>
									<h3>Shelf</h3>
									{isFetching ? (
										<select value='loading' disabled>
											<option value='loading' disabled>
												Loading...
											</option>
										</select>
									) : (
										<select value={book.shelf} onChange={onChangeHandler} disabled={bookMutation.isLoading}>
											<option disabled>Move to...</option>
											<option value='currentlyReading'>Currently Reading</option>
											<option value='wantToRead'>Want to Read</option>
											<option value='read'>Read</option>
											<option value='none'>None</option>
										</select>
									)}
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default Book;
