"use client";
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from "./Button";

export const Appbar = () => {
    const session = useSession();

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <span className="text-white text-2xl font-bold">DCEX</span>
                    </div>
                    <div className="ml-4 flex items-center md:ml-6">
                        {session.data?.user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-white">{session.data.user.name}</span>
                                <Button 
                                    onClick={() => signOut()}                                
                                  >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <Button 
                                onClick={() => signIn()}
                              >
                                Sign In
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}