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

    async function fetchCompany() {
        const res = await JoblyApi.getCompany(handle);
        setCompany(res.company);
    }

    useEffect(() => {
        fetchCompany();
    }, [])
    
    return (
        <>
            {company ? <CompanyCard company={company} /> : null}
        </>
    )

}

export default Company