import "../style/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import { Link,useNavigate  } from "react-router-dom";
import useStore from "../store/Store";
function Profil() {
  const store = useStore();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    store.logout();
    navigate('/login'); 
  };
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
        <h1 className="relative text-white text-[40px] font-[rubik-mono]  ml-16">
          <span>
            John Smith
          </span>
          <span className="text-[#01B763]">.</span>
        </h1>
        <p className="text-white font-[poppins-regular] ml-16">
          profile
        </p>
      </div>

      <div className="bg-[#FFFFFF] h-auto w-1/2 rounded-3xl mx-auto mt-[-20px] py-5 px-8 mb-8">
        <h1 className=" text-black text-[15px] font-[rubik-mono]">
          Vos informations
        </h1>
        <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">Username*</p>
        <input
          className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2"
          placeholder="Username"
          type="email"
        ></input>
        <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">Prénom*</p>
        <input
          className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2"
          placeholder="John"
          type="email"
        ></input>
        <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">Nom*</p>
        <input
          className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2"
          placeholder="Smoth"
          type="email"
        ></input>
        <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">Email*</p>
        <input
          className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2"
          placeholder="email@adress.com"
          type="email"
        ></input>
        <p className="font-[poppins-medium] text-[#3E9B2A] mt-3">Téléphone</p>
        <input
          className="border border-black rounded-3xl pl-3 bg-[#D9D9D9] w-48 mt-2"
          placeholder="+33 X XX XX XX XX"
          type="tel"
        ></input>
        <div className="flex mx-auto justify-center">
          <button className="text-white text-[10px] font-[rubik-mono] w-64 h-7 bg-[#3E9B2A] px-5 rounded-[10px] mx-auto mt-8 block">
            SAUVEGARDER
          </button>
          <button onClick={handleLogout} className="text-white text-[10px] font-[rubik-mono] w-64 h-7 bg-[#3E9B2A] px-5 rounded-[10px] mx-auto mt-8 block">
            DÉCONNECTION
          </button>
        </div>
        <button className="text-white text-[10px] font-[rubik-mono] w-64 h-7 bg-[#E94C3C] px-5 rounded-[10px] mx-auto mt-8 block">
          SUPPRIMER VOTRE COMPTE
        </button>
      </div>
      <footer className="w-100% bg-black h-11"></footer>
    </div>
  );
}

export default Profil;
