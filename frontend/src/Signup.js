import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from "./userContext";
import JoblyApi from './api';

function Signup({ updateUserToken }) {

    const INITIAL_STATE = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
      }

    const setCurrentUser = useContext(UserContext).setCurrentUser;

    const [form, setForm] = useState(INITIAL_STATE);
    const invalidFields = useRef();
    const history = useNavigate();

    function handleChange(event) {
        setForm(form => ({...form, [event.target.name]: event.target.value}))
    }

    async function submitAndClear(event) {
        event.preventDefault();
        let error = false;

        let allAnswered = Object.values(form).every(item => {
            return item !== '';
        });

        if (!allAnswered) {
            error = true;
            invalidFields.current.hidden = false;
        }

        if (!error) {
            const userToken = await JoblyApi.registerUser(form);
            JoblyApi.token = userToken.token;
            updateUserToken(userToken.token);
            setCurrentUser(form.username)
            setForm(INITIAL_STATE);
            history('/');
        }

    }

    return (
        <>
            <h3 className="textInfo">Resigter your account</h3>
            <h5 hidden style={{color: 'red'}} ref={invalidFields}>All fields must contain a value!</h5>
            <form className="form" onSubmit={submitAndClear}>
                <label htmlFor="username">username:  </label>
                <input type="text" id="username" name="username" value={form.username} onChange={handleChange} /><br /><br />
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

export default Signup;