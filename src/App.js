import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateTeacher from './pages/Teacher/CreateTeacher';
import CreateStudent from './pages/Student/CreateStudent';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <Home />}></Route>
          <Route path="/teacher/create" element={ <CreateTeacher />}></Route>
          <Route path="/student/create" element={ <CreateStudent />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
