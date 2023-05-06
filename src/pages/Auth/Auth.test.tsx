import { fireEvent, render, screen } from '@testing-library/react';
import Auth from './Auth';
import { Provider } from 'react-redux';
import { store } from '../../core/store/store';

describe('<Auth />', () => {
	test('test login validation', () => {
		render(
			<Provider store={store}>
				<Auth />
			</Provider>
		);
		const button = screen.getByText('Login');
		fireEvent.click(button);
		const errorElement = screen.getByText('Please enter a username.');
		expect(errorElement).toBeInTheDocument();
	});
});
