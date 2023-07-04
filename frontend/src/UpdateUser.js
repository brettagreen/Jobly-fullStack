import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import JoblyApi from './api';
import UserContext from './userContext';
import './css/UpdateUser.css';

function UpdateUser({ profileUpdate }) {

    const user = useContext(UserContext).user;
    
    const INITIAL_STATE = {
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }

    const CLEANUP_STATE = {
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    }

    const [form, setForm] = useState(INITIAL_STATE);
    const history = useNavigate();

    function handleChange(event) {
        setForm(form => ({...form, [event.target.name]: event.target.value}))
    }

    async function submitAndClear(event) {
        event.preventDefault();

        const newUser = await JoblyApi.updateProfile(user.username, form);
        profileUpdate(newUser.user);
        setForm(CLEANUP_STATE);
        history('/profile');

    }

    return (
        <>
            <h3>Update your profile</h3>
            <form className="form" onSubmit={submitAndClear}>
                <label htmlFor="username">username: </label>
                <input type="text" className="readOnlyInput" id="username" name="username" value={user.username} onChange={handleChange} readOnly={true} /><br /><br />
                <label htmlFor="password">password: </label>
                <input type="password" id="password" name="password" value={form.password} onChange={handleChange} /><br /><br />
                <label htmlFor="firstName">first name: </label>
                <input type="text" id="firstName" name="firstName" value={form.firstName} onChange={handleChange} /><br /><br />
                <label htmlFor="lastName">last name: </label>
                <input type="text" id="lastName" name="lastName" value={form.lastName} onChange={handleChange} /><br /><br />
                <label htmlFor="email">email: </label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} /><br /><br />
                <button>submit</button>
            </form>
        </>
    )

}

export default UpdateUser;