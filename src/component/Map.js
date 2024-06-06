import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import useStore from "../store/Store";
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const Map = () => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [userPosition, setUserPosition] = useState([0, 0]);
  const [markers, setMarkers] = useState([]);
  const { getOffer, offers } = useStore();
  const LOCATIONIQ_API_KEY = "pk.b0f8b73c5e87c0e0637f33b08f668d36";

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error getting user position:", error);
      }
    );
  }, []);

  useEffect(() => {
    getOffer();
  }, [getOffer]);

  useEffect(() => {
    const addMarkers = async (offers) => {
      if (!mapInstanceRef.current || !offers) return;

      const newMarkers = [];
      for (const offer of offers) {
        try {
          await sleep(1000);

          const response = await axios.get(
            `https://us1.locationiq.com/v1/search.php?key=${LOCATIONIQ_API_KEY}&q=${encodeURIComponent(offer.address)}%2C${offer.postal_code}%2C${offer.city_name}&format=json`
          );

          const { lat, lon, display_name } = response.data[0];
          const marker = L.marker([parseFloat(lat), parseFloat(lon)], {
            icon: L.icon({
              iconUrl: markerIconPng,
              shadowUrl: markerShadowPng,
            })
          })
            .addTo(mapInstanceRef.current)
            .bindPopup(`${display_name}`);
          newMarkers.push(marker);
        } catch (error) {
          console.error("Error fetching coordinates for address:", error);
        }
      }
      setMarkers(newMarkers);
    };

    if (offers.length > 0) {
      addMarkers(offers);
    }
  }, [offers]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current).setView(userPosition, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);

      L.marker(userPosition, {
        icon: L.icon({
          iconUrl: markerIconPng,
          shadowUrl: markerShadowPng,
        })
      })
        .addTo(mapInstanceRef.current)
        .bindPopup("Vous êtes là")
        .openPopup();
    } else {
      mapInstanceRef.current.setView(userPosition, 13);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markers.forEach((marker) => marker.remove());
    };
  }, [userPosition]);

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
        <Link to={'/plantoffers'} className="font-[poppins-regular] text-[#9E9E9E] text-[13px] mt-5 ml-16"><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> retour aux offres de gardes</Link>
      </div>
      <div className="flex justify-center items-center mt-8 mb-6">
        <div ref={mapContainerRef} style={{ height: "400px", width: "70%" }}></div>
      </div>
      <footer className="w-full bg-black h-11"></footer>
    </div>
  );
};

export default Map;
