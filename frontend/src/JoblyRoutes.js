import { Route, Navigate, Routes } from "react-router-dom";
import Companies from "./Companies";
import Company from "./Company";
import Jobs from './Jobs';
import Job from './Job';
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Home from './Home';

function JoblyRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/companies" element={<Companies />}/>
            <Route path="/companies/:id" element={<Company />}/>
            <Route path="/jobs" element={<Jobs />}/>
            <Route path="/jobs/:id" element={<Job />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/" element={<Navigate replace to="/" />}/>
        </Routes>
    )

}

export default JoblyRoutes;