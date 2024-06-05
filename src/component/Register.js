import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../store/Store";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    email: "",
    last_name: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const store = useStore();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Veuillez saisir un nom d'utilisateur.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Veuillez saisir un mot de passe.";
    } else if (formData.password.trim().length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
    }

    if (!formData.password2.trim()) {
      newErrors.password2 = "Veuillez confirmer votre mot de passe.";
    } else if (formData.password !== formData.password2) {
      newErrors.password2 = "Les mots de passe ne correspondent pas.";
    }

    if (!formData.first_name.trim()) {
      newErrors.first_name = "Veuillez saisir votre prénom.";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Veuillez saisir votre nom.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Veuillez saisir votre adresse e-mail.";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Veuillez saisir une adresse e-mail valide.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; 
    }

    try {
      await store.register(formData);
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);
     
    }
  };

  return (
    <div className="w-full h-full bg-[#1A2016] bg-[url('login.png')] bg-left bg-no-repeat pt-10 pb-10 flex flex-col justify-center items-center">
      <h1 className="font-[rubik-mono] text-white text-[40px] mb-8">
        A'rrosa-je
      </h1>
      <div className="w-[644px] h-auto bg-white bg-opacity-50 rounded-lg p-10 mx-auto  flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          {errors.global && (
            <p className="text-red-500 mb-4">{errors.global}</p>
          )}
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            name="username"
            placeholder="Nom d'utilisateur*"
            className={`w-[400px] h-[52px] rounded-full p-2 mt-6 ${
              errors.username ? "border border-red-500" : ""
            }`}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username}</p>
          )}
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            placeholder="Mot de passe*"
            className={`w-[400px] h-[52px] rounded-full p-2 mt-6 ${
              errors.password ? "border border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password}</p>
          )}
          <input
            type="password"
            id="password2"
            value={formData.password2}
            onChange={handleChange}
            name="password2"
            placeholder="Confirmation du mot de passe*"
            className={`w-[400px] h-[52px] rounded-full p-2 mt-6 ${
              errors.password2 ? "border border-red-500" : ""
            }`}
          />
          {errors.password2 && (
            <p className="text-red-500">{errors.password2}</p>
          )}
          <input
            type="text"
            id="first_name"
            value={formData.first_name}
            onChange={handleChange}
            name="first_name"
            placeholder="Prénom*"
            className={`w-[400px] h-[52px] rounded-full p-2 mt-6 ${
              errors.first_name ? "border border-red-500" : ""
            }`}
          />
          {errors.first_name && (
            <p className="text-red-500">{errors.first_name}</p>
          )}
          <input
            type="text"
            id="last_name"
            value={formData.last_name}
            onChange={handleChange}
            name="last_name"
            placeholder="Nom*"
            className={`w-[400px] h-[52px] rounded-full p-2 mt-6 ${
              errors.last_name ? "border border-red-500" : ""
            }`}
          />
          {errors.last_name && (
            <p className="text-red-500">{errors.last_name}</p>
          )}
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            placeholder="Email*"
            className={`w-[400px] h-[52px] rounded-full p-2 mt-6 ${
              errors.email ? "border border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 mb-6">{errors.email}</p>
          )}
          <button
            type="submit"
            className="w-[250px] h-[41px] bg-[#01B763] rounded-full text-white font-[poppins-regular] mb-5 mt-6"
          >
            S'inscrire
          </button>
        </form>
        <p className="">
          Vous avez déjà un compte ? <Link to="/login">Connectez-vous ici</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
