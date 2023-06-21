import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import JoblyApi from './api';
import JobCard from './JobCard';

function Job() {

    const { id } = useParams();
    const [job, setJob] = useState(null);

    async function fetchJob() {
        const res = await JoblyApi.getJob(id);
        console.log('res.job', res.job);
        setJob(res.job);
    }

    useEffect(() => {
        fetchJob();
    }, [])
    
    return (
        <>
            {job ? <JobCard job={job}/> : null}
        </>
    )

}

export default Job;