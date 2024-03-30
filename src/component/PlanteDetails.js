import "../style/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import {
  faTemperatureHalf,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";
function PlanteDetails() {
  const handleSubmit= ()=>{

  }
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
        <p className="text-black text-[15px] font-[rubik-mono]">Créer une demande de garde</p>
        <p className="font-[poppins-regular] text-[#9E9E9E] text-[13px] mb-6">
          Modifiez et crée autant de demande que vous voulez !
        </p>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <p className="mb-3 font-[poppins-medium] text-[#3E9B2A]">Dates de garde</p>
          <div className="flex mb-6">
          <p className="font-[poppins-regular] text-black mr-3">Début :</p>
          <input type="date" className="border border-black p-1 rounded-md mr-16"></input>
          <p className="font-[poppins-regular] text-black mr-3">Fin :</p>
          <input type="date" className="border border-black p-1 rounded-md"></input>
          </div>
          <p className="mb-3 font-[poppins-medium] text-[#3E9B2A]">Adresse de la plante</p>
          <div className="flex ">
          <div className="mr-16">
          <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">Adresse*</p>
        <input
          className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2"
          placeholder="94 rue voltaire"
          type="address"
        ></input>
            <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">
              Département
            </p>
            <select
              className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2"
              type="text"
            >
                <option value="Rhône-Alpes">Rhône-Alpes</option>
            </select>
          </div>
          <div>
            <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">Vile</p>
            <input
              className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2"
              placeholder="Lyon"
              type="text"
            ></input>
          </div>
        </div>
          <button type="submit" className='w-[250px] h-[41px] bg-[#01B763] rounded-full text-white font-[poppins-regular] mb-5 mx-auto mt-6'>Se connecter</button>
        </form>

        
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
