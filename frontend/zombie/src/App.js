import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PaymentGateway from './pages/PaymentGateway';
import InteractiveMap from './pages/InteractiveMap';
import Resources from './pages/Resources';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/payment" element={<PaymentGateway/>}/>
      <Route path="/map" element={<InteractiveMap/>} />
      <Route path="/resources" element={<Resources/>} />
    </Routes>
  );
}

export default App;
