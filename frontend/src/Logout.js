import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import JoblyApi from './api';
import UserContext from './userContext';

function Logout({ updateUserToken }) {

    const history = useNavigate();
    const setCurrentUser = useContext(UserContext).setCurrentUser;
    
    useEffect(() => {
        JoblyApi.token = '';
        updateUserToken(null);
        setCurrentUser(null);
        history('/');
    }, []);

}

export default Logout;