import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/Store';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {store, registerSuccess, setRegisterSuccess } = useStore(); // Extraire registerSuccess et setRegisterSuccess du hook
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await store.login(username, password);
      navigate('/home'); 
      setError(null); 

    } catch (error) {
      console.error('Error logging in:', error);
      setError(error.message); 
    }
  };

  useEffect(() => {
    if (registerSuccess) {
      setTimeout(() => {
        setRegisterSuccess(false); 
      }, 3000);
    }
  }, [registerSuccess, setRegisterSuccess]);
  return (
    <div className="w-screen h-screen bg-[#1A2016] bg-[url('login.png')] bg-left bg-no-repeat pt-0 flex flex-col justify-center items-center">
      <h1 className='font-[rubik-mono] text-white text-[40px] mb-8'>A'rosa-je</h1>
      <div className='max-w-[644px] w-[80vw] h-[370px] bg-white bg-opacity-50 rounded-lg p-10 mx-auto  flex flex-col items-center justify-center'>
        <form onSubmit={handleLogin} className='flex flex-col items-center justify-center'>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" className='max-w-[400px] w-[70vw] h-[52px] rounded-full p-2 mb-4 mt-10'/>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Mot de passe' className='max-w-[400px] w-[70vw] h-[52px] rounded-full p-2 mb-6'/>
          {error && <p className="text-red-500 mb-4">Nom d'utilisateur ou mot de passe incorrect.</p>}
          <button type="submit" className='w-[250px] h-[41px] bg-[#01B763] rounded-full text-white font-[poppins-regular] mb-5'>Se connecter</button>
        </form>
        <p className=''>Vous n'avez pas de compte? <Link to="/register">Inscrivez-vous ici</Link></p>
      </div>
      {registerSuccess && (
        <div className="bg-green-500 p-3 rounded-md fixed bottom-0 right-8 mb-4 mx-auto max-w-md">
          <p className="text-white text-sm">Compte créé avec succès</p>
        </div>
      )}
    </div>
  );
};

export default Login;
