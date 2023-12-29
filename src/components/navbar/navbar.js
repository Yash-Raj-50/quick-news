'use client'

import React, {useState, useEffect} from 'react'
import Logo from '../others/logo'
import Link from 'next/link'
import { auth } from '../../app/firebase/config';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { Button, Drawer } from 'antd';
import Image from 'next/image'
import profilePic from '../../assets/stock-profile.png'

const Navbar = () => {

    const router = useRouter();
    const logout = () => {
        signOut(auth);
        if(typeof window !== 'undefined') {
            sessionStorage.removeItem('user_email');
            sessionStorage.removeItem('user_id');
        }
        router.push('/authentication/signin');
    }
    const [open, setOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const toggleDrawer = () => {setOpen(!open)};
    const updatePredicate = () => {
        setIsDesktop(window.innerWidth > 768);
    };
    useEffect(() => {
        updatePredicate();
        window.addEventListener("resize", updatePredicate);
    
        return () => {
          window.removeEventListener("resize", updatePredicate);
        };
    }, []);

    return (
        <div className='bg-slate-200 w-full flex justify-center' style={{ height: "7%" }}>
            <div className='flex h-full w-full max-w-screen-xl items-center justify-between px-8 py-1'>
                <Link href={"/"} className='h-full md:visible invisible'><Logo /></Link>
                { isDesktop ? (
                    <div className='flex gap-10 h-full'>
                        <Link href={"/user/favourites"} className='flex items-center gap-2 justify-center h-full'>Favourites <i class="bi bi-heart-fill"></i></Link>
                        <Link href={"/user/saved"} className='flex items-center gap-2 justify-center h-full'>Saved <i class="bi bi-arrow-down"></i></Link>
                        <button className='flex items-center gap-2 justify-center bg-indigo-100 p-3 border border-black rounded hover:scale-105 h-full'
                            onClick={logout}
                            >
                            {(typeof window !== 'undefined')
                            && (sessionStorage.getItem('user_email'))}
                            {/* {sessionStorage.getItem('user_email')} */}
                            <div className='bg-white rounded-full h-10'>
                                <Image src={profilePic} className='h-full w-full'/>
                            </div>
                        </button>
                    </div>
                ) : (
                    <>
                    <Button onClick={toggleDrawer} className='text-2xl flex items-center'>
                        <i class="bi bi-list"></i>
                    </Button>
                    <Drawer title={(<Link href={"/"} onClick={toggleDrawer}><Logo /></Link>)} placement="right" onClose={toggleDrawer} open={open}>
                        <div className='flex flex-col h-full gap-8 text-xl'>
                            <Link href={"/user/favourites"} onClick={toggleDrawer} className='flex items-center gap-2 justify-center'>Favourites <i class="bi bi-heart-fill"></i></Link>
                            <Link href={"/user/saved"} onClick={toggleDrawer} className='flex items-center gap-2 justify-center'>Saved <i class="bi bi-arrow-down"></i></Link>
                            <button className='flex items-center gap-2 justify-center bg-indigo-100 p-3 border border-black rounded hover:scale-105'
                                onClick={logout}
                                >
                                {(typeof Window !== 'undefined') && sessionStorage.getItem('user_email')}
                                <div className='bg-white rounded-full h-10'>
                                    <Image src={profilePic} className='h-full w-full'/>
                                </div>
                            </button>
                        </div>
                    </Drawer>
                    </>
                ) }
            </div>
        </div>
    )
}

export default Navbar