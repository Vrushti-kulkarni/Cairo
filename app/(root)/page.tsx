import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { dummyInterviews } from '@/constants';
import InterviewCard from '@/components/InterviewCard';

const Page = () => {
  return (
    <>

      {/* Section for the first blue box  */}
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Get Interview-Ready with AI Powered Practice & Feedback</h2>
          <p className='text-lg'>
            Practice on real interview questions & get real feedback
          </p>

          {/* Button  */}
          <Button asChild className='btn-primary max-sm: w-full'>
            <Link href="/interview">Start an interview</Link>
          </Button>
        </div>

        {/* Robot image  */}
        <Image src='/robot.png' alt="robo-dude" width={400} height={400} className='max-sm:hidden'>

        </Image>

      </section>


      {/* Section for the smaller boxes - Your interviews */}
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>
        <div className='interviews-section'>
          {/* Uncomment the dummyInterviews from constants index.ts*/}

          {/* map each interview to a component called InterviewCard, make this component in components */}
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key = {interview.id}/>
          ))}

        </div>
      </section>


      {/* Section for the smaller boxes - Take an interview */}
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an Interview</h2>
        <div className='interviews-section'>
          {/* map each interview to a component called InterviewCard, make this component in components */}
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key = {interview.id} />
          ))}

        </div>
      </section>


    </>
  )
}

export default Page