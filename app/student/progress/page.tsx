"use client";

import { useEffect, useState }
from "react";

import StudentBottomNav
from "@/components/StudentBottomNav";

export default function ProgressPage() {

  const [loading, setLoading] =
    useState(true);

  const [progress, setProgress] =
    useState<any>(null);

  const [error, setError] =
    useState("");

  useEffect(() => {

    loadProgress();

  }, []);

  async function loadProgress() {

    try {

      // 🔥 AMBIL PROFILE

      const profile =
        JSON.parse(

          localStorage.getItem(
            "student_profile"
          ) || "{}"

        );

      // 🔥 STUDENT UID

      const student_uid =

        `${profile.school_code}-${profile.nis}`;

      // 🔥 FETCH AI DATA

      const res = await fetch(

        `${process.env.NEXT_PUBLIC_API_URL}/student-ai/${student_uid}`

      );

      const data = await res.json();

      console.log(data);

      // 🔥 NO DATA

      if (
        data.status === "no_data"
      ) {

        setError(
          "Belum ada check-in 😢"
        );

        setLoading(false);

        return;
      }

      // 🔥 AMBIL HEALTH SCORE

      const health =
        data.health_score || 0;

      // 🔥 HITUNG PROGRESS

      const generatedProgress = [

        {
          title: "Mood",
          value:
            Math.min(
              100,
              Math.max(
                0,
                health + 10
              )
            ),
          icon: "😊",
          color:
            "bg-pink-500"
        },

        {
          title: "Tidur",
          value:
            Math.min(
              100,
              Math.max(
                0,
                health
              )
            ),
          icon: "😴",
          color:
            "bg-blue-500"
        },

        {
          title: "Olahraga",
          value:
            Math.min(
              100,
              Math.max(
                0,
                health - 10
              )
            ),
          icon: "🏃",
          color:
            "bg-green-500"
        },

        {
          title: "Pikiran Tenang",
          value:
            Math.min(
              100,
              Math.max(
                0,
                100 - (
                  health / 2
                )
              )
            ),
          icon: "🧠",
          color:
            "bg-purple-500"
        }

      ];

      setProgress(
        generatedProgress
      );

    } catch (err: any) {

      console.error(err);

      setError(
        "Gagal mengambil progress"
      );

    }

    setLoading(false);
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6 pb-28">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">

          Progress Kesehatan 📊

        </h1>

        <p className="text-gray-500 mt-2">

          Lihat perkembangan sehatmu
          setiap minggu 🚀

        </p>

      </div>

      {/* LOADING */}

      {loading && (

        <div className="bg-white p-6 rounded-3xl shadow">

          Loading progress...

        </div>

      )}

      {/* ERROR */}

      {error && (

        <div className="bg-red-100 text-red-600 p-6 rounded-3xl">

          {error}

        </div>

      )}

      {/* CONTENT */}

      {!loading && progress && (

        <div className="space-y-5">

          {progress.map(
            (
              item: any,
              index: number
            ) => (

              <div
                key={index}
                className="bg-white p-6 rounded-3xl shadow-lg"
              >

                <div className="flex justify-between items-center">

                  <div className="flex items-center gap-4">

                    <div className="text-5xl">

                      {item.icon}

                    </div>

                    <div>

                      <h2 className="text-xl font-bold">

                        {item.title}

                      </h2>

                      <p className="text-gray-500">

                        Progress mingguan

                      </p>

                    </div>

                  </div>

                  <h2 className="text-3xl font-bold">

                    {Math.round(
                      item.value
                    )}%

                  </h2>

                </div>

                {/* BAR */}

                <div className="w-full bg-gray-200 h-5 rounded-full mt-6 overflow-hidden">

                  <div
                    className={`${item.color} h-5 rounded-full transition-all duration-700`}
                    style={{

                      width:
                        `${item.value}%`

                    }}
                  />

                </div>

              </div>

            )
          )}

        </div>

      )}

      {/* MOTIVATION */}

      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-3xl shadow-xl mt-8">

        <h2 className="text-2xl font-bold">

          🌟 Tetap Semangat

        </h2>

        <p className="mt-3 text-lg leading-8">

          Progress kecil setiap hari
          bisa membuat perubahan besar
          untuk tubuh dan pikiranmu 💪

        </p>

      </div>

      <StudentBottomNav />

    </div>
  );
}