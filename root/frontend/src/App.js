import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Added for bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// PAGES
import MainPage from './pages/MainPage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
