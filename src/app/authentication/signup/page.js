import React from 'react'
import Image from 'next/image'
// import Email from '../../../assets/Email.png'
import FormImage from '../../../assets/form.png'
import Logo from '../../../components/others/logo'
import RegistrationInput from '../../../components/antd/registerInput'
import Link from 'next/link'


export default function login(){
  return (
<div className='flex flex-col-reverse flex-col lg:flex-row h-fit lg:h-screen w-screen bg-orange-50 text-2xl'>
      <div className='lg:w-1/2 flex items-center justify-center'>
        <Image src={FormImage} />
      </div>
      <div className='lg:w-1/2 rounded m-2 lg:m-6 px-2 py-12 flex flex-col gap-8 items-center justify-center'>
        <div><Logo /></div>
        <div className='bg-white/75 flex items-center justify-center p-10 rounded-2xl flex-col gap-8'>
          <div className='font-bold'>
            Create your new account
          </div>
          <RegistrationInput />
          <div className='text-base'>
            Already have an account ? <Link href={"/authentication/signin"} className='text-blue-500'> SignIn!</Link>
          </div>
        </div>
      </div>
    </div>
  )
}