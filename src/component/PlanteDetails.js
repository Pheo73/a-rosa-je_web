import "../style/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import { Link, useParams } from "react-router-dom";
import {
  faTemperatureHalf,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import useStore from "../store/Store";
import { useLocation } from "react-router-dom";

function PlanteDetails() {
  const { plantId } = useParams();
  const {
    token,
    sun,
    temp,
    water,
    getOffer,
    offers,
    user,
    getUser,
    getSelectValue,
  } = useStore();
  const [userPlant, setUserPlant] = useState(null);
  const [cities, setCities] = useState(null);
  const plante =
    userPlant &&
    userPlant.find((plant) => parseInt(plant.plantId) === parseInt(plantId));
  let location = useLocation();
  const query = new URLSearchParams(location.search);
  const requestId = query.get("requestId");
  const offerDetail = offers.find(
    (offer) => offer.request_id === Number(requestId)
  );
  const getCities = async (token) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/cities/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Get cities failed");
      }
      const responseJson = await response.json();
      setCities(responseJson);
    } catch (error) {
      console.error("Get cities failed:", error);
      throw error;
    }
  };

  const [formData, setFormData] = useState({
    plant: plantId,
    start_date: "",
    end_date: "",
    address: "",
    postal_code: "",
    price: "",
    city: "",
  });

  const displayPlant = async (token) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/plants/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Plant addition failed");
      }
      const responseJson = await response.json();
      setUserPlant(responseJson);
    } catch (error) {
      console.error("Error adding plant:", error);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const selectedCity = cities.find(
        (city) => city.cityName === formData.city
      );
      if (selectedCity) {
        const dataToSend = {
          ...formData,
          city: selectedCity.cityId,
        };

        await addGuard(dataToSend, token);
      } else {
        console.error("City not found");
      }
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  const addGuard = async (formData, token) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/guardian-requests/",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Plant addition failed");
      }
    } catch (error) {
      console.error("Error adding plant:", error);
      throw error;
    }
  };

  const getNameFromID = (id, list) => {
    const item = list.find((item) => item.id === id);
    return item ? item.name : "Valeur inconnue";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    displayPlant(token);
    getCities(token);
    getOffer();
    getUser();
    getSelectValue();
  }, [token]);
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
      {location.search === "" ? (
        <div className="bg-[#000000] h-56 pt-3">
          <h1 className="relative text-white text-[40px] font-[rubik-mono] ml-16">
            <span>
              Votre<br></br> plante
            </span>
            <span className="text-[#01B763]">.</span>
          </h1>
          <p className="text-white font-[poppins-regular] ml-16">
            Découvrez les avis de professionels
          </p>
        </div>
      ) : (
        <div className="bg-[#000000] h-56 pt-3">
          <h1 className="relative text-white text-[40px] font-[rubik-mono] ml-16">
            <span>Demande de garde</span>
            <span className="text-[#01B763]">.</span>
          </h1>
          <p className="text-white font-[poppins-regular] ml-16">
            Cette offre vous intéresse ?
          </p>
        </div>
      )}

      <div className="bg-[#FFFFFF] h-auto w-1/2 rounded-3xl mx-auto mt-[-20px] py-5 px-8 mb-8">
        {plante && (
          <p className="text-black text-[14px] font-[rubik-mono]">
            {plante.name}
          </p>
        )}
        <p className="font-[poppins-regular] text-[#9E9E9E] text-[13px]">
          Découvrez les avis de professionels
        </p>
        <div className="flex">
          {plante && (
            <div>
              <div className="flex mt-7">
                <FontAwesomeIcon icon={faSun} size="2xl" />
                <p className="ml-6 font-[poppins-regular] text-[#3E9B2A]">
                  {getNameFromID(plante.sun_exposure, sun)}
                </p>
              </div>
              <div className="flex mt-7">
                <FontAwesomeIcon icon={faTemperatureHalf} size="2xl" />
                <p className="ml-9 font-[poppins-regular] text-[#3E9B2A]">
                  {getNameFromID(plante.temperature_range, temp)}
                </p>
              </div>
              <div className="flex mt-7">
                <FontAwesomeIcon icon={faDroplet} size="2xl" />
                <p className="ml-8 font-[poppins-regular] text-[#3E9B2A]">
                  {getNameFromID(plante.watering_amount, water)}
                </p>
              </div>
            </div>
          )}

          <div className="h-fit">
            <img
              src={plante?.image_url}
              className="max-h-52 ml-40"
              alt="cactus"
            ></img>
          </div>
        </div>
      </div>
      {location.search === "" ? (
        <>
          <div className="bg-[#FFFFFF] h-auto w-1/2 rounded-3xl mx-auto mt-[-20px] py-5 px-8 mb-8">
            <p className="text-black text-[15px] font-[rubik-mono]">
              Créer une demande de garde
            </p>
            <p className="font-[poppins-regular] text-[#9E9E9E] text-[13px] mb-6">
              Modifiez et crée autant de demande que vous voulez !
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <p className="mb-3 font-[poppins-medium] text-[#3E9B2A]">
                Dates de garde
              </p>
              <div className="flex mb-6">
                <p className="font-[poppins-regular] text-black mr-3">
                  Début :
                </p>
                <input
                  type="date"
                  className="border border-black p-1 rounded-md mr-16"
                  value={formData.start_date}
                  onChange={(e) =>
                    setFormData({ ...formData, start_date: e.target.value })
                  }
                ></input>
                <p className="font-[poppins-regular] text-black mr-3">Fin :</p>
                <input
                  type="date"
                  className="border border-black p-1 rounded-md"
                  value={formData.end_date}
                  onChange={(e) =>
                    setFormData({ ...formData, end_date: e.target.value })
                  }
                ></input>
              </div>
              <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">
                Rémunération
              </p>
              <input
                className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2 mb-6"
                placeholder="20€"
                type="number"
                value={formData.price}
                onChange={(e) => {
                  setFormData({ ...formData, price: e.target.value });
                }}
              ></input>

              <div className="flex ">
                <div className="mr-16">
                  <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">
                    Adresse*
                  </p>
                  <input
                    className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2"
                    placeholder="94 rue voltaire"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  ></input>
                  <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">
                    Ville
                  </p>
                  <select
                    className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionnez</option>
                    {cities?.map((city) => (
                      <option key={city.cityId} value={city.cityName}>
                        {city.cityName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">
                    Code Postal
                  </p>
                  <input
                    className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2"
                    placeholder="69100"
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <button
                type="submit"
                className="w-[250px] h-[41px] bg-[#01B763] rounded-full text-white font-[poppins-regular] mb-5 mx-auto mt-6"
              >
                Créer
              </button>
            </form>
          </div>
          <div className="bg-[#FFFFFF] h-auto w-1/2 rounded-3xl mx-auto mt-[-20px] py-5 px-8 mb-8">
            <p className="text-black text-[14px] font-[rubik-mono]">
              Vos demande de garde
            </p>
            <p className="font-[poppins-regular] text-[#9E9E9E] text-[13px]">
              {
                offers.filter(
                  (offer) =>
                    offer.plant === plante?.plantId &&
                    offer.username === user.username
                ).length
              }{" "}
              demande
            </p>
            {offers &&
              plante &&
              offers
                .filter(
                  (offer) =>
                    offer.plant === plante?.plantId &&
                    offer.username === user.username
                )
                ?.map((offer) => (
                  <div className="border border-[#9E9E9E] rounded-3xl w-full mt-5 px-6 pb-6 pt-2">
                    <p className="text-black text-[15px] font-[rubik-mono]">
                      {offer.first_name} {offer.last_name}
                    </p>
                    <div className="flex">
                      <div>
                        <FontAwesomeIcon
                          icon={faUser}
                          size="2xl"
                          className="mt-8"
                          color="green"
                        />
                      </div>
                      <div className="ml-6 mt-4">
                        <div className="flex mb-2 items-center">
                          <p className="text-black text-[13px] font-[rubik-mono] mr-6 align-middle mt-0 mb-0">
                            Date
                          </p>
                          <p className="align-middle mt-0 mb-0">
                            {offer.formatted_dates}
                          </p>
                        </div>
                        <div className="flex mb-2 items-center">
                          <p className="text-black text-[13px] font-[rubik-mono] mr-6 align-middle mt-0 mb-0">
                            Ville
                          </p>
                          <p className="align-middle mt-0 mb-0">
                            {offer.city_name}
                          </p>
                        </div>
                        <div className="flex">
                          <p className="text-black text-[13px] font-[rubik-mono] mr-6 align-middle mt-0 mb-0">
                            Prix
                          </p>
                          <p className="align-middle mt-0 mb-0">
                            {offer.formatted_price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          <div className="bg-[#FFFFFF] h-auto w-1/2 rounded-3xl mx-auto mt-[-20px] py-5 px-8 mb-8">
            <p className="text-black text-[14px] font-[rubik-mono]">
              Commentaire
            </p>
            <p className="font-[poppins-regular] text-[#9E9E9E] text-[13px]">
              Découvrez les avis de botanistes !
            </p>
            <div className="flex bg-[#1A2016] p-4 rounded-xl mt-4">
              <FontAwesomeIcon
                icon={faUser}
                size="2xl"
                className="mt-5"
                color="green"
              />
              <div className="ml-5">
                <p className="text-[#D9D9D9]">rainBowMan</p>
                <p className="text-white">
                  Nécessite une terre légère, sableuse, ne retenant pas l'eau.
                </p>
              </div>
            </div>
            <div className="flex bg-[#1A2016] p-4 rounded-xl mt-4">
              <FontAwesomeIcon
                icon={faUser}
                size="2xl"
                className="mt-5"
                color="green"
              />
              <div className="ml-5">
                <p className="text-[#D9D9D9]">theFlyingBat</p>
                <p className="text-white">
                  Évitez tout excès d'arrosage qui pourrait leur être fatal !
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (<>
        <div className="bg-[#FFFFFF] h-auto w-1/2 rounded-3xl mx-auto mt-[-20px] py-5 px-8 mb-8">
        <p className="text-black text-[14px] font-[rubik-mono]">
            Details de l'offre
          </p>
          <div className="ml-6 mt-4">
            <div className="flex mb-2 items-center">
              <p className="text-black text-[13px] font-[rubik-mono] mr-6 align-middle mt-0 mb-0">
                Date
              </p>
              <p className="align-middle mt-0 mb-0">{offerDetail.formatted_dates}</p>
            </div>
            <div className="flex mb-2 items-center">
              <p className="text-black text-[13px] font-[rubik-mono] mr-6 align-middle mt-0 mb-0">
                Ville
              </p>
              <p className="align-middle mt-0 mb-0">{offerDetail.city_name}</p>
            </div>
            <div className="flex">
              <p className="text-black text-[13px] font-[rubik-mono] mr-6 align-middle mt-0 mb-0">
                Prix
              </p>
              <p className="align-middle mt-0 mb-0">{offerDetail.formatted_price}</p>
            </div>
          </div>
        </div>
        <div className="h-auto w-1/2 rounded-3xl mx-auto mt-[-20px] py-5 px-8 flex justify-center">
        <Link to={`/`} className="block" key={1}>
          <button className="text-white text-[12px] font-[rubik-mono] w-52 h-10 bg-[#3E9B2A] px-5 rounded-[10px] mt-8 mx-auto">
            Contacter le propriétaire
          </button>
        </Link>
      </div>
      </>
      )}

      <footer className="w-100% bg-black h-11"></footer>
    </div>
  );
}

export default PlanteDetails;
