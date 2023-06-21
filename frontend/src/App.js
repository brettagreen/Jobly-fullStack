import './App.css';
import { BrowserRouter } from 'react-router-dom';
import JoblyRoutes from './JoblyRoutes';
import Nav from './Nav';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Nav />
          <JoblyRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
