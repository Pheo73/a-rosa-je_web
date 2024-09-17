import "../style/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useStore from "../store/Store";

function AddPlant() {
  const [formData, setFormData] = useState({
    species: "",
    plantDescription: "",
    name: "",
    sun_exposure: "",
    temperature_range: "",
    watering_amount: "",
  });
  const [imageFile, setImageFile] = useState(null); 
  const navigate = useNavigate();
  const { token, getSelectValue, sun, temp, water } = useStore();
  const [plant, setPlant] = useState(null); 

  useEffect(() => {
    const fetchSelectValues = async () => {
      try {
        await getSelectValue();
      } catch (error) {
        console.error("Error fetching select values:", error);
      }
    };

    fetchSelectValues();
  }, [getSelectValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sunExposureId = parseInt(formData.sun_exposure);
      const temperatureRangeId = parseInt(formData.temperature_range);
      const wateringAmountId = parseInt(formData.watering_amount);

      const updatedFormData = {
        ...formData,
        sun_exposure: sunExposureId,
        temperature_range: temperatureRangeId,
        watering_amount: wateringAmountId,
      };

      const newPlant = await addPlant(updatedFormData, token);
      setPlant(newPlant);

      if (imageFile) {
        await uploadPlantImage(newPlant.plantId, imageFile, token);
      }

      navigate("/home");
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const addPlant = async (formData, token) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/plants/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Plant addition failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Error adding plant:", error);
      throw error;
    }
  };

  const uploadPlantImage = async (plantId, imageFile, token) => {
    try {
      const formData = new FormData();
      formData.append("plant", plantId);
      formData.append("image", imageFile);

      const response = await fetch("http://127.0.0.1:8000/api/plant-images/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading plant image:", error);
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
            Bienvenue sur
            <br /> a’rosa-je
          </span>
          <span className="text-[#01B763]">.</span>
        </h1>
        <p className="text-white font-[poppins-regular] ml-16">
          Commençons par ajouter votre première plante !
        </p>
      </div>

      <div className="bg-[#FFFFFF] h-auto w-1/2 rounded-3xl mx-auto mt-[-20px] py-5 px-8 mb-8">
        <h1 className="text-black text-[15px] font-[rubik-mono]">
          <span>
            RENSEIGNEZ LES INFORMATIONS
            <br />
            DE VOTRE PLANTE
          </span>
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
            Exposition au soleil*
          </p>
          <select
            className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2 mb-4"
            name="sun_exposure"
            value={formData.sun_exposure}
            onChange={handleChange}
          >
            <option value="">Sélectionnez</option>
            {sun.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">
            Gamme de température*
          </p>
          <select
            className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2 mb-4"
            name="temperature_range"
            value={formData.temperature_range}
            onChange={handleChange}
          >
            <option value="">Sélectionnez</option>
            {temp.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">
            Quantité d'arrosage*
          </p>
          <select
            className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2 mb-4"
            name="watering_amount"
            value={formData.watering_amount}
            onChange={handleChange}
          >
            <option value="">Sélectionnez</option>
            {water.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">
           Ajouter une image
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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
