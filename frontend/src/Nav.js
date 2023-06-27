import { NavLink } from "react-router-dom";
import './css/Nav.css';

function Nav({ userToken }) {

    console.log('nav.userToken', userToken);

    return (
        <nav>
            <NavLink id="navLeft" className="navBarLink" exact="true" to="/">Home</NavLink>&nbsp;&nbsp;
            <span id="navRight">
                <NavLink className="navBarLink" exact="true" to="/companies">Companies</NavLink>&nbsp;&nbsp;
                <NavLink className="navBarLink" exact="true" to="/jobs">Jobs</NavLink>&nbsp;&nbsp;
                {userToken !== null ?
                    <>
                        <NavLink className="navBarLink" exact="true" to="/profile">Profile</NavLink>&nbsp;&nbsp;
                        <NavLink className="navBarLink" exact="true" to="/logout">Log out</NavLink>&nbsp;&nbsp;
                    </>
                    :
                    <>   
                        <NavLink className="navBarLink" exact="true" to="/signup">Create an account</NavLink>&nbsp;&nbsp;
                        <NavLink className="navBarLink" exact="true" to="/login">Log in</NavLink>&nbsp;&nbsp;
                    </>
                }
            </span>
        </nav>
      );
}

export default Nav;