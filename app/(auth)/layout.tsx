import { ReactNode } from 'react'
import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';

const AuthLayout = async ({ children }:{ children: ReactNode }) => {
    //after firebase setup
    const isUserAutheticated = await isAuthenticated();
        if(isUserAutheticated) redirect ('/');
    
    // children passed as props of type reactnode
    return(
        //render children pages
        // css for auth-layout class name is written in global.css
        <div className='auth-layout'>{children}</div> // return children pages if any
    )
}



export default AuthLayout