import axios from "axios";
import { Book } from "../types/book";

const headers = {Authorization: 'token'};

export const getAllBooks = async () => {
    const response = await axios.get("https://reactnd-books-api.udacity.com/books", {headers});
    const books = response.data.books as Book[];
    return books;
}