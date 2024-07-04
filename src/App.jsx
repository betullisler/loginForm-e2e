
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './components/Login';
import Success from './components/Success';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='content-section'>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/success" element={<Success />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
