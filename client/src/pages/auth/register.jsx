// import CommonForm from '@/components/common/form'
// import { registerFormControls } from '@/config'
import { useToast } from '@/hooks/use-toast';
import { registerUser } from '@/store/auth-slice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { data, Link, useNavigate } from 'react-router-dom'

const initialState = {
  username : '',
  email : '',
  password : ''
}

const AuthRegister = () => {

  const [formData,setFormData] = useState(initialState)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      const actionResult = await dispatch(registerUser(formData)); // await the dispatch
      if (registerUser.fulfilled.match(actionResult)) { // check if the action was successful
        // Registration was successful, navigate to login or home
        console.log(actionResult.payload); // log response if needed
        toast({
          title:'Registration successful',
          className: 'bg-green-500 text-white'
        })
        navigate('/auth/login'); // Redirect to login page after successful registration
      } else {
        // Handle failed registration here (e.g., show an error message)
        console.log('Registration failed:', actionResult.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  console.log('Form submitted:', formData); 
  return (
    <div className="p-10 w-full border rounded shadow">
     <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-10 ">
        <div>
          <label className="block font-medium mb-1" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full border rounded px-3 py-2"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border rounded px-3 py-2"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full border rounded px-3 py-2"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default AuthRegister
