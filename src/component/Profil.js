import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../store/Store";
import axios from "axios";

function Profil() {
  const store = useStore();
  const navigate = useNavigate();
  const { token, user, getUser } = useStore();
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });
  const [password, setPassword] = useState(""); 
  const [updateSuccess, setUpdateSuccess] = useState(false); 
  useEffect(() => {
    getUser();
  }, [token, getUser]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        password: ""
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  };

  const handleConfirmUpdate = async () => {
    try {
      const response = await axios.put(
        "http://172.16.1.43:8000/api/user/update/",
        { ...formData, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (response.status === 200) {
        setUpdateSuccess(true);
        getUser();
        setTimeout(() => {setUpdateSuccess(false)},[1000]);
          
        
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations :", error);
    }
  };

  const handleLogout = () => {
    store.logout();
    navigate("/login");
  };

  return (
    <div className="bg-[#D9D9D9] min-h-screen w-full">
      <header className="flex py-4">
        <div className="mt-2">
          <button className="text-black text-[20px] font-[rubik-mono] ml-16">
            <Link to="/home">Home</Link>
          </button>
        </div>
        <div className="ml-auto mr-16">
          <div className="flex">
            <FontAwesomeIcon
              icon={faBell}
              color="white"
              size="1x"
              className="bg-[#464C44] p-2 rounded-full mr-3"
            />
            <FontAwesomeIcon
              icon={faUser}
              size="1x"
              color="green"
              className="border-2 border-green-600 rounded-full p-3 mt-2"
            />
          </div>
        </div>
      </header>
      <div className="bg-[#000000] h-56 pt-3">
        <h1 className="relative text-white text-[40px] font-[rubik-mono] ml-16">
          {user ? (
            <span>
              {user.first_name} {user.last_name}
            </span>
          ) : (
            <span></span>
          )}
          <span className="text-[#01B763]">.</span>
        </h1>
        <p className="text-white font-[poppins-regular] ml-16">profile</p>
      </div>

      <div className="bg-[#FFFFFF] h-auto w-1/2 rounded-3xl mx-auto mt-[-20px] py-5 px-8 mb-8">
        <h1 className=" text-black text-[15px] font-[rubik-mono]">
          Vos informations
        </h1>
        <form onSubmit={handleFormSubmit}>
          <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">Nom d'utilisateur*</p>
          <input
            className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2"
            placeholder="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">Prénom*</p>
          <input
            className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2"
            placeholder="John"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
          <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">Nom*</p>
          <input
            className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2"
            placeholder="Smith"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
          <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">Email*</p>
          <input
            className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2"
            placeholder="email@address.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">Mot de passe</p>
          <input
            className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2"
            placeholder="Nouveau mot de passe"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <div className="flex mx-auto justify-center">
            <button
              onClick={handleConfirmUpdate}
              className="text-white text-[10px] font-[rubik-mono] w-64 h-7 bg-[#3E9B2A] px-5 rounded-[10px] mx-auto mt-8 block"
            >
              SAUVEGARDER
            </button>
            <button
              onClick={handleLogout}
              className="text-white text-[10px] font-[rubik-mono] w-64 h-7 bg-[#3E9B2A] px-5 rounded-[10px] mx-auto mt-8 block"
            >
              DÉCONNEXION
            </button>
          </div>
        </form>
        <button  className="text-white text-[10px] font-[rubik-mono] w-64 h-7 bg-[#E94C3C] px-5 rounded-[10px] mx-auto mt-8 block">
          SUPPRIMER VOTRE COMPTE
        </button>
      </div>
      {updateSuccess && (
        <div className="bg-green-500 p-3 rounded-md fixed bottom-0 right-8 mb-4 mx-auto max-w-md">
          <p className="text-white text-sm">Informations mises à jour avec succès !</p>
        </div>
      )}
      <footer className="w-100% bg-black h-11"></footer>
    </div>
  );
}

export default Profil;
