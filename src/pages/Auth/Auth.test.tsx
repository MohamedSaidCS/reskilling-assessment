import { fireEvent, render, screen } from '@testing-library/react';
import Auth from './Auth';
import { TestStoreProviderWrapper } from '../../test/utils/utils';

describe('<Auth />', () => {
	test('test login validation', () => {
		render(
			<TestStoreProviderWrapper>
				<Auth />
			</TestStoreProviderWrapper>
		);
		const button = screen.getByText('Login');
		fireEvent.click(button);
		const errorElement = screen.getByText('Please enter a username.');
		expect(errorElement).toBeInTheDocument();
	});
});
