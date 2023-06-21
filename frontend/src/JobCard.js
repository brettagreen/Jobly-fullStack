import './JobCard.css';

function JobCard({ job }) {

    return (
        <div className="card">
            <p>{job.title} with {job.companyName}</p>
            <p>salary: {job.salary}</p>
            <p>equity score: {job.equity}</p>
        </div>
    )
}

export default JobCard;