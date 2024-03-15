import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importez Link
import useStore from '../store/Store';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const store = useStore();

  const handleLogin = (e) => {
    e.preventDefault();
    store.login(username, password);
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Nom d'utilisateur:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      {/* Utilisez Link pour créer le bouton "Inscrivez-vous ici" */}
      <p>Vous n'avez pas de compte? <Link to="/register">Inscrivez-vous ici</Link></p>
    </div>
  );
};

export default Login;
