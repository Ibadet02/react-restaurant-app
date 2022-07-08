import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './styles/app.scss';
import Navbar from './components/Navbar.js'
import Home from './components/Home';
import Orders from './components/Orders';
import MakeOrder from './components/MakeOrder';
import Help from './components/Help';
import Feedback from './components/Feedback';

function App() {
  const [server, setServer] = useState(null)
  useEffect(()=>{
    fetch('http://localhost:8000/data')
    .then(res=>res.json())
    .then(d=>{
      setServer(d)
    })
  },[])
  return (
    <Router>
      <div className='App'>
        <div className='App__flex'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sifarisler' element={<Orders />} />
            <Route path='/sifarisver' element={server && <MakeOrder api = {server} />} />
            <Route path='/komek' element={<Help />} />
            <Route path='/rey' element={<Feedback />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
