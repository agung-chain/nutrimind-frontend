"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  // =========================
  // REGISTER
  // =========================

  const register = async () => {

    const { error } = await supabase.auth.signUp({

      email,
      password,

      options: {
        data: {
          role
        }
      }

    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Register success 🚀");
  };

  // =========================
  // LOGIN
  // =========================

  const login = async () => {

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  // 🔥 GET USER
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.email) {

    alert("User tidak ditemukan");
    return;

  }

  // 🔥 ROLE
  const role =
    user.user_metadata?.role || "student";

  try {

    // 🔥 AMBIL PROFILE
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${user.email}`
    );

    const profile = await response.json();

    console.log("PROFILE:", profile);

    // ====================================
    // STUDENT
    // ====================================

    if (role === "student") {

      // 🔥 USER BARU
      if (!profile?.student_uid) {

        router.push("/student/profile");
        return;

      }

      // 🔥 USER SUDAH PUNYA PROFILE
      localStorage.setItem(
        "profile",
        JSON.stringify(profile)
      );

      router.push("/student");
      return;
    }

    // ====================================
    // ROLE LAIN
    // ====================================

    if (role === "parent") {

      router.push("/parent");

    } else if (role === "school") {

      router.push("/school");

    } else if (role === "sppg") {

      router.push("/sppg");

    } else {

      router.push("/dashboard");

    }

  } catch (err) {

    console.log(err);

    // 🔥 FALLBACK
    // kalau backend gagal,
    // tetap arahkan ke profile

    if (role === "student") {

      router.push("/student/profile");

    } else {

      alert("Gagal mengambil profile");

    }
  }
};

  // =========================
  // GOOGLE LOGIN
  // =========================

  const googleLogin = async () => {

    await supabase.auth.signInWithOAuth({
      provider: "google"
    });
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          NutriMind
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Smart Wellness System 🚀
        </p>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* ROLE */}

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-3 rounded-xl mb-6 outline-none focus:ring-2 focus:ring-blue-400"
        >

          <option value="student">
            Student
          </option>

          <option value="parent">
            Parent
          </option>

          <option value="school">
            School
          </option>

          <option value="sppg">
            SPPG
          </option>

        </select>

        {/* LOGIN BUTTON */}

        <button
          onClick={login}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl mb-3 transition"
        >
          Login
        </button>

        {/* REGISTER BUTTON */}

        <button
          onClick={register}
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl mb-3 transition"
        >
          Register
        </button>

        {/* GOOGLE LOGIN */}

        <button
          onClick={googleLogin}
          className="w-full bg-white border p-3 rounded-xl hover:bg-gray-50 transition"
        >
          Login with Google
        </button>

      </div>

    </div>
  );
}