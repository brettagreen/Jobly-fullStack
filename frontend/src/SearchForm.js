import './css/SearchForm.css';
import { useState } from 'react';
import JoblyApi from './api';

function SearchForm({ endpoint, filterObject }) {

    const [searchForm, setSearchForm] = useState('');

    //singular form of endpoint. eg. companies --> company
    const singular = endpoint === 'companies' ? 'company' : 'job';

    function handleChange(event) {
        setSearchForm(event.target.value);
    }

    async function searchSubmit(event) {
        event.preventDefault();
        let searchResults;
        let res;

        if (endpoint === 'companies') {
            console.log('searchForm', searchForm);
            res = await JoblyApi.getCompanies();
            searchResults = res.companies.filter(company => company.name.toLowerCase().includes(searchForm.toLowerCase()));
        } else {
            res = await JoblyApi.getJobs();
            searchResults = res.jobs.filter(job => job.title.toLowerCase().includes(searchForm.toLowerCase()));  
        }
        
        filterObject(searchResults);
        setSearchForm('');
    }

    return (
        <form className="form" onSubmit={searchSubmit}>
            <input type="text" id="searchInput" placeholder={`search for a ${singular}`} name={`${singular}Search`}
                    value={searchForm} onChange={handleChange} />&nbsp;
            <button>submit</button>
        </form>
    )

}

export default SearchForm;