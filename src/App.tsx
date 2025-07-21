import './App.css'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Desktop from './pages/DesktopPage/Desktop';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Desktop />} />
        {/* <Route path="/errorpage" element={<ErrorPage />} /> */}
      </Routes>
    </Router>
  )
}

export default App
