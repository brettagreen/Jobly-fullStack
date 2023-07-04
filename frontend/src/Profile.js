import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import UserContext from './userContext';
import JoblyApi from './api';
import JobCard from './JobCard';
import './css/ProfileCard.css';

function Profile() {

    const user = useContext(UserContext).user;
    const [jobs, setJobs] = useState(null);

    /*const jobs = (async () => {
        const jobPromises = user.applications.map((jobId) => JoblyApi.getJob(jobId));
        console.log('jobPromises1', jobPromises);
        let result = await Promise.all(jobPromises);
        console.log('result', result);
        return result;
    })();*/

    useEffect(() => {
       async function loadJobs() {
            const jobPromises = user.applications.map((jobId) => JoblyApi.getJob(jobId));
            let result = await Promise.all(jobPromises);
            setJobs(result);
        }
        loadJobs();
    }, []);


    function setProfileJobs(jobId) {
        setJobs(() => {
            return [...jobs].filter(job =>  job.job.id !== jobId);
        })
    }

    return (
        <div>
            <div className="profileCard">
                <p><b>Username:</b> {user.username}</p>
                <p><b>First name:</b> {user.firstName}</p>
                <p><b>Last name:</b> {user.lastName}</p>
                <p><b>Email:</b> {user.email}</p>
                <Link to="/updateProfile"><button id="profileButton">Edit profile</button></Link>
            </div>
            <br /><br />
            {jobs ? <h3 className="textInfo">Here are the jobs you've applied to.</h3> : null}
            {jobs ? jobs.map((job,idx) => <JobCard key={idx} job={job.job} setProfileJobs={setProfileJobs}/>) : null}
        </div>
    )
}

export default Profile;