import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './component/Home';
import AddPlant from './component/AddPlant';
import Profil from './component/Profil';
import PlanteDetails from './component/PlanteDetails';
import PlantOffers from './component/PlantOffers';
import Login from './component/Login';
import Register from './component/Register';
import useStore from './store/Store';

function App() {
  const store = useStore(); 
  const isLoggedIn = store.isLoggedIn;

  return (
    <Router>
      <AppRoutes isLoggedIn={isLoggedIn} />
    </Router>
  );
}

function AppRoutes({ isLoggedIn }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoggedIn && window.location.pathname !== '/register') {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/addplant" element={<AddPlant />} />
      <Route path="/plantedetails" element={<PlanteDetails />} />
      <Route path="/plantoffers" element={<PlantOffers />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
