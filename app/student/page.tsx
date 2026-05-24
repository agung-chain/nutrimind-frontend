"use client";
import { supabase }
from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StudentBottomNav
from "@/components/StudentBottomNav";
export default function StudentHome() {
  const router = useRouter();

  const [profile, setProfile] =
    useState<any>(null);

  useEffect(() => {

    loadProfile();

  }, []);

async function loadProfile() {

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return;

  const data =
    localStorage.getItem(
      `profile_${user.email}`
    );

  if (data) {

    setProfile(
      JSON.parse(data)
    );

  }

}

  return (
    <div className="min-h-screen bg-gray-100 pb-24">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold">
          Halo, {profile?.name || "Siswa"} 👋
        </h1>
        <p className="opacity-90 mt-1">
          Selamat datang di NutriMind AI
        </p>
      </div>

      {/* STATUS CARD */}
      <div className="p-4 -mt-10">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-lg font-bold mb-2">
            Status Kesehatan Kamu 🧠
          </h2>

          <div className="flex justify-between mt-4">
            <div className="text-center">
              <p className="text-2xl">😊</p>
              <p className="text-sm text-gray-500">Mood</p>
            </div>

            <div className="text-center">
              <p className="text-2xl">😴</p>
              <p className="text-sm text-gray-500">Sleep</p>
            </div>

            <div className="text-center">
              <p className="text-2xl">🏃</p>
              <p className="text-sm text-gray-500">Sport</p>
            </div>

            <div className="text-center">
              <p className="text-2xl">🧠</p>
              <p className="text-sm text-gray-500">Mind</p>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK MENU */}
      <div className="px-4 grid grid-cols-2 gap-4 mt-4">

        <button
          onClick={() => router.push("/student/ai")}
          className="bg-white p-5 rounded-3xl shadow text-center active:scale-95 transition"
        >
          <p className="text-3xl">🤖</p>
          <p className="font-bold mt-2">AI Insight</p>
        </button>

        <button
          onClick={() => router.push("/student/checkin")}
          className="bg-white p-5 rounded-3xl shadow text-center active:scale-95 transition"
        >
          <p className="text-3xl">📊</p>
          <p className="font-bold mt-2">Check-in</p>
        </button>

        <button
          onClick={() => router.push("/student/progress")}
          className="bg-white p-5 rounded-3xl shadow text-center active:scale-95 transition"
        >
          <p className="text-3xl">📈</p>
          <p className="font-bold mt-2">Progress</p>
        </button>

        <button
          onClick={() => router.push("/student/rewards")}
          className="bg-white p-5 rounded-3xl shadow text-center active:scale-95 transition"
        >
          <p className="text-3xl">🏆</p>
          <p className="font-bold mt-2">Rewards</p>
        </button>

      </div>

      {/* AI BANNER */}
      <div className="px-4 mt-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-3xl shadow-lg">
          <h2 className="text-lg font-bold">
            AI Daily Tip 🧠
          </h2>
          <p className="mt-2 text-sm opacity-90">
            Jangan lupa minum air cukup dan tidur sebelum jam 10 malam 🚀
          </p>
        </div>
      </div>

      {/* BOTTOM NAV (simple dummy) */}
      <StudentBottomNav />

    </div>
  );
}