import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import JoblyApi from './api';
import UserContext from './userContext';

function Login({ updateUserToken }) {

    const INITIAL_STATE = {
        username: '',
        password: ''
    }

    const setCurrentUser = useContext(UserContext).setCurrentUser;

    const [form, setForm] = useState(INITIAL_STATE);
    const history = useNavigate();

    function handleChange(event) {
        setForm(form => ({...form, [event.target.name]: event.target.value}));
    }

    async function submitAndClear(event) {
        event.preventDefault();

        let allAnswered = Object.values(form).every(item => {
            return item !== '';
        });

        if (allAnswered) {
            const userToken = await JoblyApi.loginUser(form);
            updateUserToken(userToken.token);
            setCurrentUser(form.username);
            setForm(INITIAL_STATE);
            history('/');
        }

    }

    return (
        <>
            <h3>Account login</h3>
            <form className="form" onSubmit={submitAndClear}>
                <label htmlFor="username">username: </label>
                <input type="text" id="username" name="username" value={form.username} onChange={handleChange} /><br />
                <label htmlFor="password">password: </label>
                <input type="password" id="password" name="password" value={form.password} onChange={handleChange} /><br />
                <button>submit</button>
            </form>
        </>
    )

}

export default Login;