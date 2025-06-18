import {generateText} from "ai"; 
import {google} from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin"

//TO GET THE DATA FROM USER TO AI ASSISTANT
export async function GET() {
    return Response.json({_success: true, data : 'THANK YOU!'}, {status : 200});
}

//TO POST THE DATA FROM AI ASSISTANT TO USER

export async function POST(request: Request) {

    //you can add cover image to params if u want to show custom profile picture or cover page of company
    const { type, role, techstack, level , amount, userid} = await request.json();

    try{
        //generate ai text that vapi will use
        const { text: questions } = await generateText({
            model: google('gemini-2.0-flash-001'),
            prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `
        });

        //store the questions to database
        const interview = {
            role, type, level, 
            techstack: techstack.split(','), 
            questions: JSON.parse(questions),
            userId : userid,
            finalized : true, 

            //for now we use random interview cover page
            coverImage : getRandomInterviewCover(),
            createdAt : new Date().toISOString()
        }

        //adding the interview to db
        await db.collection("interviews").add(interview);

        return Response.json({ success : true}, {status : 200})
    }
    catch (error) {
        console.error(error);

        return Response.json({_success : false, error : error}, {status : 500})
    }

}