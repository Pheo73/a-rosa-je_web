import "../style/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import {
  faTemperatureHalf,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";
function PlanteDetails() {
  return (
    <div className="bg-[#D9D9D9] min-h-screen w-full">
      <header className="flex py-4">
        <div className="mt-2">
          <button className="text-black text-[20px] font-[rubik-mono]  ml-16">
            <Link to="/">Home</Link>
          </button>
        </div>
        <div className="ml-auto mr-16">
          <div className="flex">
            <FontAwesomeIcon
              icon={faBell}
              color="white"
              size="1x"
              className="bg-[#464C44] p-2  rounded-full mr-3"
            />
             <Link to="/profil">
            <FontAwesomeIcon
              icon={faUser}
              size="1x"
              color="white"
              className="border border-white rounded-full p-3 mt-2"
            /></Link>
          </div>
        </div>
      </header>
      <div className="bg-[#000000] h-56 pt-3">
        <h1 className="relative text-white text-[40px] font-[rubik-mono]  ml-16">
          <span>
            Votre<br></br> plante
          </span>
          <span className="text-[#01B763]">.</span>
        </h1>
        <p className="text-white font-[poppins-regular] ml-16">
          Découvrez les avis de professionels
        </p>
      </div>

      <div className="bg-[#FFFFFF] h-auto w-1/2 rounded-3xl mx-auto mt-[-20px] py-5 px-8 mb-8">
        <p className="text-black text-[14px] font-[rubik-mono]">Cactus</p>
        <p className="font-[poppins-regular] text-[#9E9E9E] text-[13px]">
          Découvrez les avis de professionels
        </p>
        <div className="flex">
          <div>
            <div className="flex mt-7">
              <FontAwesomeIcon icon={faSun} size="2xl" />
              <p className="ml-6 font-[poppins-regular] text-[#3E9B2A]">
                Maximum
              </p>
            </div>
            <div className="flex mt-7">
              <FontAwesomeIcon icon={faTemperatureHalf} size="2xl" />
              <p className="ml-9 font-[poppins-regular] text-[#3E9B2A]">
                19-22°C
              </p>
            </div>
            <div className="flex mt-7">
              <FontAwesomeIcon icon={faDroplet} size="2xl" />
              <p className="ml-8 font-[poppins-regular] text-[#3E9B2A]">Peu</p>
            </div>
          </div>

          <div className="h-fit">
            <img
              src="./cactus.png"
              className="max-h-52 ml-40"
              alt="cactus"
            ></img>
          </div>
        </div>
      </div>
      <div className="bg-[#FFFFFF] h-auto w-1/2 rounded-3xl mx-auto mt-[-20px] py-5 px-8 mb-8">
        <p className="text-black text-[14px] font-[rubik-mono]">Commentaire</p>
        <p className="font-[poppins-regular] text-[#9E9E9E] text-[13px]">
          Découvrez les avis de botanistes !
        </p>
        <div className="flex bg-[#1A2016] p-4 rounded-xl mt-4">
        <FontAwesomeIcon icon={faUser} size="2xl" className="mt-5" color="green"/>
        <div className="ml-5">
            <p className="text-[#D9D9D9]">rainBowMan</p>
            <p className="text-white">Nécessite une terre légère, sableuse, ne retenant pas l'eau.</p>
        </div>

        </div>
        <div className="flex bg-[#1A2016] p-4 rounded-xl mt-4">
        <FontAwesomeIcon icon={faUser} size="2xl" className="mt-5" color="green"/>
        <div className="ml-5">
            <p className="text-[#D9D9D9]">theFlyingBat</p>
            <p className="text-white">Évitez tout excès d'arrosage qui pourrait leur être fatal !</p>
        </div>

        </div>
      </div>
      <footer className="w-100% bg-black h-11"></footer>
    </div>
  );
}

export default PlanteDetails;
