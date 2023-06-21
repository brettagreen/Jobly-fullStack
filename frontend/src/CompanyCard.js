import './CompanyCard.css'

function ComapnyCard({ company }) {

    return (
        <div className="card">
            <p>{company.name}</p>
            <p>{company.description}</p>
            <div id="imgFloat">
                {company.logoUrl || company.logoUrl !== null ? <img src={company.logoUrl} alt="company logo" /> : null}
            </div>
        </div>
    )
}

export default ComapnyCard;