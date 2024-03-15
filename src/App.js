import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './component/Home';
import AddPlant from './component/AddPlant';
import Profil from './component/Profil';
import PlanteDetails from './component/PlanteDetails';
import PlantOffers from './component/PlantOffers';
import Login from './component/Login';
import useStore from './store/Store';
import Register from './component/Register';

function App() {
  const { isLoggedIn } = useStore();

  return (
    <Router>
      <Routes>
        {/* Les routes protégées doivent être placées sous le navigateur */}
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/addplant" element={<AddPlant />} />
        <Route path="/plantedetails" element={<PlanteDetails />} />
        <Route path="/plantoffers" element={<PlantOffers />} />
        {/* La route de connexion ne doit pas être protégée */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Utilisez un Navigate conditionnel pour rediriger si l'utilisateur n'est pas connecté */}
        {!isLoggedIn && <Route path="*" element={<Navigate to="/login" />} />}
      </Routes>
    </Router>
  );
}

export default App;
