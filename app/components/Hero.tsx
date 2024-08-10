"use client";
import { signIn, useSession } from "next-auth/react";
import { SecondaryButton } from "./Button";
import { useRouter } from "next/navigation";

export const Hero = () => {
    const session = useSession();
    const router = useRouter();
    return (
        <div className="flex flex-col h-screen">
            <h1 className=" flex text-4xl font-bold font-mono justify-center">
                Welcome to<span className="text-blue-400 pl-2">DCEX</span>
            </h1>
            <span className="flex text-xl font-mono pt-2 text-gray-600 justify-center">
                Create a frictionless wallet with your google account.
            </span>
            <p className="text-2xl p-2 font-mono">
                The best place to buy and sell digital currencies.
            </p>
            <div className="flex justify-center pt-2">
                {session.data?.user ?<SecondaryButton onClick={() => router.push("/dashboard")}>
                    Go to the Dashboard   
                </SecondaryButton> : <SecondaryButton onClick={() => signIn("google")}>
                    Sign In With Google    
                </SecondaryButton>}
            </div>
        </div>
    );
}
