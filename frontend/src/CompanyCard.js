import './css/CompanyCard.css'
import JobCard from './JobCard';

function ComapnyCard({ company }) {
    console.log('company', company);

    return (
        <div className="card">
            <p>{company.name}</p>
            <p>{company.description}</p>
            <div id="imgFloat">
                {company.logoUrl ? <img src={company.logoUrl} alt="company logo" /> : null}
            </div>
            <p>We're hiring!</p>
            {company.jobs.map((job) => <JobCard job={job}/>)}
        </div>
    )
}

export default ComapnyCard;