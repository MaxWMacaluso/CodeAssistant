import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// TODO: Replace with page once applicable
import TextBox from './components/TextBox';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<TextBox name="Max"/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
