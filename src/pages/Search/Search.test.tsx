import { fireEvent, render, screen } from '@testing-library/react';
import { TestQueryClientWrapper, TestStoreProviderWrapper } from '../../test/utils/utils';
import { MemoryRouter } from 'react-router-dom';
import Search from './Search';

describe('<Search />', () => {
	test('test invalid search query', async () => {
		render(
			<TestStoreProviderWrapper>
				<TestQueryClientWrapper>
					<MemoryRouter>
						<Search />
					</MemoryRouter>
				</TestQueryClientWrapper>
			</TestStoreProviderWrapper>
		);

		const searchInput = screen.getByPlaceholderText('Search by title, author, or ISBN');

		fireEvent.change(searchInput, { target: { value: 'empty' } });

		const nothingFoundElement = await screen.findByText('No results found.');

		expect(nothingFoundElement).toBeInTheDocument();
	});
});
