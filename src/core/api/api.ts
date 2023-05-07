import { Book } from '../types/book';
import { Shelves } from '../types/shelves';
import { axiosInstance } from '../axiosInstance/axiosInstance';

export const getAllBooks = async () => {
	const response = await axiosInstance.get('books');
	const books: Book[] = response.data.books;
	return books;
};

export const getOneBook = async (bookId: string) => {
	const response = await axiosInstance.get(`books/${bookId}`);
	const book: Book = response.data.book;
	return book;
};

export const updateBook = async (bookId: string, shelf: Shelves) => {
	const response = await axiosInstance.put(`books/${bookId}`, { shelf });
	return response.data;
};

export const searchBooks = async (query: string) => {
	const response = await axiosInstance.post('search', { query });
	const books: Book[] | { error: string; items: [] } = response.data.books;
	return books;
};
