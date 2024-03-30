import "../style/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
function AddPlant() {
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
            <Link to="/profil"><FontAwesomeIcon
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
            Bienvenue sur<br></br> a’rosa-je
          </span>
          <span className="text-[#01B763]">.</span>
        </h1>
        <p className="text-white font-[poppins-regular] ml-16">
          Commencons par ajouter votre première plante !
        </p>
      </div>

      <div className="bg-[#FFFFFF] h-auto w-1/2 rounded-3xl mx-auto mt-[-20px] py-5 px-8 mb-8">
        <h1 className=" text-black text-[15px] font-[rubik-mono]">
          <span>
            RENSEIGNEZ LES INFORMATIONS<br></br>DE VOTRE PLANTE
          </span>
          <span className="text-[#01B763]">.</span>
        </h1>
        <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">
          Nom de votre plante*
        </p>
        <input
          className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2 mb-4"
          placeholder="Cactus"
        ></input>
        <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">
          Ajouter une photo*
        </p>
        <div className="flex mt-3 mb-4">
          <input type="file" placeholder="AJOUTER UN FICHIER"></input>
          <p className="font-[poppins-regular] text-[12px] text-[#9E9E9E] h-fit self-end">
            Prennez vos photos en mode portrait*
          </p>
        </div>
        <div className="flex mb-4">
          <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">
            Ensoleillement*
          </p>
          <select
            className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-3 ml-4"
            placeholder="Cactus"
          >
            <option value="1">Peu</option>
            <option value="1">Modéré</option>
            <option value="1">Beaucoup</option>
          </select>
        </div>
        <div className="flex mb-4">
          <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">
            Température*
          </p>
          <select
            className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-3 ml-4"
            placeholder="Cactus"
          >
            <option value="1">Inférieur à 12°C</option>
            <option value="1">12-15°C</option>
            <option value="1">16-19°C</option>
            <option value="1">19-22°C</option>
            <option value="1">23-26°C</option>
            <option value="1">Superieur à 26°C</option>
          </select>
        </div>
        <div className="flex mb-4">
          <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">
            Quantité d'eau
          </p>
          <select
            className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-3 ml-4"
            placeholder="Cactus"
          >
            <option value="1">Peu</option>
            <option value="1">Modéré</option>
            <option value="1">Beaucoup</option>
          </select>
        </div>
        <p className="font-[poppins-medium] text-[#3E9B2A] mt-3 ">
          Dates de garde
        </p>
        <input type="date" className="mb-4"></input>
        <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">
          Informations supplémentaires
        </p>
        <textarea
          className="border border-black rounded-2xl p-3 py-2 mt-3 w-80"
          placeholder="Description..."
        ></textarea>
        <button className="text-white text-[15px] font-[rubik-mono] w-64 h-14 bg-[#3E9B2A] px-5 rounded-[10px] mx-auto mt-8 block">
          AJOUTER VOTRE PLANTE
        </button>
      </div>
      <footer className="w-100% bg-black h-11"></footer>
    </div>
  );
}

export default AddPlant;
