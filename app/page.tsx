"use client";

import { useEffect }
from "react";

import { useRouter }
from "next/navigation";

import { supabase }
from "@/lib/supabase";

export default function HomePage() {

  const router = useRouter();

  useEffect(() => {

    checkUser();

  }, []);

  async function checkUser() {

    // 🔥 CEK USER LOGIN

    const {
      data: { user }
    } = await supabase.auth.getUser();

    // ❌ BELUM LOGIN

    if (!user) {

      router.push("/login");

      return;
    }

    // 🔥 CEK PROFILE

    const profile =
      localStorage.getItem(
        `profile_${user.email}`
      );

    // ❌ BELUM ADA PROFILE

    if (!profile) {

      router.push(
        "/student/profile"
      );

      return;
    }

    // ✅ SUDAH ADA PROFILE

    router.push("/student");
  }

  return (

    <div className="flex items-center justify-center min-h-screen">

      <p className="text-2xl font-bold">

        Loading NutriMind AI...

      </p>

    </div>
  );
}