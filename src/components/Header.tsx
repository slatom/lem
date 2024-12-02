import { Link } from 'react-router-dom';
import '../styles/Header.scss'; 

const Header: React.FC = () => {
    return (
        <header className="Header">
            <Link to="/" className="Header__link" aria-label="Go to homepage">
                <h1 className="Header__headline">Stanislaw Lem's books</h1>
            </Link>
        </header>
    );
};

export default Header;