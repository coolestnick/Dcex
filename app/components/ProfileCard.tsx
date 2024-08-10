"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const ProfileCard = () => {
    const session = useSession();
    const router = useRouter();

    if(session.status === "loading") {
        return <div>Loading...</div>
    }

    if(!session.data?.user){
        router.push("/");;
        return null;
    }

    return <div className="pt-8 flex justify-center">
        <div className="max-w-4xl bg-white rounded shadow p-12">
            <Greeting image={session.data?.user?.image ?? ""} name={session.data?.user?.name ?? ""} />
            <Assets />
        </div>
    </div>
}

function Assets(){
    return (
        <div className="pt-8 flex justify-center text-slate-600">
            Account Assets
        </div>
    );
}

function Greeting({
    image, name
}:{
    image: string,
    name: string
}){
    return (
        <div className="pt-8 flex justify-center">
            <img src={image} className="w-16 h-16 rounded-full" />
            <span className="text-2xl font-semibold font-mono pl-2 flex flex-col justify-center">
                Welcome, {name}
            </span>
        </div>
    );
}