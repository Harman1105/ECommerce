import React from 'react';
import { Outlet } from 'react-router-dom';
import loginImg from '../../assets/loginImg.jpeg';

const AuthLayout = () => {
  return (
    <div className='flex min-h-screen w-full'>
      {/* Left Half: Image with Overlay Text */}
      <div className='relative hidden lg:flex w-1/2 items-center justify-center px-12 bg-black'>
        <img
          src={loginImg}
          alt="Login"
          className='absolute inset-0 h-full w-full object-cover opacity-75'
        />
        <div className='relative z-10 max-w-md space-y-6 text-center text-white'>
          <h1 className='text-4xl font-extrabold tracking-tight'>
            WELCOME TO inFiNiTy PiCkS
          </h1>
        </div>
      </div>

      {/* Right Half: Outlet for Auth Pages */}
      <div className='flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
