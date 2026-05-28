"use client";

import { useEffect, useState }
from "react";

import StudentBottomNav
from "@/components/StudentBottomNav";

export default function RewardsPage() {

  const [loading, setLoading] =
    useState(true);

  const [rewards, setRewards] =
    useState<any[]>([]);

  const [healthScore, setHealthScore] =
    useState(0);

  const [aiSource, setAiSource] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {

    loadRewards();

  }, []);

  async function loadRewards() {

  setLoading(true);

  try {

   // 🔥 LOAD PROFILE
    const rawProfile =
      localStorage.getItem("profile");

    if (!rawProfile) {

      setError("Profile tidak ditemukan");
      return;
    }

    const profile =
      JSON.parse(rawProfile);

    console.log("PROFILE:", profile);

    // 🔥 STUDENT UID
    const student_uid =
      profile?.student_uid;

    if (!student_uid) {

      setError("student_uid tidak ada");
      return;
    }

    // 🔥 FETCH AI
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/student-ai/${student_uid}`
    );

    const data = await res.json();

    console.log("AI DATA:", data.data);

    // 🔥 NO DATA
    if (data.data.status === "no_data") {

      setError("Belum ada check-in 😢");
      return;
    }

    // 🔥 SCORE
    const score = data.data.health_score || 0;
    console.log("AI DATA :", data);

    setHealthScore(score || 0);
    // 🔥 AI SOURCE
    setAiSource(data.data.ai_source || "Local AI");

    // 🔥 REWARD ENGINE
    const generatedRewards = [];

    // =====================================
    // HEALTH SCORE BADGE
    // =====================================

    if (score >= 80) {

      generatedRewards.push({
        title: "Healthy Champion",
        icon: "🏆",
        desc: "Kesehatan kamu luar biasa minggu ini!"
      });

    }

    if (score >= 60) {

      generatedRewards.push({
        title: "Wellness Hero",
        icon: "🌟",
        desc: "Tubuh dan pikiran kamu cukup stabil."
      });

    }

    // =====================================
    // SLEEP REWARD
    // =====================================

    if (score >= 50) {

      generatedRewards.push({
        title: "Sleep Guardian",
        icon: "😴",
        desc: "Pola tidur kamu cukup baik."
      });

    }

    // =====================================
    // EXERCISE REWARD
    // =====================================

    if (score >= 40) {

      generatedRewards.push({
        title: "Fitness Explorer",
        icon: "🏃",
        desc: "Kamu tetap aktif dan bergerak."
      });

    }

    // =====================================
    // WATER REWARD
    // =====================================

    if (score >= 30) {

      generatedRewards.push({
        title: "Hydration Buddy",
        icon: "💧",
        desc: "Tubuh kamu cukup terhidrasi."
      });

    }

    // =====================================
    // MOTIVATION REWARD
    // =====================================

    generatedRewards.push({
      title: "Never Give Up",
      icon: "🚀",
      desc: "Tetap semangat menjalani hari-harimu!"
    });

    setRewards(generatedRewards);

  } catch (err: any) {

    console.error(err);

    setError(
      "Gagal mengambil reward"
    );

  } finally {

    setLoading(false);

  }
}
  return (

    <div className="min-h-screen bg-gray-100 p-6 pb-28">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">

          Rewards & Badges 🎁

        </h1>

        <p className="text-gray-500 mt-2">

          Badge spesial dari progress sehatmu 🚀

        </p>

      </div>

      {/* HEALTH SCORE */}

      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-3xl shadow-xl mb-6">

        <h2 className="text-2xl font-bold">

          Health Score

        </h2>

        <div className="text-6xl font-bold mt-4">

          {Math.round(
            healthScore
          )}

        </div>

        <p className="mt-3 text-lg">

          AI Source:
          {" "}
          {aiSource}

        </p>

      </div>

      {/* LOADING */}

      {loading && (

        <div className="bg-white p-6 rounded-3xl shadow">

          Loading rewards...

        </div>

      )}

      {/* ERROR */}

      {error && (

        <div className="bg-red-100 text-red-600 p-6 rounded-3xl">

          {error}

        </div>

      )}

      {/* REWARDS */}

      {!loading && rewards && (

        <div className="space-y-5">

          {rewards.map(

            (
              reward,
              index
            ) => (

              <div
                key={index}
                className="bg-white p-6 rounded-3xl shadow-lg flex items-center gap-5 hover:scale-[1.02] transition-all duration-300"
              >

                <div className="text-6xl">

                  {reward.icon}

                </div>

                <div>

                  <h2 className="text-2xl font-bold">

                    {reward.title}

                  </h2>

                  <p className="text-gray-500 mt-2 leading-7">

                    {reward.desc}

                  </p>

                </div>

              </div>

            )

          )}

        </div>

      )}

      {/* MOTIVATION */}

      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-3xl shadow-xl mt-8">

        <h2 className="text-2xl font-bold">

          🌟 AI Motivation

        </h2>

        <p className="mt-3 text-lg leading-8">

          Setiap kebiasaan kecil yang sehat
          akan membentuk versi terbaik
          dari dirimu 💪

        </p>

      </div>

      <StudentBottomNav />

    </div>
  );
}