export type Book = {
    id: string;
    title: string;
    subtitle: string;
    authors: string[];
    imageLinks: { smallThumbnail: string, thumbnail: string };
    shelf: 'currentlyReading' | 'wantToRead' | 'read';
    publishedDate: string;
    publisher: string;
}