import "../style/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import useStore from "../store/Store";
import React, { useEffect } from "react";

function PlantOffers() {
  const { token,user,getUser,getOffer,offers } = useStore();

  useEffect(() => {
    getOffer();
    getUser();
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-[#D9D9D9] flex-grow ">
        <header className="flex py-4">
          <div className="mt-2">
            <button className="text-black text-[20px] font-[rubik-mono] ml-16">
              <Link to="/home">Home</Link>
            </button>
          </div>
          <div className="ml-auto mr-16 ">
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
        <div className="bg-[#000000] h-56 pt-3 ">
          <h1 className="relative text-white text-[40px] font-[rubik-mono] ml-16">
            <span>
              Bienvenue sur<br></br> a’rosa-je
            </span>
            <span className="text-[#01B763]">.</span>
          </h1>
          <p className="text-white font-[poppins-regular] ml-16">
            Trouvez la garde qui vous correspond !
          </p>
        </div>
        <div className="bg-[#FFFFFF] h-auto w-1/2 rounded-3xl mx-auto mt-[-20px] py-5 px-8 mb-auto">
          <p className="text-black text-[15px] font-[rubik-mono]">
            Selectionner la plante que vous souhaitez garder
          </p>
          <Link to={`/offersMap`} className="font-[poppins-regular] text-[#9E9E9E] text-[13px] mt-5">
            Afficher la map
          </Link>
          {offers && offers.filter((offer)=>offer.username !== user.username)?.map((offer) => (
            <div className="border border-[#9E9E9E] rounded-3xl w-full mt-5 px-6 pb-6 pt-2 ">
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
                    <p className="align-middle mt-0 mb-0">{offer.city_name}</p>
                  </div>
                  <div className="flex">
                    <p className="text-black text-[13px] font-[rubik-mono] mr-6 align-middle mt-0 mb-0">
                      Prix
                    </p>
                    <p className="align-middle mt-0 mb-0">{offer.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      <footer className="w-full bg-black h-11 flex items-center justify-center text-white mt-8"></footer>
      </div>
    </div>
  );
}

export default PlantOffers;
