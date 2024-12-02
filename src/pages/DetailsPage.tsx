
import BookDetails from '../components/BookDetails';
import Header from '../components/Header';
import Breadcrumbs from '../components/Breadcrumbs';

const DetailsPage: React.FC = () => {
    return (
        <div>
            <Header />
            <Breadcrumbs />
            <BookDetails />
        </div>
    );
};

export default DetailsPage;