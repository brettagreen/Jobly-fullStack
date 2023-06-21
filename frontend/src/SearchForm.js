import './SearchForm.css';
import { useState } from 'react';
import JoblyApi from './api';

function SearchForm({ endpoint, filterObject }) {

    const [searchForm, setSearchForm] = useState('');

    //singular form of endpoint. eg. companies --> company
    const singular = endpoint === 'companies' ? 'company' : 'job';
    console.log("I'm logged every time there's a keystroke");

    function handleChange(event) {
        setSearchForm(event.target.value);
    }

    async function searchSubmit(event) {
        event.preventDefault();
        let searchResults;
        let res;

        if (endpoint === 'companies') {
            res = await JoblyApi.getCompanies();
            searchResults = res.companies.filter(company => company.name.toLowerCase().includes(searchForm.toLowerCase()));

        } else {
            res = await JoblyApi.getJobs();
            searchResults = res.jobs.filter(job => job.title.toLowerCase().includes(searchForm.toLowerCase()));  
        }
        console.log('searchResults', searchResults);
        
        filterObject(searchResults);
        setSearchForm('');
    }

    return (
        <form id="form" onSubmit={searchSubmit}>
            <input type="text" id="searchInput" placeholder={`search for a ${singular}`} name={`${singular}Search`}
                    value={searchForm} onChange={handleChange} />&nbsp;
            <button>submit</button>
        </form>
    )

}

export default SearchForm;