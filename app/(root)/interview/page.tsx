import Agent from '@/components/Agent'
import React from 'react'

const Page = () => {
    return(
        // empty react fragment
        <>
         <div className='root-layout'>
            <h2 className="text-3xl font-light tracking-tighter text-white md:text-4xl/tight">
                    <span className="text-[#FF8C00] font-medium"> Cairo</span>-{' '}
                    your AI 
                    <span className="text-[#FF8C00] font-medium"> medical assistant</span>
                  </h2>

        
            <Agent userName = "You" userId = "user1" type="generate"/>


         </div>
        
        </>
    )
}

export default Page