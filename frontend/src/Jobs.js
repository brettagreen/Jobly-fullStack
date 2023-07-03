import { useState, useEffect } from 'react'
import JoblyApi from './api';
import JobCard from './JobCard';
import SearchForm from './SearchForm';
import { useNavigate } from 'react-router-dom';
import './css/Jobs.css';
import Pagination from './Pagination';

function Jobs( { isLoggedIn }) {

    /*PAGINATION STUFF
    INSPIRATION AND CODE TAKEN FROM https://levelup.gitconnected.com/a-simple-guide-to-pagination-in-react-facd6f785bd0*/
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

    const [jobs, setJobs] = useState(null);

    async function fetchJobs() {
        const res = await JoblyApi.getJobs();
        setJobs(res.jobs);
        setCurrentPage(1);
    }

    useEffect(() => {
        fetchJobs();
    }, []);

    useEffect(() => {
        function paginate() {
            if (jobs) {
                console.log('jobs', jobs);
                console.log('currentPage', currentPage);
                console.log('recordsPerPage', recordsPerPage);
                setCurrentRecords(jobs.slice((currentPage * recordsPerPage) - recordsPerPage, currentPage * recordsPerPage));
                setNPages(Math.ceil(jobs.length / recordsPerPage));
            }
        }

        paginate();

    }, [currentPage]);

    function filterJobs(searchResults) {
        setCurrentRecords(searchResults);
    }

    return (
        <div>
            <SearchForm endpoint="jobs" filterObject={filterJobs} />
            <div className="jobList">
                <ul>
                    {currentRecords ? currentRecords.map((job, idx) => <li key={idx}>{<JobCard job={job}/>}</li>) : null}
                </ul>
            </div>
            {currentRecords ? <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/> : null}
        </div>
    )
}

export default Jobs;