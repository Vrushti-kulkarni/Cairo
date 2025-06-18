import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

enum CallStatus{
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED'
}

const Agent = ({ userName }: AgentProps) => {
    //to figure out who is speaking
    const callStatus = CallStatus.FINISHED
    const isSpeaking = true;

    //transcript from vapi 
    const messages = [
        'What is your name?',
        'My name is vrushti, nice to meet you!'
    ]
    const lastMessage = messages[messages.length-1]

    return (
        <>
            {/* entire view */}
            <div className='call-view'>
                {/* the interviewers card */}
                <div className='card-interviewer'>
                    {/* the avatar image */}
                    <div className='avatar'>
                        <Image src="/ai-avatar.png" alt="vapi" width={65} height={54} className='object-cover' />
                        {isSpeaking && <span className='animate-speak' />}
                    </div>
                    <h3>Vapi</h3>
                </div>


                {/* for the interviewee/candidate card */}
                <div className='card-border'>
                    {/* the avatar image */}
                    <div className='card-content'>
                        <Image src="/user_avatar.png" alt="user avatar" width={65} height={54} className='rounded-full object-cover size-[120px]' />

                        <h3>{userName}</h3>
                    </div>
                </div>
            </div>

                {/* for the transcript from vapi */}
                {messages.length > 0 && (
                    <div className='transcript-border'>
                        <div className='transcript'>
                            <p key = {lastMessage} className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}>
                                {lastMessage}
                            </p>
                        </div>
                    </div>
                )}

                {/* for the bottom call status */}
                <div className='w-full flex justify-center'>

                    {/* if call status is active, it will show call button else end button */}
                    {callStatus != 'ACTIVE' ? (
                        <button className='relative btn-call'>
                            <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus!='CONNECTING' & 'hidden')}/>
                            
                            <span>
                                {callStatus === 'INACTIVE' || callStatus === 'FINISHED' ? 'Call' : ' . . . '} 
                            </span>




                        </button>
                    ) : (
                        <button className='btn-disconnect'>
                            End
                        </button>
                    )}
                </div>
        </>
    )
}

export default Agent