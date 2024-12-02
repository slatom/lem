import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookById } from '../api';
import { Slug } from '../types/slug'; 
import { Book } from '../types/book';
import { BooksContext } from '../BooksContext';
import '../styles/BookDetails.scss';
import '../styles/TextLink.scss';
import '../styles/Infobox.scss';


const BookDetails: React.FC = () => {
  const { slug } = useParams<Slug>();
  const context = useContext(BooksContext);
  const findBookById = context?.findBookById;
  
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const idhash = slug?.split('-').pop();

    const getBook = async () => {
      setIsLoading(true);
      if (idhash && findBookById) {
        const selectedBook = findBookById(idhash);
        if (selectedBook) {
          setBook(selectedBook);
        } else {
          try {
            const fetchedBook = await fetchBookById(idhash);
            if (fetchedBook) {
              setBook(fetchedBook);
            } else {
              setError('Book not found.');
            }
          } catch (error) {
            setError('Error fetching book details');
          }
        }
      }
      setIsLoading(false);
    };

    if (slug) {
      getBook();
    }

    return () => {
      setIsLoading(false);
    };

  }, [slug, findBookById]);

  // Remove HTML tags from book description
  const regex = /<[^>]*>/g;

  let infoMessage: string | null = null;

  if (!slug) {
    infoMessage = 'No book selected.';
  } else if (isLoading) {
    infoMessage = 'Loading...';
  } else if (error) {
    infoMessage = error;
  } else if (!book || !book.volumeInfo) {
    infoMessage = 'Book details not available.';
  }

  if (infoMessage) {
    return (
      <div className="Infobox">
        <div className="Infobox__message">{infoMessage}</div>
      </div>
    );
  }
  
  return (
    <div className="BookDetails">
      <div className="BookDetails__info">
        <h1 className="BookDetails__title">{book?.volumeInfo.title}</h1>
        <h2 className="BookDetails__authors">
          {book?.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : ''}
        </h2>
        <div className="BookDetails__description">
          {book?.volumeInfo.description ? book.volumeInfo.description.replace(regex, "") : ""}
        </div>
        <p className="BookDetails__additionalInfo">Published Date: {book?.volumeInfo.publishedDate}</p>
        <p className="BookDetails__additionalInfo">Publisher: {book?.volumeInfo.publisher}</p>
        <p className="BookDetails__additionalInfo">Pages: {book?.volumeInfo.pageCount}</p>
        {book?.volumeInfo.canonicalVolumeLink && (
          <div className="BookDetails__additionalInfo">
            <a
              href={book.volumeInfo.canonicalVolumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="BookDetails__link TextLink"
            >
              See on Google Books
            </a>
          </div>
        )}
      </div>
      <div className="BookDetails__media">
        {book?.volumeInfo.imageLinks && (
          <img
            className="BookDetails__image"
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
          />
        )}
      </div>
    </div>
  );
};

export default BookDetails;