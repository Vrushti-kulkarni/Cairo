import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';

const RootLayout = async ({ children }:{ children: ReactNode }) => {

    //after firebase setup
    const isUserAutheticated = await isAuthenticated();
    if(!isUserAutheticated) redirect ('/sign-in');


    // children passed as props of type reactnode
    return(
        

        //for logo
        <div className='root-layout'>
            <nav>

                {/* for the logo and name, pressing logo should reload page */}
                <Link href="/" className='flex items-center gap-2'>
                    <Image src="/logo.svg" alt="logo" width={38} height = {32}/>
                    <h2 className='text-primamry-100'>InterviewPrep</h2>
                </Link>
                
            </nav>

            {children}
        </div> // return children pages if any
    )
}



export default RootLayout