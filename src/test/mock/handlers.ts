import { rest } from 'msw';

const baseURL = 'https://reactnd-books-api.udacity.com';

const mockBooks = [
	{
		id: '1',
		title: 'test 1',
		subtitle: 'subtitle',
		authors: ['author 1'],
		imageLinks: { smallThumbnail: '', thumbnail: '' },
		shelf: 'currentlyReading',
		publishedDate: '2023',
		publisher: 'Test Publisher',
	},
	{
		id: '2',
		title: 'test 2',
		subtitle: 'subtitle',
		authors: ['author 2'],
		imageLinks: { smallThumbnail: '', thumbnail: '' },
		shelf: 'wantToRead',
		publishedDate: '2023',
		publisher: 'Test Publisher',
	},
	{
		id: '3',
		title: 'test 3',
		subtitle: 'subtitle',
		authors: ['author 3'],
		imageLinks: { smallThumbnail: '', thumbnail: '' },
		shelf: 'read',
		publishedDate: '2023',
		publisher: 'Test Publisher',
	},
];

export const handlers = [
	rest.get(`${baseURL}/books`, (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				books: mockBooks,
			})
		);
	}),

	rest.get(`${baseURL}/books/:bookId`, (req, res, ctx) => {
		const { bookId } = req.params;
		return res(
			ctx.status(200),
			ctx.json({
				book: {
					id: bookId,
					title: 'book title',
					subtitle: '',
					authors: [],
					imageLinks: { smallThumbnail: '', thumbnail: '' },
					shelf: 'currentlyReading',
					publishedDate: '2023',
					publisher: '',
				},
			})
		);
	}),

	rest.post(`${baseURL}/search`, async (req, res, ctx) => {
		const { query } = await req.json();

		const response = query !== 'empty' ? { books: mockBooks } : { books: { error: 'empty query', items: [] } };

		return res(ctx.status(200), ctx.json(response));
	}),

	rest.put(`${baseURL}/books/:bookId`, async (req, res, ctx) => {
		return res(ctx.status(200), ctx.json({}));
	}),
];
