import { Route, Navigate, Routes } from "react-router-dom";
import Companies from "./Companies";
import Company from "./Company";
import Jobs from './Jobs';
import Job from './Job';
import Login from "./Login";
import Logout from './Logout';
import Signup from "./Signup";
import Profile from "./Profile";
import Home from './Home';
import UpdateUser from "./UpdateUser";
import Error from './401';

function JoblyRoutes({ profileUpdate, isLoggedIn, updateUserToken }) {

    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/companies" element={<Companies isLoggedIn={isLoggedIn}/>}/>
            <Route path="/companies/:handle" element={<Company isLoggedIn={isLoggedIn}/>}/>
            <Route path="/jobs" element={<Jobs isLoggedIn={isLoggedIn}/>}/>
            <Route path="/jobs/:id" element={<Job />}/>
            <Route path="/signup" element={<Signup updateUserToken={updateUserToken}/>}/>
            <Route path="/login" element={<Login updateUserToken={updateUserToken}/>}/>
            <Route path="/logout" element={<Logout updateUserToken={updateUserToken}/>}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/updateProfile" element={<UpdateUser profileUpdate={profileUpdate}/>}/>
            <Route path="/unauthorized" element={<Error type="error"/>}/>
            <Route path="/badrequest" element={<Error type="nopage"/>}/>
            <Route path="*" element={<Navigate to="/badrequest" replace/>}/>
        </Routes>
    )

}

export default JoblyRoutes;