import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Slug } from '../types/slug'; 
import '../styles/Breadcrumbs.scss';

const Breadcrumbs: React.FC = () => {
  const { slug } = useParams<Slug>();
  const title = slug ? slug.split('-').slice(0, -1).join(' ') : 'Book Details';

  return (
    <div className="Breadcrumbs">
      <span className="Breadcrumbs__separator">{'/'}</span>
      <Link className="Breadcrumbs__link TextLink" to="/">Home</Link>
      {slug && (
        <>
          <span className="Breadcrumbs__separator">{'/'}</span>
          <span className="Breadcrumbs__part">{title}</span>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;