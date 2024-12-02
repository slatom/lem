import React, { useEffect, useState, useContext, useCallback } from 'react';
import { fetchBooks } from '../api';
import { Link } from 'react-router-dom';
import '../styles/DataTable.scss';
import '../styles/ButtonRectangle.scss';
import { BooksContext } from '../BooksContext';

interface VolumeInfo {
  title: string;
  authors?: string[];
  description?: string;
  publishedDate?: string;
  publisher?: string;
  language?: string; 
  imageLinks?: {
    thumbnail?: string;
  };
}

interface Book {
  id: string;
  volumeInfo: VolumeInfo; 
}

interface BooksContextType {
  books: Book[];
  addBooks: (newBooks: Book[]) => void;
}

const DataTable: React.FC = () => {
  const { books, addBooks } = useContext(BooksContext) as BooksContextType;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadBooks = useCallback(async () => {
    setIsLoading(true);
    try {
      const { books: fetchedBooks, hasNextPage: fetchedHasNextPage } = await fetchBooks(books.length);
      addBooks(fetchedBooks);
      setHasNextPage(fetchedHasNextPage);
    } catch (error) {
      setError('Error loading books');
    } finally {
      setIsLoading(false);
    }
  }, [books.length, addBooks]);

  useEffect(() => {
    if (books.length === 0) {
      loadBooks();
    }
  }, [books, loadBooks]);

  const generateSlug = (title: string, id: string): string => {
    return `${title.replace(/ /g, '-')}-${id}`;
  };

  let infoMessage: string | null = null;

  if (isLoading) {
    infoMessage = 'Loading...';
  } else if (error) {
    infoMessage = error;
  }

  return (
    <div className="DataTable">
      <div className="DataTable__header">
        <div className="DataTable__tableRow DataTable__tableRow--header">
          <div className="DataTable__title">
            <div className="DataTable__cell DataTable__cell--title">Title</div>
          </div>
          <div className="DataTable__details">
            <div className="DataTable__cell DataTable__cell--date">Date</div>
            <div className="DataTable__cell DataTable__cell--publisher">Publisher</div>
            <div className="DataTable__cell DataTable__cell--language">Language</div>
          </div>
        </div>
      </div>

      <ul className="DataTable__table">
        {books && books.map((book) => (
          <li key={book.id} className="DataTable__item">
            <Link to={`/details/${generateSlug(book.volumeInfo.title, book.id)}`} className="DataTable__tableRow">
              <div className="DataTable__title">
                <div className="DataTable__cell DataTable__cell--title">{book.volumeInfo.title}</div>
              </div>
              <div className="DataTable__details">
                <div className="DataTable__cell DataTable__cell--date">{book.volumeInfo.publishedDate}</div>
                <div className="DataTable__cell DataTable__cell--publisher">{book.volumeInfo.publisher}</div>
                <div className="DataTable__cell DataTable__cell--language">{book.volumeInfo.language}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {infoMessage && (
        <div className="Infobox">
          <div className="Infobox__message">{infoMessage}</div>
        </div>
      )}

      <div className="DataTable__loadMore">
        <div className="DataTable__loadMoreButton">
          <button
            className={`ButtonRectangle ${isLoading || !hasNextPage ? 'ButtonRectangle--hidden' : ''}`}
            onClick={loadBooks}
          >
            <span className="ButtonRectangle__label">Load More</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;