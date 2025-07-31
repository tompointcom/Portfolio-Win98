import './App.scss'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Desktop from './pages/DesktopPage/Desktop';

function App() {
  return (
    <div className="container">
    <div className="inner-container">
      <Router>
        <Routes>
          <Route path="/" element={<Desktop />} />
            {/* <Route path="/errorpage" element={<ErrorPage />} /> */}
        </Routes>
      </Router>
    </div>
    </div>
  )
}

export default App