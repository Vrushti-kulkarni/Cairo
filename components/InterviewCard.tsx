import React from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { cn,    getRandomInterviewCover } from '@/lib/utils';
import { Button } from './ui/button';
import Link from 'next/link';
import DisplayTechIcons from './DisplayTechIcons';





const PatientCard = ({ interviewId, userId, createdAt }: InterviewCardProps) => {

    const feedback = null as Feedback | null;

    //type could be
    //technical
    //mix of technical and behavioural 


    //gi stands for g- global , i-case insensitive
    //regex expression
    const formatedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('D MMM, YYYY')


    // 3 vertical scrollable sections, each a page card with random feature names and bg colors
    const features = [
      { name: 'AI Analysis', bg: 'bg-blue-200' },
      { name: 'Instant Feedback', bg: 'bg-green-200' },
      { name: 'Expert Review', bg: 'bg-yellow-200' },
    ];
    return (
      <div className="w-[360px] max-sm:w-full h-96 rounded-xl shadow-lg overflow-hidden flex flex-col snap-y snap-mandatory overflow-y-auto">
        {features.map((feature, idx) => (
          <div
            key={feature.name}
            className={`flex-1 min-h-0 flex flex-col items-center justify-center ${feature.bg} snap-center`}
            style={{ minHeight: '33.33%' }}
          >
            <h3 className="text-xl font-bold mb-2">{feature.name}</h3>
            <p className="text-gray-700 text-sm">Section {idx + 1} content for {feature.name}.</p>
          </div>
        ))}
      </div>
    )
}



export default PatientCard