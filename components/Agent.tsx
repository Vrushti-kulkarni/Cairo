'use client'
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Vapi from '@vapi-ai/web';


enum CallStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
}

import { useState } from 'react';

const Agent = ({ userName }: AgentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState<'Cairo' | 'user' | null>(null);
    const [vapi, setVapi] = useState<any>(null);
    const [messages, setMessages] = useState<{ sender: 'Cairo' | 'user', text: string }[]>([]);
    const [currentRoll, setcurrentRoll] = useState<string>()
    const [liveTranscript, setliveTranscript] = useState<string>()

    const handleCall = () => {
        if (!vapi) {
            const VapiClass = require('@vapi-ai/web').default;
            const vapiInstance = new VapiClass(process.env.NEXT_PUBLIC_VAPI_API_KEY!);

            // Listen for events
            vapiInstance.on('call-start', () => {
                console.log('Call started');
                setCallStatus(CallStatus.ACTIVE);
            });
            vapiInstance.on('call-end', () => {
                console.log('Call ended');
                setCallStatus(CallStatus.INACTIVE);
                setIsSpeaking(null);
            });
            vapiInstance.on('message', (message: any) => {
                if (message.type === 'transcript') {
                    const {role, transcriptType, transcript} = message;
                    console.log(`${role}: ${transcript}`);
                    // Normalize role to 'vapi' or 'user'
                    let normalizedRole = 'user';
                    if (role === 'agent' || role === 'assistant' || role === 'Cairo') {
                        normalizedRole = 'Cairo';
                    }
                    if (transcriptType === 'partial') {
                        setliveTranscript(transcript);
                        setcurrentRoll(normalizedRole);
                    } else {
                        // Final transcript
                        setliveTranscript(transcript);
                        setcurrentRoll(normalizedRole);
                    }
                }
            });

            vapiInstance.on('speech-start', () => {
                console.log('Assistant started speaking');
                setcurrentRoll('Cairo');

            });


            vapiInstance.on('speech-end', () => {
                console.log('Assistant stopped speaking');
                setcurrentRoll('user');
            });

            setVapi(vapiInstance);
            vapiInstance.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID!);
        } else {
            vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID!);
        }
        // setCallStatus(CallStatus.ACTIVE); // Now handled by event
    };

    const handleEnd = () => {
        if (vapi) {
            vapi.stop && vapi.stop();
        }
        setCallStatus(CallStatus.INACTIVE);
        setIsSpeaking(null);
        setliveTranscript(undefined);
        setcurrentRoll(undefined);
    };

    return (
        <>
            {/* entire view */}
            <div className='call-view'>
                {/* the interviewers card */}
                <div className='card-interviewer'>
                    {/* the avatar image */}
                    <div className='avatar'>
                        <Image src="/cairo.png" alt="Cairo" width={120} height={140} className='object-cover rounded-full' />
                        {isSpeaking && <span className='animate-speak' />}
                    </div>
                    <h3>Cairo</h3>
                </div>


                {/* for the interviewee/candidate card */}
                <div className='card-border'>
                    {/* the avatar image */}
                    <div className='card-content'>
                        <Image src="/user_avatar.png" alt="user avatar" width={65} height={54} className='rounded-full object-cover size-[120px]' />
                        {!isSpeaking && <span className='animate-speak' />}
                        <h3>{userName}</h3>
                    </div>
                </div>
            </div>

                {/* for the transcript from vapi */}
                {(callStatus === CallStatus.ACTIVE && currentRoll && liveTranscript) && (
                    <div className='transcript-border'>
                        <div className='transcript flex flex-col gap-2'>
                            <p className={cn(
                                'transition-opacity duration-500 opacity-0',
                                'animate-fadeIn opacity-100',
                                currentRoll === 'Cairo' ? 'text-blue-600' : 'text-green-700',
                                'font-bold'
                            )}>
                                <span className="mr-2 font-semibold">{currentRoll === 'Cairo' ? 'Cairo:' : 'You:'}</span>
                                {liveTranscript}
                            </p>
                        </div>
                    </div>
                )}

                {/* for the bottom call status */}
                <div className='w-full flex justify-center'>
                    {callStatus !== CallStatus.ACTIVE ? (
                        <button className='relative btn-call bg-green-500 text-white' onClick={handleCall}>
                            <span>Call</span>
                        </button>
                    ) : (
                        <button className='btn-disconnect bg-red-500 text-white' onClick={handleEnd}>
                            End
                        </button>
                    )}
                </div>
        </>
    )
}

export default Agent