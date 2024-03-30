import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import useStore from '../store/Store';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const store = useStore();
  const navigate = useNavigate(); 
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await store.login(username, password);
      store.setToken(token);
    } catch (error) {
      console.error('Error logging in:', error);
      setError(true);
    }finally{
      navigate('/home');
    }
  };

  return (
    <div className="w-screen h-screen bg-[#1A2016] pt-0 flex flex-col justify-center items-center">
      <h1 className='font-[rubik-mono] text-white text-[40px] mb-8'>A'rrosa-je</h1>
      <div className='w-[644px] h-[370px] bg-white bg-opacity-50 rounded-lg p-10 mx-auto  flex flex-col items-center justify-center'>
        <form onSubmit={handleLogin} className='flex flex-col items-center justify-center'>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className='w-[400px] h-[52px] rounded-full p-2 mb-4 mt-10'/>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Mot de passe' className='w-[400px] h-[52px] rounded-full p-2 mb-6'/>
          {error && <p className="text-red-500 mb-4">Nom d'utilisateur ou mot de passe incorrect.</p>}
          <button type="submit" className='w-[250px] h-[41px] bg-[#01B763] rounded-full text-white font-[poppins-regular] mb-5'>Se connecter</button>
        </form>
        <p className=''>Vous n'avez pas de compte? <Link to="/register">Inscrivez-vous ici</Link></p>
      </div>
    </div>
  );
};

export default Login;
