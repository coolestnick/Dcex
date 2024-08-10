import db from "@/app/db";
import { ProfileCard } from "../components/ProfileCard";
import { getServerSession } from "next-auth";
import { authConfig } from "../lib/auth";

async function getBalances(){
    const session = await getServerSession();

    return db.solwallet.findFirst({
        where: {
            userId: session?.user?.uid
        }

    })
}
export default function() {
    
    return <div>
        <ProfileCard />
    </div>
}