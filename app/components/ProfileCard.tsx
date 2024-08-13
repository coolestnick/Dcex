"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./Button";

export const ProfileCard = ({ publicKey }: { publicKey: string }) => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (!session.data?.user) {
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <Greeting image={session.data?.user?.image ?? ""} name={session.data?.user?.name ?? ""} />
        </div>
        <div className="p-6">
          <Assets publicKey={publicKey} />
        </div>
      </div>
    </div>
  );
};

function Assets({ publicKey }: { publicKey: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Assets</h2>
      <div className="bg-gray-100 rounded-lg p-4 flex justify-between items-center">
        <div className="text-gray-600 font-mono">{publicKey.slice(0, 20)}...</div>
        <div></div>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(publicKey);
            setCopied(true);
          }}
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            copied
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
}

function Greeting({ image, name }: { image: string; name: string }) {
  return (
    <div className="flex items-center space-x-4">
      <img src={image} alt={name} className="w-20 h-20 rounded-full border-4 border-white shadow-lg" />
      <div>
        <p className="text-lg text-white opacity-75">Welcome,</p>
        <h1 className="text-3xl font-bold text-white">{name}</h1>
      </div>
    </div>
  );
}