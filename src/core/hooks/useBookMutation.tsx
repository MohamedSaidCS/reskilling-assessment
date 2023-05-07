import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Shelves } from '../types/shelves';
import { updateBook } from '../api/api';

const useBookMutation = () => {
	const queryClient = useQueryClient();

	const bookMutation = useMutation({
		mutationFn: ({ bookId, shelf }: { bookId: string; shelf: Shelves }) => updateBook(bookId, shelf),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
	});

	return bookMutation;
};

export default useBookMutation;
