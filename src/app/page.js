import { Loader2 } from 'lucide-react';
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      // Has token, redirect to dashboard
      router.push("/dashboard");
    } else {
      // No token, redirect to login
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg"><div className="flex items-center justify-center gap-2"><Loader2 className="animate-spin w-5 h-5" /> Loading...</div></div>
    </div>
  );
}
