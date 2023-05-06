import { Book } from '../types/book';
import { Shelves } from '../types/shelves';
import { axiosInstance } from '../axiosInstance/axiosInstance';

export const getAllBooks = async () => {
	const response = await axiosInstance.get('books');
	const books: Book[] = response.data.books;
	return books;
};

export const updateBook = async (bookId: string, shelf: Shelves) => {
	const response = await axiosInstance.put(`books/${bookId}`, { shelf });
	return response.data;
};
