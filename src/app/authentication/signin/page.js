import React from 'react'
import Image from 'next/image'
import LoginImage from '../../../assets/Login.png'
import LoginInput from '../../../components/antd/loginInput.js'
import Logo from '../../../components/others/logo'
import Link from 'next/link'

export default function login(){
  return (
    <div className='flex flex-col lg:flex-row h-fit lg:h-screen w-screen bg-indigo-50 text-2xl'>
      <div className='lg:w-1/2 rounded m-2 lg:m-6 px-2 py-12 flex flex-col gap-8 items-center justify-center'>
        <div><Logo /></div>
        <div className='bg-white/75 flex items-center justify-center p-10 rounded-2xl flex-col gap-8'>
          <div className='font-bold'>
            Sign In to your account
          </div>
          <LoginInput />
          <div className='flex flex-col items-center gap-2'>
            <div className='text-base'>
              New here ? <Link href={"/authentication/signup"} className='text-blue-500'> Signup!</Link>
            </div>
            <div className='text-base'>
              Forgot Password? <Link href={"/authentication/forgot-password"} className='text-blue-500'> Reset Here</Link>
            </div>
          </div>
        </div>
      </div>
      <div className='lg:w-1/2 flex items-center justify-center'>
        <Image src={LoginImage} />
      </div>
    </div>
  )
}