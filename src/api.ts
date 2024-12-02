import axios, { AxiosResponse } from 'axios';

const API_URL = 'https://www.googleapis.com/books/v1/volumes';
const MAX_RESULTS = 15;

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description?: string;
    publishedDate?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface FetchBooksResponse {
  books: Book[];
  hasNextPage: boolean;
}

export const fetchBooks = async (
  startIndex: number = 0,
  maxResults: number = MAX_RESULTS
): Promise<FetchBooksResponse> => {
  try {
    const response: AxiosResponse = await axios.get(API_URL, {
      params: {
        q: 'inauthor:"Stanislaw Lem"',
        startIndex: startIndex,
        maxResults: maxResults,
      },
    });

    const books: Book[] = response.data.items || [];
    const totalItems: number = response.data.totalItems || 0;
    const hasNextPage: boolean = startIndex + maxResults < totalItems;

    return { books, hasNextPage };
  } catch (error) {
    //console.error('Error fetching books', error);
    throw error;
  }
};

export const fetchBookById = async (id: string): Promise<Book | undefined> => {
  try {
    const response: AxiosResponse = await axios.get(`${API_URL}/${id}`);
    const book: Book = response.data;
    return book;
  } catch (error) {
    //console.error('Error fetching book by id:', error);
    return undefined;
  }
};