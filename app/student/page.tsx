"use client";

import { useEffect, useState } from "react";

import { useRouter }
from "next/navigation";

import StudentBottomNav
from "@/components/StudentBottomNav";

export default function StudentHome() {

  const router = useRouter();

  const [profile, setProfile] =
    useState<any>(null);

  const [latestCheckin, setLatestCheckin] =
    useState<any>(null);

  const [loading, setLoading] =
    useState<boolean>(true);

  // =========================
  // INIT
  // =========================

  useEffect(() => {

    init();

  }, []);

  async function init() {

    try {

      // 🔥 LOAD PROFILE
      const raw =
        localStorage.getItem("profile");

      if (!raw) {
        setLoading(false);
        return;
      }

      const profile =
        JSON.parse(raw);

      setProfile(profile);

      // 🔥 VALIDASI UID
      if (!profile?.student_uid) {
        setLoading(false);
        return;
      }

      // 🔥 AMBIL CHECKIN TERAKHIR DARI BACKEND
      // 🔥 AMBIL CHECKIN TERAKHIR DARI BACKEND
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/checkin/${profile.student_uid}`
        );

        const result = await response.json();

        console.log("CHECKIN RESULT:", result);

        // ✅ HANDLE ARRAY ATAU OBJECT
        if (Array.isArray(result)) {

          setLatestCheckin(result[0]);

        } else {

          setLatestCheckin(result.data || result);

        }

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  }
  console.log("LATEST CHECKIN:", latestCheckin);
  return (

    <div className="min-h-screen bg-gray-100 pb-24">

      {/* HEADER */}

      <div className="mx-4 mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-3xl shadow-lg">

        <h1 className="text-2xl font-bold">

          Halo, {profile?.name || "Siswa"} 👋

        </h1>

        <p className="opacity-90 mt-1">

          Selamat datang di NutriMind AI

        </p>

      </div>

      {/* STATUS CARD */}

      <div className="grid grid-cols-4 gap-3 px-4 mt-4">

        <div className="bg-white rounded-2xl p-4 shadow text-center">

          <p className="text-2xl">
            😊
          </p>

          <p className="font-bold text-lg">

            {loading
              ? "..."
              : latestCheckin?.mood || "-"}

          </p>

          <p className="text-sm text-gray-500">
            Mood
          </p>

        </div>

        <div className="bg-white rounded-2xl p-4 shadow text-center">

          <p className="text-2xl">
            😴
          </p>

          <p className="font-bold text-lg">

            {loading
              ? "..."
              : latestCheckin?.sleep_hours || 0} Jam

          </p>

          <p className="text-sm text-gray-500">
            Sleep
          </p>

        </div>

        <div className="bg-white rounded-2xl p-4 shadow text-center">

          <p className="text-2xl">
            🏃
          </p>

          <p className="font-bold text-lg">

            {loading
              ? "..."
              : latestCheckin?.exercise_minutes || 0} Min

          </p>

          <p className="text-sm text-gray-500">
            Sport
          </p>

        </div>

        <div className="bg-white rounded-2xl p-4 shadow text-center">

          <p className="text-2xl">
            🧠
          </p>

          <p className="font-bold text-lg">

            {loading
              ? "..."
              : latestCheckin?.stress_level || 0}

          </p>

          <p className="text-sm text-gray-500">
            Mind
          </p>

        </div>

      </div>

      {/* QUICK MENU */}

      <div className="px-4 grid grid-cols-2 gap-4 mt-4">

        <button
          onClick={() => router.push("/student/ai")}
          className="bg-white p-5 rounded-3xl shadow text-center active:scale-95 transition"
        >

          <p className="text-3xl">
            🤖
          </p>

          <p className="font-bold mt-2">
            AI Insight
          </p>

        </button>

        <button
          onClick={() => router.push("/student/checkin")}
          className="bg-white p-5 rounded-3xl shadow text-center active:scale-95 transition"
        >

          <p className="text-3xl">
            📊
          </p>

          <p className="font-bold mt-2">
            Check-in
          </p>

        </button>

        <button
          onClick={() => router.push("/student/progress")}
          className="bg-white p-5 rounded-3xl shadow text-center active:scale-95 transition"
        >

          <p className="text-3xl">
            📈
          </p>

          <p className="font-bold mt-2">
            Progress
          </p>

        </button>

        <button
          onClick={() => router.push("/student/rewards")}
          className="bg-white p-5 rounded-3xl shadow text-center active:scale-95 transition"
        >

          <p className="text-3xl">
            🏆
          </p>

          <p className="font-bold mt-2">
            Rewards
          </p>

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

      {/* BOTTOM NAV */}

      <StudentBottomNav />

    </div>
  );
}