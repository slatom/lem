import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import { BooksProvider } from './BooksContext';
import './styles/App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <BooksProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details/:slug" element={<DetailsPage />} />
          </Routes>
        </Router>
      </BooksProvider>
    </div>
  );
};

export default App;
