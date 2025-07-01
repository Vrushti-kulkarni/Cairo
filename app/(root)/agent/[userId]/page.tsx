import Agent from '@/components/Agent'
import React from 'react'

const Page = () => {
    return(
        // empty react fragment
        <>
        <h3>Agent Generation</h3>

        
        <Agent userName = "You" userId = "user1" type="generate"/>
        </>
    )
}

export default Page