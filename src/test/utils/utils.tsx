import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../core/store/store';

export const TestStoreProviderWrapper: FC<{ children: ReactNode }> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};

export const TestQueryClientWrapper: FC<{ children: ReactNode }> = ({ children }) => {
	const testClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return <QueryClientProvider client={testClient}>{children}</QueryClientProvider>;
};
