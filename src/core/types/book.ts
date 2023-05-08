import { Shelves } from './shelves';

export type Book = {
	id: string;
	title: string;
	subtitle: string;
	authors?: string[];
	imageLinks?: { smallThumbnail: string; thumbnail: string };
	shelf: Shelves;
	publishedDate: string;
	publisher: string;
};
