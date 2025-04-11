import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setToken ,setUser} from '../slice/AuthSlice'


const Login = () => {
    const [form,setForm]=useState({email:'',password:''})
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post('http://localhost:3000/auth/login',form);
            // console.log(res.data.user.username)

            dispatch(setToken(res.data.token))
            dispatch(setUser(res.data.user.username))
            navigate('/');
        }catch(e){
            alert('login failed')
        }

    }

  return (
   <>
   <div className='min-h-screen flex items-center justify-center bg-gray-100'>
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2  className="text-2xl font-bold mb-4">Login</h2>
        <input  name='email' type='email' placeholder='email' value={form.email} onChange={handleChange} className="mb-3 w-full p-2 border rounded" required/>
        <input name='password' type='password' placeholder='password' value={form.password} onChange={handleChange} className="mb-3 w-full p-2 border rounded" required/>
        <button type='submit' className="bg-green-500 text-white px-4 py-2 rounded w-full">Submit</button>
    </form>
   </div>
   </>
  )
}

export default Login
