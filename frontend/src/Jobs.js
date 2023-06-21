import { useState, useEffect } from 'react'
import JoblyApi from './api';
import JobCard from './JobCard';
import SearchForm from './SearchForm';
import './Jobs.css';

function Jobs() {

    const [jobs, setJobs] = useState(null);

    async function fetchJobs() {
        const res = await JoblyApi.getJobs();
        setJobs(res.jobs);
    }

    useEffect(() => {
        fetchJobs();
    }, []);

    function filterJobs(searchResults){
        setJobs(searchResults);
    }

    return (
        <div>
            <SearchForm endpoint="jobs" filterObject={filterJobs} />
            <div className="jobList">
                <ul>
                    {jobs ? jobs.map((job, idx) => <li key={idx}>{<JobCard job={job}/>}</li>) : null}
                </ul>
            </div>
        </div>
    )
}

export default Jobs;