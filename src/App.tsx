import './App.scss'
import { Route, Routes } from 'react-router-dom';
import Desktop from './pages/DesktopPage/Desktop';
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <div className="container">
    <div className="inner-container">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Desktop />} />
            {/* <Route path="/errorpage" element={<ErrorPage />} /> */}
        </Routes>
      </HashRouter>
    </div>
    </div>
  )
}

export default App