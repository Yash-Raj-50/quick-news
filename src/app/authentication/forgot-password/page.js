import React from 'react'
import Image from 'next/image'
import EmailImage from '../../../assets/Email.png'
import Logo from '../../../components/others/logo'
import Link from 'next/link'
import ResetInput from '../../../components/antd/resetInput'

export default function login(){
  return (
    <div className='flex flex-col lg:flex-row h-fit lg:h-screen bg-blue-50 w-screen text-2xl'>
      <div className='lg:w-1/2 rounded m-2 lg:m-6 px-2 py-12 flex flex-col gap-8 items-center justify-center'>
        <div><Logo /></div>
        <div className='bg-white/75 flex items-center justify-center p-10 rounded-2xl flex-col gap-8'>
          <div className='font-bold'>
            Reset your password
          </div>
          {/* <LoginInput /> */}
          <ResetInput />
          <div className='flex flex-col items-center gap-2'>
            <div className='text-base'>
              Back to - <Link href={"/authentication/signin"} className='text-blue-500'> SignIn!</Link>
            </div>
          </div>
        </div>
      </div>
      <div className='lg:w-1/2 flex items-center justify-center'>
        <Image src={EmailImage} />
      </div>
    </div>
  )
}