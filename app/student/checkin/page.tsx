"use client";

import { useState } from "react";
import { useEffect }
from "react";

import { supabase }
from "@/lib/supabase";
import StudentBottomNav
from "@/components/StudentBottomNav";
export default function CheckinPage() {

  const [mood, setMood] =
    useState<number>(5);

  const [sleep, setSleep] =
    useState<number>(7);

  const [exercise, setExercise] =
    useState<number>(30);

  const [stress, setStress] =
    useState<number>(3);

  const [water, setWater] =
    useState<number>(6);

  const [breakfast, setBreakfast] =
    useState<boolean>(true);

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {

    loadUser();

    }, []);

  async function loadUser() {

    const {
        data: { user }
    } = await supabase.auth.getUser();

    setUser(user);
    }  

  async function submitCheckin() {

    const profile = JSON.parse(

        localStorage.getItem(
            `profile_${user?.email}`
        ) || "{}"
    );

    // 🔥 AUTO GENERATE STUDENT UID
    const student_uid =
        `${profile.school_code}-${profile.nis}`;

    const data = {

      // 🔥 IDENTITAS SISWA

      school_code:
        profile.school_code,

      nis:
        profile.nis,

      student_uid:
        student_uid,

      // 🔥 DATA PROFILE

      name:
        profile.name || user?.email,

      age:
        Number(profile.age || 15),

      height:
        Number(profile.height || 170),

      weight:
        Number(profile.weight || 70),

      // 🔥 DATA CHECKIN

      mood: mood,

      sleep_hours: sleep,

      exercise_minutes: exercise,

      stress_level: stress,

      water_intake: water,

      breakfast: breakfast

    };

    // 🔥 KIRIM KE BACKEND

    const response = await fetch(

      `${process.env.NEXT_PUBLIC_API_URL}/checkin`,

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

    console.log(result);

    alert("Check-in berhasil 🚀");
}

  return (

    <div className="min-h-screen bg-gray-100 p-6 pb-24">

      <h1 className="text-3xl font-bold mb-6">

        Daily Wellness Check-In

      </h1>

      {/* MOOD */}

      <div className="bg-white p-6 rounded-3xl shadow mb-6">

        <h2 className="text-xl font-bold">

          Bagaimana mood kamu hari ini?

        </h2>

        <div className="grid grid-cols-5 gap-3 mt-6">

          <button
            onClick={() => setMood(10)}
            className={`
              p-4 rounded-2xl text-4xl transition-all duration-200

              ${mood === 10
                ? "bg-yellow-400 scale-110 ring-4 ring-yellow-300 shadow-xl"
                : "bg-yellow-100"}
            `}
          >
            😄
          </button>

          <button
            onClick={() => setMood(8)}
            className={`
              p-4 rounded-2xl text-4xl transition-all duration-200

              ${mood === 8
                ? "bg-green-400 scale-110 ring-4 ring-green-300 shadow-xl"
                : "bg-green-100"}
            `}
          >
            🙂
          </button>

          <button
            onClick={() => setMood(5)}
            className={`
              p-4 rounded-2xl text-4xl transition-all duration-200

              ${mood === 5
                ? "bg-gray-400 scale-110 ring-4 ring-gray-300 shadow-xl"
                : "bg-gray-100"}
            `}
          >
            😐
          </button>

          <button
            onClick={() => setMood(3)}
            className={`
              p-4 rounded-2xl text-4xl transition-all duration-200

              ${mood === 3
                ? "bg-orange-400 scale-110 ring-4 ring-orange-300 shadow-xl"
                : "bg-orange-100"}
            `}
          >
            😔
          </button>

          <button
            onClick={() => setMood(1)}
            className={`
              p-4 rounded-2xl text-4xl transition-all duration-200

              ${mood === 1
                ? "bg-red-400 scale-110 ring-4 ring-red-300 shadow-xl"
                : "bg-red-100"}
            `}
          >
            😭
          </button>

        </div>

      </div>

      {/* SLEEP */}

      <div className="bg-white p-6 rounded-3xl shadow mb-6">

        <h2 className="text-xl font-bold">

          Berapa jam tidur kamu?

        </h2>

        <div className="grid grid-cols-4 gap-3 mt-6">

          <button
            onClick={() => setSleep(4)}
            className={`
              p-4 rounded-2xl transition-all duration-200

              ${sleep === 4
                ? "bg-red-400 scale-105 ring-4 ring-red-300 shadow-xl"
                : "bg-red-100"}
            `}
          >
            😪
            <p>&lt; 5 Jam</p>
          </button>

          <button
            onClick={() => setSleep(6)}
            className={`
              p-4 rounded-2xl transition-all duration-200

              ${sleep === 6
                ? "bg-orange-400 scale-105 ring-4 ring-orange-300 shadow-xl"
                : "bg-orange-100"}
            `}
          >
            😴
            <p>6 Jam</p>
          </button>

          <button
            onClick={() => setSleep(8)}
            className={`
              p-4 rounded-2xl transition-all duration-200

              ${sleep === 8
                ? "bg-green-400 scale-105 ring-4 ring-green-300 shadow-xl"
                : "bg-green-100"}
            `}
          >
            😊
            <p>8 Jam</p>
          </button>

          <button
            onClick={() => setSleep(9)}
            className={`
              p-4 rounded-2xl transition-all duration-200

              ${sleep === 9
                ? "bg-blue-400 scale-105 ring-4 ring-blue-300 shadow-xl"
                : "bg-blue-100"}
            `}
          >
            🌟
            <p>9+ Jam</p>
          </button>

        </div>

      </div>

      {/* STRESS */}

      <div className="bg-white p-6 rounded-3xl shadow mb-6">

          <h2 className="text-xl font-bold mb-2">

            Hari ini pikiran kamu lagi gimana?

          </h2>

          <p className="text-gray-500 text-sm">

            Pilih emoji yang paling menggambarkan kondisi kamu ✨

          </p>

          <div className="grid grid-cols-4 gap-3 mt-6">

            {/* TENANG */}

            <button
              onClick={() => setStress(1)}
              className={`
                p-4 rounded-2xl transition-all duration-200

                ${stress === 1
                  ? "bg-green-400 scale-105 ring-4 ring-green-300 shadow-xl text-white"
                  : "bg-green-100"}
              `}
            >

              <div className="text-4xl mb-2">
                😌
              </div>

              <p className="text-sm font-bold">
                Santai
              </p>

            </button>

            {/* NORMAL */}

            <button
              onClick={() => setStress(4)}
              className={`
                p-4 rounded-2xl transition-all duration-200

                ${stress === 4
                  ? "bg-yellow-400 scale-105 ring-4 ring-yellow-300 shadow-xl text-white"
                  : "bg-yellow-100"}
              `}
            >

              <div className="text-4xl mb-2">
                🙂
              </div>

              <p className="text-sm font-bold">
                Biasa aja
              </p>

            </button>

            {/* BANYAK PIKIRAN */}

            <button
              onClick={() => setStress(7)}
              className={`
                p-4 rounded-2xl transition-all duration-200

                ${stress === 7
                  ? "bg-orange-400 scale-105 ring-4 ring-orange-300 shadow-xl text-white"
                  : "bg-orange-100"}
              `}
            >

              <div className="text-4xl mb-2">
                😰
              </div>

              <p className="text-sm font-bold">
                Banyak Pikiran
              </p>

            </button>

            {/* BERAT */}

            <button
              onClick={() => setStress(10)}
              className={`
                p-4 rounded-2xl transition-all duration-200

                ${stress === 10
                  ? "bg-red-400 scale-105 ring-4 ring-red-300 shadow-xl text-white"
                  : "bg-red-100"}
              `}
            >

              <div className="text-4xl mb-2">
                😭
              </div>

              <p className="text-sm font-bold">
                Berat
              </p>

            </button>

          </div>

        </div>

      {/* EXERCISE */}

      <div className="bg-white p-6 rounded-3xl shadow mb-6">

        <h2 className="text-xl font-bold">

          Aktivitas olahraga?

        </h2>

        <div className="grid grid-cols-4 gap-3 mt-6">

          <button
            onClick={() => setExercise(0)}
            className={`
              p-4 rounded-2xl text-3xl transition-all duration-200

              ${exercise === 0
                ? "bg-gray-400 scale-105 ring-4 ring-gray-300 shadow-xl"
                : "bg-gray-100"}
            `}
          >
            🛌
          </button>

          <button
            onClick={() => setExercise(20)}
            className={`
              p-4 rounded-2xl text-3xl transition-all duration-200

              ${exercise === 20
                ? "bg-green-400 scale-105 ring-4 ring-green-300 shadow-xl"
                : "bg-green-100"}
            `}
          >
            🚶
          </button>

          <button
            onClick={() => setExercise(40)}
            className={`
              p-4 rounded-2xl text-3xl transition-all duration-200

              ${exercise === 40
                ? "bg-blue-400 scale-105 ring-4 ring-blue-300 shadow-xl"
                : "bg-blue-100"}
            `}
          >
            🏃
          </button>

          <button
            onClick={() => setExercise(60)}
            className={`
              p-4 rounded-2xl text-3xl transition-all duration-200

              ${exercise === 60
                ? "bg-red-400 scale-105 ring-4 ring-red-300 shadow-xl"
                : "bg-red-100"}
            `}
          >
            🔥
          </button>

        </div>

      </div>

      {/* WATER */}

      <div className="bg-white p-6 rounded-3xl shadow mb-6">

        <h2 className="text-xl font-bold">

          Minum air hari ini?

        </h2>

        <div className="grid grid-cols-4 gap-3 mt-6">

          <button
            onClick={() => setWater(2)}
            className={`
              p-4 rounded-2xl text-3xl transition-all duration-200

              ${water === 2
                ? "bg-yellow-400 scale-105 ring-4 ring-yellow-300 shadow-xl"
                : "bg-yellow-100"}
            `}
          >
            🥤
          </button>

          <button
            onClick={() => setWater(4)}
            className={`
              p-4 rounded-2xl text-3xl transition-all duration-200

              ${water === 4
                ? "bg-orange-400 scale-105 ring-4 ring-orange-300 shadow-xl"
                : "bg-orange-100"}
            `}
          >
            🥛
          </button>

          <button
            onClick={() => setWater(7)}
            className={`
              p-4 rounded-2xl text-3xl transition-all duration-200

              ${water === 7
                ? "bg-blue-400 scale-105 ring-4 ring-blue-300 shadow-xl"
                : "bg-blue-100"}
            `}
          >
            💧
          </button>

          <button
            onClick={() => setWater(10)}
            className={`
              p-4 rounded-2xl text-3xl transition-all duration-200

              ${water === 10
                ? "bg-cyan-400 scale-105 ring-4 ring-cyan-300 shadow-xl"
                : "bg-cyan-100"}
            `}
          >
            🌊
          </button>

        </div>

      </div>

      {/* BREAKFAST */}

      <div className="bg-white p-6 rounded-3xl shadow mb-6">

        <h2 className="text-xl font-bold">

          Sudah sarapan?

        </h2>

        <div className="grid grid-cols-2 gap-4 mt-6">

          <button
            onClick={() => setBreakfast(true)}
            className={`
              p-6 rounded-2xl text-4xl transition-all duration-200

              ${breakfast
                ? "bg-green-400 scale-105 ring-4 ring-green-300 shadow-xl"
                : "bg-green-100"}
            `}
          >
            ✅
          </button>

          <button
            onClick={() => setBreakfast(false)}
            className={`
              p-6 rounded-2xl text-4xl transition-all duration-200

              ${!breakfast
                ? "bg-red-400 scale-105 ring-4 ring-red-300 shadow-xl"
                : "bg-red-100"}
            `}
          >
            ❌
          </button>

        </div>

      </div>

      {/* SUBMIT */}

      <button
        onClick={submitCheckin}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-5 rounded-3xl text-xl font-bold shadow-lg"
      >

        Submit Check-In 🚀

      </button>
            <StudentBottomNav />
    </div>
  );
}