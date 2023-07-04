import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import JoblyApi from './api';
import CompanyCard from './CompanyCard';

function Company({ isLoggedIn }) {

    const history = useNavigate();

    if (!isLoggedIn()) {
        history('/unauthorized');
    }

    const { handle } = useParams();
    const [company, setCompany] = useState(null);
    const [error, setError] = useState(null);

    async function fetchCompany() {
        try {
            const res = await JoblyApi.getCompany(handle);
            setCompany(res.company);
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        fetchCompany();
    }, [])
    
    return (
        <>
            {company ? <CompanyCard company={company} /> : <h1>{error}</h1>}
        </>
    )

}

export default Company