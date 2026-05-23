"use client";

import { useEffect, useState }
from "react";

import { supabase }
from "@/lib/supabase";

import StudentBottomNav
from "@/components/StudentBottomNav";

export default function AIPage() {

  const [advice, setAdvice] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadAI();

  }, []);

  async function loadAI() {

    try {

      // 🔥 GET USER LOGIN

      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {

        setAdvice(
          "User belum login"
        );

        setLoading(false);

        return;
      }

      // 🔥 AMBIL PROFILE

      const profile =
        JSON.parse(

          localStorage.getItem(
            `profile_${user.email}`
          ) || "{}"

        );

      // 🔥 GENERATE STUDENT UID

      const student_uid =

        `${profile.school_code}-${profile.nis}`;

      // 🔥 FETCH AI ANALYSIS

      const res = await fetch(

        `${process.env.NEXT_PUBLIC_API_URL}/student-ai/${student_uid}`

      );

      const data = await res.json();

      // 🔥 FORMAT RESPONSE

      if (data.data?.analysis) {

        setAdvice(
          data.data.analysis
        );

      } else {

        setAdvice(
          JSON.stringify(
            data.data,
            null,
            2
          )
        );
      }

    } catch (err: any) {

      console.error(err);

      setAdvice(

        "❌ Gagal mengambil AI insight\n\n" +

        "Detail Error:\n" +

        err.toString()

      );
    }

    setLoading(false);
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6 pb-28">

      <h1 className="text-3xl font-bold mb-6">

        AI Recommendation 🧠

      </h1>

      {loading ? (

        <div className="bg-white p-6 rounded-3xl shadow">

          Loading AI...

        </div>

      ) : (

        <div className="bg-white p-6 rounded-3xl shadow">

          <div className="text-6xl mb-5">

            🤖

          </div>

          <h2 className="text-2xl font-bold mb-4">

            NutriMind AI Analysis

          </h2>

          <div className="whitespace-pre-line text-gray-700 leading-8">

            {advice}

          </div>

        </div>

      )}

      {/* MOTIVASI */}

      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-3xl shadow-lg mt-6">

        <h2 className="text-2xl font-bold">

          🌟 Motivasi Hari Ini

        </h2>

        <p className="mt-3 text-lg">

          Langkah kecil hari ini
          bisa jadi masa depan besar
          untuk dirimu 🚀

        </p>

      </div>

      <StudentBottomNav />

    </div>
  );
}