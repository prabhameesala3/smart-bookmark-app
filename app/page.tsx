"use client";

import { useEffect } from "react";
// import { supabase } from "@/lib/supabase";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/dashboard");
      }
    };
    checkUser();
  }, []);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={signIn}>
        Login with Google
      </button>
    </div>
  );
}
