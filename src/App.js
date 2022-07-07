import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './styles/app.scss';
import Navbar from './components/Navbar.js'
import Home from './components/Home';
import Orders from './components/Orders';
import MakeOrder from './components/MakeOrder';
import Help from './components/Help';
import Feedback from './components/Feedback';

function App() {
  return (
    <Router>
      <div className='App'>
        <div className='App__flex'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sifarisler' element={<Orders />} />
            <Route path='/sifarisver' element={<MakeOrder />} />
            <Route path='/komek' element={<Help />} />
            <Route path='/rey' element={<Feedback />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
