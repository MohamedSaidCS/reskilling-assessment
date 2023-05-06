import axios from 'axios';
import { Book } from '../types/book';
import { Shelves } from '../types/shelves';

const api = 'https://reactnd-books-api.udacity.com';

const headers = { Authorization: 'token' };

export const getAllBooks = async () => {
	const response = await axios.get(`${api}/books`, { headers });
	const books: Book[] = response.data.books;
	return books;
};

export const updateBook = async (bookId: string, shelf: Shelves) => {
	const response = await axios.put(`${api}/books/${bookId}`, { shelf }, { headers });
	return response.data;
};
