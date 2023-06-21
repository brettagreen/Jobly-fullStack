import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import JoblyApi from './api';
import CompanyCard from './CompanyCard';

function Company() {

    const { id } = useParams();
    const [company, setCompany] = useState(null);

    async function fetchCompany() {
        const res = await JoblyApi.getCompany(id);
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