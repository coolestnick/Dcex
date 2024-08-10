"use client";
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from "./Button";

export const Appbar = () => {
    const session = useSession();
  return (
    <div className="flex justify-between p-2 border-b-2 border-b-slate-400">
      <div>
        DCEX
      </div>
      <div>
        {session.data?.user ? <Button onClick={() => {
            signOut()
          }}>Logout</Button> : <Button onClick={() => {
            signIn()
        }}>Sign In</Button>}
      </div>
    </div>
  );
}