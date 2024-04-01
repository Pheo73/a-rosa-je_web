import "../style/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import useStore from "../store/Store";

function AddPlant() {
  const [formData, setFormData] = useState({
    species: "",
    plantDescription: "",
    name: "",
    plantAdress: "",
  });
  const navigate = useNavigate();
  const { token } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addPlant(formData, token); 
      navigate("/home");
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addPlant = async (formData, token) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/plants/create/', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Plant addition failed');
      }
    } catch (error) {
      console.error('Error adding plant:', error);
      throw error;
    }
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
            <Link to="/profil">
              <FontAwesomeIcon
                icon={faUser}
                size="1x"
                color="white"
                className="border border-white rounded-full p-3 mt-2"
              />
            </Link>
          </div>
        </div>
      </header>
      <div className="bg-[#000000] h-56 pt-3">
        <h1 className="relative text-white text-[40px] font-[rubik-mono] ml-16">
          <span>
            Bienvenue sur<br></br> a’rosa-je
          </span>
          <span className="text-[#01B763]">.</span>
        </h1>
        <p className="text-white font-[poppins-regular] ml-16">
          Commençons par ajouter votre première plante !
        </p>
      </div>

      <div className="bg-[#FFFFFF] h-auto w-1/2 rounded-3xl mx-auto mt-[-20px] py-5 px-8 mb-8">
        <h1 className="text-black text-[15px] font-[rubik-mono]">
          <span>RENSEIGNEZ LES INFORMATIONS<br></br>DE VOTRE PLANTE</span>
          <span className="text-[#01B763]">.</span>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">
            Espèce de la plante*
          </p>
          <input
            className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2 mb-4"
            placeholder="Cactus"
            name="species"
            value={formData.species}
            onChange={handleChange}
          />
          <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">
            Description de la plante*
          </p>
          <textarea
            className="border border-black rounded-2xl p-3 py-2 mt-3 w-80"
            placeholder="Description..."
            name="plantDescription"
            value={formData.plantDescription}
            onChange={handleChange}
          ></textarea>
          <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">
            Nom de la plante*
          </p>
          <input
            className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2 mb-4"
            placeholder="Nom de la plante"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">
            Adresse de la plante*
          </p>
          <input
            className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2 mb-4"
            placeholder="Adresse de la plante"
            name="plantAddress"
            value={formData.plantAddress}
            onChange={handleChange}
          />
          <button className="text-white text-[15px] font-[rubik-mono] w-64 h-14 bg-[#3E9B2A] px-5 rounded-[10px] mx-auto mt-8 block">
            AJOUTER VOTRE PLANTE
          </button>
        </form>
      </div>
      <footer className="w-100% bg-black h-11"></footer>
    </div>
  );
}

export default AddPlant;
