import './css/App.css';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import JoblyRoutes from './JoblyRoutes';
import JoblyApi from './api';
import Nav from './Nav';
import UserContext from "./userContext";

function App() {

  function getLocalStorage() {
      const token = localStorage.getItem('userToken');
      const user = JSON.parse(localStorage.getItem('user'));

      JoblyApi.token = token

      return [token, user];
  }

  const [localToken, localUser] = getLocalStorage();

  const [userToken, setUserToken] = useState(localToken);
  const [user, setUser] = useState(localUser);

  function updateUserToken(value) {
    localStorage.setItem('userToken', value);
    JoblyApi.token = value
    setUserToken(value);
  }

  async function setCurrentUser(username) {
    if (!username) {
      localStorage.setItem('user', null);
      setUser(null);
    } else {
      const thisUser = await JoblyApi.getUser(username);
      localStorage.setItem('user', JSON.stringify(thisUser.user));
      setUser(thisUser.user);
    }

  }

  function profileUpdate(newUser) {
    setUser(newUser);
  }

  function isLoggedIn() {
    return user;
  }

  return (
    <UserContext.Provider value={{user, setCurrentUser}}>
      <div className="App">
        <BrowserRouter>
            <Nav userToken={userToken}/>
            <JoblyRoutes profileUpdate={profileUpdate} isLoggedIn={isLoggedIn} updateUserToken={updateUserToken}/>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
