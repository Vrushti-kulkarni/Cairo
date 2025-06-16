import { getTechLogos } from '@/lib/utils'
import React from 'react'
import Image from 'next/image';
import { cn } from "@/lib/utils";

const DisplayTechIcons = async ({techStack}: TechIconProps) => {

    // since its await, we will use async
    const techIcons = await getTechLogos(techStack);
    return(
        <div className='flex flex-row'>{techIcons.slice(0, 3).map(({tech, url}, index) => (

            // we use the cn property in order to make it dynamic and make the icons overlap on each other
            <div key = {tech} className={cn('relative group bg-dark-300 rounded-full p-2 flex-center', index >= 1 && '-ml-3')}>
                <span className='tech-tooltip'>{tech}</span>
                <Image src = {url} alt = {tech} width = {100} height = {100} className='size-5'/>

            </div>
        ))}</div>
    )
}

export default DisplayTechIcons