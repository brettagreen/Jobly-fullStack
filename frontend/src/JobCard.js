import './css/JobCard.css';
import JoblyApi from './api';
import { useContext } from 'react';
import UserContext from "./userContext";

function JobCard({ job }) {

    const { user, setCurrentUser } = useContext(UserContext);

    async function apply() {
        console.log('user.username', user.username);
        console.log('job.id', job.id);
        const result = await JoblyApi.applyToJob(user.username, job.id);
        let newApplications = [...user.applications, result.applied];
        user.applications = newApplications;
        setCurrentUser(user.username);
    }

    return (
        <div className="card">
            <p>{job.title}</p>
            <p>salary: {job.salary}</p>
            <p>equity score: {job.equity}</p>
            {!user.applications.includes(job.id) ? <button onClick={apply}>Apply to job</button> : null}
        </div>
    )
}

export default JobCard;