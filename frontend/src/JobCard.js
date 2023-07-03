import './css/JobCard.css';
import JoblyApi from './api';
import { useContext } from 'react';
import UserContext from "./userContext";

function JobCard({ job, setProfileJobs }) {

    const { user, setCurrentUser } = useContext(UserContext);

    async function apply() {
        const result = await JoblyApi.applyToJob(user.username, job.id);
        let newApplications = [...user.applications, result.applied];
        user.applications = newApplications;
        setCurrentUser(user.username);
    }

    async function unapply() {
        const result = await JoblyApi.unapplyFromJob(user.username, job.id);
        let newApplications = [...user.applications].filter(jobId => jobId !== result.unapplied);
        user.applications = newApplications;
        setProfileJobs(job.id);
        setCurrentUser(user.username);
    }

    function returnButton() {                
        
        if (!user.applications.includes(job.id)) {
            return <button className="apply" onClick={apply}>Apply to job</button>;
        } else {
            return <button className="unapply" onClick={unapply}>Unapply from job</button>
        }
    }

    function manipulateSalary() {
        if (job.salary) {
            return "$" + (job.salary).toLocaleString();
        } else {
            return "unlisted";
        }
    }

    return (
        <div className="card">
            <p><b><i>{job.title}</i></b></p>
            <p><b>salary:</b> {manipulateSalary()}</p>
            <p><b>equity score:</b> {job.equity || "unlisted"}</p>
            {returnButton()}
        </div>
    )
}

export default JobCard;