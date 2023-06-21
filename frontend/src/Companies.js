import { useState, useEffect } from 'react'
import JoblyApi from './api';
import CompanyCard from './CompanyCard';
import SearchForm from './SearchForm';
import './Companies.css';

function Companies() {

    const [companies, setCompanies] = useState(null);

    async function fetchComapnies() {
        const res = await JoblyApi.getCompanies();
        setCompanies(res.companies);
    }

    useEffect(() => {
        fetchComapnies();
    }, []);

    function filterCompanies(searchResults){
        setCompanies(searchResults);
    }

    return (
        <div>
            <SearchForm endpoint="companies" filterObject={filterCompanies} />
            <div className="companyList">
                <ul>
                    {companies ? companies.map((company, idx) => <li key={idx}>{<CompanyCard company={company}/>}</li>) : null}
                </ul>
            </div>
        </div>
    )
}

export default Companies;