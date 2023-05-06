import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Book } from '../../types/book';
import { RootState } from '../store';

interface BooksState {
	books: Book[];
}

const initialState: BooksState = {
	books: [],
};

const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		setBooks: (state, action: PayloadAction<Book[]>) => {
			state.books = action.payload;
		},

		resetBooks: () => initialState,
	},
});

export const getBooks = (state: RootState) => state.books.books;

export const { setBooks, resetBooks } = booksSlice.actions;

export default booksSlice.reducer;
