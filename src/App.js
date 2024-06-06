import React,{useEffect} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./component/Home";
import AddPlant from "./component/AddPlant";
import Profil from "./component/Profil";
import PlanteDetails from "./component/PlanteDetails";
import PlantOffers from "./component/PlantOffers";
import Login from "./component/Login";
import Register from "./component/Register";
import useStore from "./store/Store";
import Map from "./component/Map";
import OfferDetails from "./component/OfferDetails";
import Cgu from "./component/Cgu";

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

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (!isLoggedIn && currentPath !== "/register" && !currentPath.startsWith("/cgu")) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/addplant" element={<AddPlant />} />
      <Route path="/plantedetails/:plantId" element={<PlanteDetails />} />
      <Route path="/plantoffers" element={<PlantOffers />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cgu" element={<Cgu />} />
      <Route path="/offersMap" element={<Map />} />
      <Route path="/offerDetails" element={<OfferDetails />} />
    </Routes>
  );
}

export default App;
