import { useToast } from '@/hooks/use-toast'
import { loginUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const initialState = {
  email: '',
  password: ''
}

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState)
  const {toast} = useToast();
  const dispatch  = useDispatch();
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const result = await dispatch(loginUser(formData));
  
      if (loginUser.fulfilled.match(result)) {
        const { success, message } = result.payload;
  
        if (success) {
          toast({
            title: 'Login successful',
            className: 'bg-green-500 text-white'
          });
          // Possibly navigate or update UI here
        } else {
          toast({
            title: message || 'Invalid credentials',
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: 'Login failed',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };
  

  return (
    <div className="p-10 w-full border rounded shadow">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome Back
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10 mt-6">
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
          Login
        </button>
      </form>
    </div>
  )
}

export default AuthLogin
