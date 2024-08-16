"use client"
import { useState } from 'react';
import { account } from '@/config/appwrite';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/useAuth';
import { ID } from 'appwrite';
import Link from 'next/link'

const Register = () => {
  const [error, setError] = useState('');
  const [passError , setpassError] = useState(false)
  const router = useRouter()
  const {setUser}  =useAuth()

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    
    try {
      if (password.length < 8 ) {
        setpassError(true);
        throw {message: "Password length must be greater than 8"}
    }
      const res = await account.create(ID.unique(), email, password, name);
      if (res){
        await account.createEmailPasswordSession(email, password);
        setUser(await account.get())
        console.log("Register login")
        router.push('/');
      }
  } catch (err) {
      setError(err.message);
  }
    }


  function Button({value}) {
    return (
      <button type='submit'
        className="mt-6 transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">
        {value}
    </button>
    )
  }
  
    function Input({type, id, name, label, placeholder, autofocus, className=false}) {
      return (
        <label className="text-gray-500 block mt-3">{label}
          <input
            autoFocus={autofocus}
            type={type} 
            id={id} 
            name={name} 
            placeholder={placeholder}
            className={`rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400
             focus:outline-none  ${className ? "focus:ring-red-500" : "focus:ring-indigo-100"}` }/>
        </label>
      )
    }
  
  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
    <div className=" border-t-8 rounded-sm border-indigo-600 relative bg-white px-12 pt-8 pb-16 shadow-2xl w-96">
      <h1 className='font-bold text-center block text-2xl'>Register</h1>
      <form onSubmit={handleRegister}>
      <Input type="text" id="name" name="name" label="User_name" placeholder="Username" autofocus={true}/>
      <Input type="email" id="email" name="email" label="Email Address" placeholder="me@example.com" autofocus={true} />
      <Input type="password" id="password" name="password" label="Password" placeholder="••••••••••" className={passError ? true : false}/>
      <Button value="Register" />
             </form>
             <Link href="/UserLogin" className={`absolute bottom-6`}>Already Registered? Log In</Link>
      {error && <p>{error}</p>}
    </div>
    </div>

  );
};

export default Register;
