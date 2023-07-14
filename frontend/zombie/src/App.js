import { Route, Routes, Router } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PaymentGateway from './pages/PaymentGateway';
import InteractiveMap from './pages/InteractiveMap';
import Resources from './pages/Resources';
import Ing from './pages/Ing';
import Coc from './pages/Coc';
import Fam from './pages/Fam';
import Sections from './pages/Sections';


function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/payment" element={<PaymentGateway/>}/>
        <Route path="/map" element={<InteractiveMap/>} />
        <Route path="/resources" element={<Resources/>} />
        <Route path="/guide" element={<Sections/>} />
        <Route path="/guide/ing" element={<Ing/>} />
        <Route path="/guide/coc" element={<Coc/>} />
        <Route path="/guide/fam" element={<Fam/>} />
      </Routes>
  );
}

export default App;
