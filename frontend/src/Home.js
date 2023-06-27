import UserContext from "./userContext"
import { useContext } from 'react';

function Home() {

    const user = useContext(UserContext).user;

    return (
        <>
            {user ? <h2>Welcome back, {user.firstName}.</h2> : <h2>Register or log in to get started!</h2>}
        </>
    )
}

export default Home