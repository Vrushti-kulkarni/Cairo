"use client" // used when u use some client functionality like button 

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

//double check the below import
import { useRouter } from "next/navigation"
import { z } from "zod"

import Image from "next/image"
import Link from "next/link"


import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"


import { toast } from "sonner"
import FormField from "./FormField"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"

import Vapi from '@vapi-ai/web';

//delete this
//const formSchema = z.object({
//    username: z.string().min(2).max(50),
//})

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3)
    })

}

//here type form type is written because in sign in and sign up we have mentioned "type" hence for conditional rendering we pass props
const AuthForm = ({ type }: { type: FormType }) => {

    //for routing in try catch block
    const router = useRouter();

    //add this line 
    const formSchema = authFormSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            if (type === 'sign-up') {


                //adding the firebase extra code here
                const { name, email, password } = values;
                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
                const result = await signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    email,
                    password
                })

                if (!result?.success) {
                    toast.error(result?.message);
                    return;
                }

                toast.success("Account created successfully. Please sign in.");
                router.push('/sign-in');
            }
            else {

                //added firebase code

                const { email, password } = values;
                const userCredentials = await signInWithEmailAndPassword(auth, email, password);
                const idToken = await userCredentials.user.getIdToken();
                if (!idToken) {
                    toast.error('Sign in failed')
                    return;
                }

                await signIn({
                    email, idToken
                })

                toast.success("Signed in successfully");
                router.push('/');
            }

        }
        catch (error: any) {
            console.log(error)
            // Firebase error messages are in error.code
            let message = "There was an error. Please try again.";
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                message = "Invalid email or password.";
            } else if (error.message) {
                message = error.message;
            }
            toast.error(message)
        }
    }

    //boolean value assigned to isSignIn for conditional rendering
    const isSignIn = type === 'sign-in';

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="w-10 h-10 bg-black rounded flex items-center justify-center">
                    <h2 className="text-primary text-white font-bold text-sm">H</h2>
                </div>
                {/* <span className="font-semibold text-lg">HealthWise</span> */}
                <h2 className='text-primary-100'>HealthWise</h2>

                <h3 className="flex justify-center">Your AI health care assistant</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form ">

                        {/* conditional rendering  */}

                        {/* for name */}
                        {!isSignIn && (
                            <FormField
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="Your name" />
                        )}

                        {/* for email */}

                        <FormField
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Enter your email-d"
                            type="email"
                        />



                        {/* for password */}

                        <FormField
                            control={form.control}
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                        />


                        <Button className="btn" type="submit">{isSignIn ? 'Sign In' : 'Create an Account'}</Button>
                    </form>
                </Form>
                <p className="text-center">
                    {isSignIn ? 'No account yet?' : 'Have an account already?'}
                    <Link href={!isSignIn ? '/sign-in' : '/sign-up'}
                        className="font-bold text-user-primary ml-1">
                        {!isSignIn ? 'Sign in' : 'Sign up'}
                    </Link>

                </p>
            </div>
        </div>
    );
};

export default AuthForm