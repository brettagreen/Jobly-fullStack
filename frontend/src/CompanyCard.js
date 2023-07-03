import './css/CompanyCard.css'
import JobCard from './JobCard';
import { Link } from 'react-router-dom';

function ComapnyCard({ company }) {
    console.log('company', company);

    return (
        <div className="card">
            <p>{company.name}</p>
            <p>{company.description}</p>
            {/* <div id="imgFloat">
                {company.logoUrl ? <img src={company.logoUrl} alt="company logo" /> : null}
            </div> */}
            {company.jobs ? <p><b>We are hiring for the following positions:</b></p> : <Link to={`/companies/${company.handle}`}><button>We're Hiring</button></Link>}
            {company.jobs ? company.jobs.map((job) => <JobCard job={job}/>) : null}
        </div>
    )
}

export default ComapnyCard;