import { useState, useEffect } from 'react'
import JoblyApi from './api';
import CompanyCard from './CompanyCard';
import SearchForm from './SearchForm';
import { useNavigate } from 'react-router-dom';
import './css/Companies.css';
import Pagination from './Pagination';

function Companies({ isLoggedIn }) {

    /*PAGINATION STUFF
    CODE TAKEN FROM https://levelup.gitconnected.com/a-simple-guide-to-pagination-in-react-facd6f785bd0*/
    const [currentPage, setCurrentPage] = useState(null);
    // No of Records to be displayed on each page   
    const [recordsPerPage] = useState(10);
    // Records to be displayed on the current page
    const [currentRecords, setCurrentRecords] = useState(null);
    const [nPages, setNPages] = useState(null);

    const history = useNavigate();

    if (!isLoggedIn()) {
        history('/unauthorized');
    }

    const [companies, setCompanies] = useState(null);

    async function fetchComapnies() {
        const res = await JoblyApi.getCompanies();
        setCompanies(res.companies);
        setCurrentPage(1);
    }

    useEffect(() => {
        fetchComapnies();
    }, []);

    useEffect(() => {
        function paginate() {
            if (companies) {
                setCurrentRecords(companies.slice((currentPage * recordsPerPage) - recordsPerPage, currentPage * recordsPerPage));
                setNPages(Math.ceil(companies.length / recordsPerPage));
            }
        }
        paginate();

    }, [currentPage]);

    function filterCompanies(searchResults){
        setCurrentRecords(searchResults);
    }

    return (
        <div>
            <SearchForm endpoint="companies" filterObject={filterCompanies} />
            <div className="companyList">
                <ul>
                    {currentRecords ? currentRecords.map((company, idx) => <li key={idx}>{<CompanyCard company={company}/>}</li>) : null}
                </ul>
            </div>
            {currentRecords ? <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/> : null}
        </div>
    )
}

export default Companies;