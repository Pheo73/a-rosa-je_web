import "../style/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import {
  faTemperatureHalf,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";
function PlantOffers() {
  return (
    <div className="bg-[#D9D9D9] min-h-screen w-full">
      <header className="flex py-4">
        <div className="mt-2">
          <button className="text-black text-[20px] font-[rubik-mono]  ml-16">
            <Link to="/home">Home</Link>
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
              />
            </Link>
          </div>
        </div>
      </header>
      <div className="bg-[#000000] h-56 pt-3">
        <h1 className="relative text-white text-[40px] font-[rubik-mono]  ml-16">
          <span>
            Bienvenue sur<br></br> a’rosa-je
          </span>
          <span className="text-[#01B763]">.</span>
        </h1>
        <p className="text-white font-[poppins-regular] ml-16">
          Trouvez la garde qui vous correspond !
        </p>
      </div>

      <div className="bg-[#FFFFFF] h-auto w-1/2 rounded-3xl mx-auto mt-[-20px] py-5 px-8 mb-8">
        <p className="text-black text-[15px] font-[rubik-mono]">
          Selectionner la plantes que vous souhaitez garder
        </p>
        <p className="font-[poppins-regular] text-[#9E9E9E] text-[13px] mt-5">
          Filtres
        </p>
        <div className="border border-[#9E9E9E] rounded-3xl w-full mt-5 px-6 pb-6 pt-2">
        <p className="text-black text-[15px] font-[rubik-mono]">
          Victoria Dumont
        </p>
        <div className="flex">
            <div>
        <FontAwesomeIcon icon={faUser} size="2xl" className="mt-8" color="green"/>
        </div>
        <div className="ml-6 mt-4">
        <div className="flex mb-2"><p className="text-black text-[13px] font-[rubik-mono] mr-6">Dates</p> <p>19/05/2024</p></div>
        <div className="flex mb-2"><p className="text-black text-[13px] font-[rubik-mono] mr-6">Villes</p> <p>Lyon</p></div>
        <div className="flex"><p className="text-black text-[13px] font-[rubik-mono] mr-6">Prix</p> <p>50€</p></div>
        </div>
        </div>
        </div>
      </div>
      <footer className="w-100% bg-black h-11"></footer>
    </div>
  );
}

export default PlantOffers;
