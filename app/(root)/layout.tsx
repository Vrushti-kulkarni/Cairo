import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import { div } from 'framer-motion/client';

const RootLayout = async ({ children }:{ children: ReactNode }) => {

    //after firebase setup
    const isUserAutheticated = await isAuthenticated();
    if(!isUserAutheticated) redirect ('/sign-in');


    // children passed as props of type reactnode
    return(
        //for logo
        <div className='min-h-screen overflow-hidden bg-grid-pattern'>
            {children}
        </div>
         // return children pages if any
    )
}



export default RootLayout