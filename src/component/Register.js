import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importez Link si vous avez besoin de liens vers d'autres pages
import useStore from '../store/Store'; // Importez le store si vous avez besoin de gérer l'état global

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    email: '',
    last_name: '',
    password2: '',
  });

  const store = useStore(); // Si vous avez besoin d'utiliser le store pour une certaine action

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    store.register(formData);
    console.log(formData); 
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nom d'utilisateur:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="first_name">Prénom:</label>
          <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="last_name">Nom:</label>
          <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password2">Confirmer le mot de passe:</label>
          <input type="password" id="password2" name="password2" value={formData.password2} onChange={handleChange} />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      {/* Ajoutez un lien vers la page de connexion si nécessaire */}
      <p>Vous avez déjà un compte? <Link to="/login">Connectez-vous ici</Link></p>
    </div>
  );
};

export default Register;
