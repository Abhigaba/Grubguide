"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '@/config/appwrite';
import { useAuth } from '../contexts/useAuth';
import Link from 'next/link'

const UserLogin = () => {
  
  const [error, setError] = useState(null);
  const router = useRouter()
  const {user, setUser} = useAuth() 


  const handleLogin = async (e) => {
    
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await account.createEmailPasswordSession(email, password);
      setUser(await account.get())
      console.log("Login page")
      router.push('/');
  } catch (err) {
      setUser(null);
      setError(err.message);
  }
  };

function Button({value}) {
  return (
    <button 

      className="mt-6 transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">
      {value}
  </button>
  )
}

  function Input({type, id, name, label, placeholder, autofocus}) {
    return (
      <label className="text-gray-500 block mt-3">{label}
        <input
          autoFocus={autofocus}
          type={type} 
          id={id} 
          name={name} 
          placeholder={placeholder}
          className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"/>
      </label>
    )
  }

  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
    <div className="relative border-t-8 rounded-sm border-indigo-600 bg-white px-12 pt-8 pb-16 shadow-2xl w-96">
      <h1 className="font-bold text-center block text-2xl">Log In</h1>
      <form onSubmit={(e) => handleLogin(e)}>
      <Input type="email" id="email" name="email" label="Email Address" placeholder="me@example.com" autofocus={true}/>
      <Input type="password" id="password" name="password" label="Password" placeholder="••••••••••" />
      <Button value="Submit" />
      </form>
      <Link href="/Register" className={`absolute bottom-7`}>New User? Sign up</Link>
      {error && <p>{error}</p>}
    </div>
  </div>
  );
};

export default UserLogin;
