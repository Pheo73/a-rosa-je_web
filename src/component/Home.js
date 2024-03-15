import "../style/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import {
  faTemperatureHalf,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function Home() {
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
            Commencons par ajouter votre première plante !
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
                Ajouter vôtre plante
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
          <p className="font-[poppins-regular] text-[#9E9E9E] text-[13px] ml-8">
            2 plantes
          </p>
        </div>

        <div className="mt-5 ml-16">
          <Link to="/plantedetails" className="block w-fit">
            <div className="w-[330px] h-[297px] bg-white rounded-[10px] pt-[35px] pl-7">
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
                    <p className="ml-8 font-[poppins-regular] text-[#3E9B2A]">
                      Peu
                    </p>
                  </div>
                </div>

                <div className="h-fit">
                  <img
                    src="./cactus.png"
                    className="max-h-52 ml-12"
                    alt="cactus"
                  ></img>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
      <img
        src="./accueil_plante.png"
        className="absolute z-50 ml-auto right-0 mt-[-32rem]"
        alt="accueil"
      ></img>
    </div>
  );
}

export default Home;
