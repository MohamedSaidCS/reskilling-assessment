import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestQueryClientWrapper, TestStoreProviderWrapper } from '../../test/utils/utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Book from './Book';

describe('<Book />', () => {
	test('test if correct shelf is selected', async () => {
		render(
			<TestStoreProviderWrapper>
				<TestQueryClientWrapper>
					<MemoryRouter initialEntries={['/books/1']}>
						<Routes>
							<Route path='/books/:id' element={<Book />} />
						</Routes>
					</MemoryRouter>
				</TestQueryClientWrapper>
			</TestStoreProviderWrapper>
		);

		const shelf = await screen.findByRole<HTMLOptionElement>('option', { name: 'Currently Reading' });
		expect(shelf.selected).toBe(true);
	});

	test('test if shelf changes successfully', async () => {
		render(
			<TestStoreProviderWrapper>
				<TestQueryClientWrapper>
					<MemoryRouter initialEntries={['/books/1']}>
						<Routes>
							<Route path='/books/:id' element={<Book />} />
						</Routes>
					</MemoryRouter>
				</TestQueryClientWrapper>
			</TestStoreProviderWrapper>
		);

		const shelfSelect = await screen.findByRole<HTMLSelectElement>('combobox');

		userEvent.selectOptions(shelfSelect, 'wantToRead');

		const newShelf = await screen.findByRole<HTMLOptionElement>('option', { name: 'Want to Read' });

		await waitFor(() => expect(newShelf.selected).toBe(true));
	});

	test('test book with missing details', async () => {
		render(
			<TestStoreProviderWrapper>
				<TestQueryClientWrapper>
					<MemoryRouter initialEntries={['/books/1']}>
						<Routes>
							<Route path='/books/:id' element={<Book />} />
						</Routes>
					</MemoryRouter>
				</TestQueryClientWrapper>
			</TestStoreProviderWrapper>
		);

		const noSubtitleElement = await screen.findByText('No subtitle');
		const noAuthorElement = await screen.findByText('No Author');
		const noPublisherElement = await screen.findByText('Publisher not available');

		expect(noSubtitleElement).toBeInTheDocument();
		expect(noAuthorElement).toBeInTheDocument();
		expect(noPublisherElement).toBeInTheDocument();
	});
});
