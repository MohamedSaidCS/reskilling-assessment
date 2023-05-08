import { render, screen, waitFor } from '@testing-library/react';
import { TestQueryClientWrapper, TestStoreProviderWrapper } from '../../test/utils/utils';
import { MemoryRouter } from 'react-router-dom';
import Books from './Books';

describe('<Books />', () => {
	test('test mapping books to shelves', async () => {
		render(
			<TestStoreProviderWrapper>
				<TestQueryClientWrapper>
					<MemoryRouter>
						<Books />
					</MemoryRouter>
				</TestQueryClientWrapper>
			</TestStoreProviderWrapper>
		);
		await waitFor(() => !screen.queryByText('Loading...'));

		const emptyShelfText = screen.queryByText('Shelf is empty.');

		expect(emptyShelfText).toBeNull();
	});
});
