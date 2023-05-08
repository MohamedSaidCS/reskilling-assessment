import { render, screen } from '@testing-library/react';
import BookCard from './BookCard';
import { Book } from '../../core/types/book';
import { MemoryRouter } from 'react-router-dom';
import { TestQueryClientWrapper } from '../../test/utils/utils';

describe('<BookCard />', () => {
	test('test book without authors', () => {
		const book: Book = {
			id: '',
			title: '',
			shelf: 'currentlyReading',
			imageLinks: { smallThumbnail: '', thumbnail: '' },
			publishedDate: '',
			publisher: '',
			subtitle: '',
			authors: [],
		};
		render(
			<TestQueryClientWrapper>
				<MemoryRouter>
					<BookCard book={book} />
				</MemoryRouter>
			</TestQueryClientWrapper>
		);
		const noAuthorElement = screen.getByText('No Author');
		expect(noAuthorElement).toBeInTheDocument();
	});

	test('check if correct book shelf is selected', () => {
		const book: Book = {
			id: '',
			title: '',
			shelf: 'wantToRead',
			imageLinks: { smallThumbnail: '', thumbnail: '' },
			publishedDate: '',
			publisher: '',
			subtitle: '',
			authors: [],
		};
		render(
			<TestQueryClientWrapper>
				<MemoryRouter>
					<BookCard book={book} />
				</MemoryRouter>
			</TestQueryClientWrapper>
		);
		const shelf = screen.getByRole<HTMLOptionElement>('option', { name: 'Want to Read' });
		expect(shelf.selected).toBe(true);
	});
});
