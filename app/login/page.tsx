"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("student");

  const register = async () => {

  const { error } = await supabase.auth.signUp({

    email,
    password,

    options: {

      data: {
        role: role
      }

    }

  });

  if (error) {

    alert(error.message);

  } else {

    alert("Register success");

  }
};

  const login = async () => {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {

      alert(error.message);

    } else {

      const { data } = await supabase.auth.getUser();

      const role =
        data.user?.user_metadata?.role;

      if (role === "student") {

        router.push("/student/profile");

      }
      else if (role === "parent") {

        router.push("/parent");

      }
      else if (role === "school") {

        router.push("/school");

      }
      else if (role === "sppg") {

        router.push("/sppg");

      }
      else {

        router.push("/dashboard");

      }

    }
  };

  const googleLogin = async () => {

    await supabase.auth.signInWithOAuth({
      provider: "google"
    });
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          NutriMind AI
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setRole(e.target.value)}
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

        </select>
        <button
          onClick={login}
          className="w-full bg-blue-500 text-white p-3 rounded mb-3"
        >
          Login
        </button>

        <button
          onClick={register}
          className="w-full bg-green-500 text-white p-3 rounded mb-3"
        >
          Register
        </button>
       
      </div>

    </div>
  );
}