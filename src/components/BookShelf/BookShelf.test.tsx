import { render, screen } from '@testing-library/react';
import BookShelf from './BookShelf';

describe('<BookShelf />', () => {
	test('shows loading indicator', () => {
		render(<BookShelf title='test' isLoading={true} books={[]} />);
		const loadingElement = screen.getByText('Loading...');
		expect(loadingElement).toBeInTheDocument();
	});

	test('shows empty shelf text', () => {
		render(<BookShelf title='test' isLoading={false} books={[]} />);
		const emptyShelfElement = screen.getByText('Shelf is empty.');
		expect(emptyShelfElement).toBeInTheDocument();
	});
});
