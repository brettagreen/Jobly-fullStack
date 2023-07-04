import UserContext from "./userContext"
import { useContext } from 'react';

function Home() {

    const user = useContext(UserContext).user;

    return (
        <>
            {user ? <h2 className="textInfo">Welcome {user.firstName}!</h2> : <h2 className="textInfo">Register or log in to get started!</h2>}
        </>
    )
}

export default Home