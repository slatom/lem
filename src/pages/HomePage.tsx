import DataTable from '../components/DataTable';
import Header from '../components/Header';
import Breadcrumbs from '../components/Breadcrumbs';

const HomePage: React.FC = () => {
    return (
        <div>
            <Header />
            <Breadcrumbs />
            <DataTable />
        </div>
    );
};

export default HomePage;