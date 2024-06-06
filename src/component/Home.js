import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faTemperatureHalf,
  faDroplet,
  faUser,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useStore from "../store/Store";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function Home() {
  const { token, sun, temp, water,getSelectValue } = useStore(); // Importez les constantes sun, temp, et water depuis votre store
  const [userPlant, setUserPlant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const displayPlant = async () => {
    try {
      if (!token) {
        return;
      }

      const response = await fetch("http://172.16.1.43:8000/api/plants/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch plants");
      }

      setUserPlant(await response.json());
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  useEffect(() => {
    displayPlant();
  }, []);

  const getNameFromID = (id, list) => {
    const item = list.find((item) => item.id === id);
    return item ? item.name : "Valeur inconnue";
  };

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

  const handleDeleteClick = (plant) => {
    setSelectedPlant(plant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlant(null);
  };

  const confirmDelete = async () => {
    if (!selectedPlant) return;

    try {
      const response = await fetch(`http://172.16.1.43:8000/api/plants/${selectedPlant.plantId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete plant");
      }

      setUserPlant(userPlant.filter((plant) => plant.plantId !== selectedPlant.plantId));
      closeModal();
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };

  return (
    <div className="bg-[#1A2016] min-h-screen py-10">
      <header className="flex">
        <div>
          <h1 className="relative text-white text-[40px] font-[rubik-mono]  ml-16">
            <span>
              Bienvenue sur<br></br> a’rosa-je
            </span>
            <span className="text-[#01B763]">.</span>
          </h1>
          <p className="text-white font-[poppins-regular] ml-16">
            Commençons par ajouter votre première plante !
          </p>
        </div>
        <div className="ml-auto mr-16">
          <div className="flex">
            <FontAwesomeIcon
              icon={faBell}
              color="white"
              size="2x"
              className="bg-[#464C44] p-2  rounded-full mr-3"
            />
            <Link to="/profil">
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                color="white"
                className="border border-white rounded-full p-4 mt-2"
              />
            </Link>
          </div>
        </div>
      </header>
      <section>
        <div className="h-[177px] bg-white mt-16 pt-7">
          <p className="relative text-black text-[20px] font-[rubik-mono]  ml-16">
            <span>RENSEIGNEZ LES INFORMATIONS DE VOTRE PLANTE</span>
            <span className="text-[#01B763]">.</span>
          </p>
          <div className="flex">
            <Link to="/addplant">
              <button className="text-white text-[15px] font-[rubik-mono] w-64 h-14 bg-[#3E9B2A] px-5 rounded-[10px] ml-28 mt-8">
                Ajouter votre plante
              </button>
            </Link>
            <Link to="/plantoffers">
              <button className="text-white text-[15px] font-[rubik-mono] w-64 h-14 bg-[#3E9B2A] px-5 rounded-[10px] ml-28 mt-8">
                Offres de garde
              </button>
            </Link>
          </div>
        </div>
        <div className="flex ml-16 mt-5">
          <p className="text-white text-[15px] font-[rubik-mono]">
            Vos plantes
          </p>
          {userPlant && userPlant.length > 0 ? (
            <p className="font-[poppins-regular] text-[#9E9E9E] text-[13px] ml-8">
              {userPlant.length} Plantes
            </p>
          ) : (
            <p className="font-[poppins-regular] text-[#9E9E9E] text-[13px] ml-8">
              0 Plantes
            </p>
          )}
        </div>

        {userPlant && (
          <div className="mt-5 ml-16 flex gap-4 overflow-x-auto max-w-[1000px] p-4 scrollbar-custom ">
            {userPlant.map((plant, index) => (
              <Link
                to={`/plantedetails/${plant.plantId}`}
                className="block w-fit"
                key={index}
              >
                <div className="w-[330px] h-[297px] bg-white rounded-[10px] pt-[35px] pl-7 parent-div">
                  <p className="text-black text-[14px] font-[rubik-mono]">
                    {plant.name}
                    <FontAwesomeIcon icon={faTrashCan} className="trash-icon ml-48 hover:text-red-500" onClick={(e) => { e.preventDefault(); handleDeleteClick(plant); }} />

                  </p>
                  <p className="font-[poppins-regular] text-[#9E9E9E] text-[13px]">
                    Découvrez les avis de professionnels
                  </p>
                  <div className="flex">
                    <div>
                      <div className="flex mt-7">
                        <FontAwesomeIcon icon={faSun} size="2xl" />
                        <p className="ml-6 font-[poppins-regular] text-[#3E9B2A]">
                          {getNameFromID(plant.sun_exposure, sun)}
                        </p>
                      </div>
                      <div className="flex mt-7">
                        <FontAwesomeIcon icon={faTemperatureHalf} size="2xl" />
                        <p className="ml-9 font-[poppins-regular] text-[#3E9B2A]">
                          {getNameFromID(plant.temperature_range, temp)}
                        </p>
                      </div>
                      <div className="flex mt-7">
                        <FontAwesomeIcon icon={faDroplet} size="2xl" />
                        <p className="ml-8 font-[poppins-regular] text-[#3E9B2A]">
                          {getNameFromID(plant.watering_amount, water)}
                        </p>
                      </div>
                    </div>
                    <div className="h-fit">
                      <img
                        src="./cactus.png"
                        className="max-h-52 ml-12"
                        alt={plant.species}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Confirmer la suppression</h2>
            <p>Êtes-vous sûr de vouloir supprimer cette plante ?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={confirmDelete}>Supprimer</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={closeModal}>Annuler</button>
            </div>
          </div>
        </div>
      )}
      <img
        src="./accueil_plante.png"
        className={`${
          userPlant === null || userPlant.length === 0
            ? "ml-auto right-0 mt-[-20rem]"
            : "absolute z-50 ml-auto right-0 mt-[-32rem]"
        }`}
        alt="accueil"
      />
    </div>
  );
}

export default Home;
