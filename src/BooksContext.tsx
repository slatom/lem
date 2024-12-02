import React, { createContext, useState, ReactNode } from 'react';
import { Book } from './types/book'; 

interface BooksContextType {
  books: Book[];
  addBooks: (newBooks: Book[]) => void;
  findBookById: (id: string) => Book | undefined;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);

  const addBooks = (newBooks: Book[]) => {
    setBooks((prevBooks) => [...prevBooks, ...newBooks]);
  };

  const findBookById = (id: string) => {
    return books.find((book) => book.id === id);
  };

  return (
    <BooksContext.Provider value={{ books, addBooks, findBookById }}>
      {children}
    </BooksContext.Provider>
  );
};

export { BooksContext };