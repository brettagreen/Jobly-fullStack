import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from './userContext';
import JoblyApi from './api';
import JobCard from './JobCard';

function Profile() {

    const user = useContext(UserContext).user;

    const jobs = (async () => {
        const jobPromises = user.applications.map((jobId) => JoblyApi.getJob(jobId));
        console.log('jobPromises1', jobPromises);
        let result = await Promise.all(jobPromises);
        console.log('result', result);
        return result;
    })();

    console.log('jobs', jobs);

    return (
        <>
            <p>Username: {user.username}</p>
            <p>First name: {user.firstName}</p>
            <p>Last name: {user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Applications:</p>
            {jobs.map(job => <JobCard job={job.job}/>)}

            <Link to="/updateProfile"><button>Edit profile</button></Link>
        </>
    )
}

export default Profile;