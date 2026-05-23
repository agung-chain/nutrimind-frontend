"use client";

import { useEffect, useState }
from "react";

export default function ParentPage() {

  // =====================================
  // STATE
  // =====================================

  const [data, setData] =
    useState<any>(null);

  const [schoolCode, setSchoolCode] =
    useState("");

  const [nis, setNis] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // =====================================
  // LOAD DATA
  // =====================================

  async function loadStudent() {

    try {

      setLoading(true);

      setError("");

      // 🔥 STUDENT UID

      const student_uid =

        `${schoolCode}-${nis}`;

      // 🔥 FETCH

      const res = await fetch(

        `${process.env.NEXT_PUBLIC_API_URL}/parent-monitor/${student_uid}`

      );

      const result = await res.json();

      console.log(result);

      // 🔥 NO DATA

      if (
        result.message
      ) {

        setError(
          "Data siswa tidak ditemukan 😢"
        );

        setData(null);

      } else {

        setData(result);

      }

    } catch (err) {

      console.error(err);

      setError(
        "Gagal mengambil data"
      );

    }

    setLoading(false);
  }

  // =====================================
  // UI
  // =====================================

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Parent Dashboard 👨‍👩‍👧

        </h1>

        <p className="text-gray-500 mt-2">

          Pantau kondisi anak secara realtime 🚀

        </p>

      </div>

      {/* INPUT */}

      <div className="bg-white p-6 rounded-3xl shadow mb-8">

        <h2 className="text-2xl font-bold mb-5">

          Cari Data Anak

        </h2>

        <input
          placeholder="School Code"
          value={schoolCode}
          onChange={(e) =>
            setSchoolCode(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl mb-4"
        />

        <input
          placeholder="NIS Anak"
          value={nis}
          onChange={(e) =>
            setNis(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl mb-5"
        />

        <button
          onClick={loadStudent}
          className="w-full bg-blue-500 text-white p-4 rounded-2xl font-bold"
        >

          Lihat Kondisi Anak 🔍

        </button>

      </div>

      {/* LOADING */}

      {loading && (

        <div className="bg-white p-6 rounded-3xl shadow">

          Loading...

        </div>

      )}

      {/* ERROR */}

      {error && (

        <div className="bg-red-100 text-red-700 p-6 rounded-3xl mb-6">

          {error}

        </div>

      )}

      {/* DATA */}

      {data && (

        <div className="space-y-6">

          {/* WELLNESS */}

          <div className="bg-blue-500 text-white p-6 rounded-3xl shadow-xl">

            <h2 className="text-2xl font-bold">

              Student Wellness

            </h2>

            <p className="text-6xl mt-4 font-bold">

              {data.wellness_score}

            </p>

          </div>

          {/* STRESS */}

          <div className="bg-red-500 text-white p-6 rounded-3xl shadow-xl">

            <h2 className="text-2xl font-bold">

              Stress Level

            </h2>

            <p className="text-6xl mt-4 font-bold">

              {data.stress_level}

            </p>

          </div>

          {/* REWARD */}

          <div className="bg-green-500 text-white p-6 rounded-3xl shadow-xl">

            <h2 className="text-2xl font-bold">

              Reward Anak

            </h2>

            <p className="text-3xl mt-4 font-bold">

              {data.reward_system?.badge}

            </p>

          </div>

          {/* WARNINGS */}

          <div className="bg-red-100 p-6 rounded-3xl shadow">

            <h2 className="text-2xl font-bold mb-4 text-red-700">

              AI Warnings ⚠️

            </h2>

            {data.warnings?.length > 0 ? (

              <ul className="space-y-3">

                {data.warnings.map(
                  (
                    item: string,
                    index: number
                  ) => (

                    <li
                      key={index}
                      className="bg-white p-4 rounded-2xl"
                    >

                      {item}

                    </li>

                  )
                )}

              </ul>

            ) : (

              <p>

                Tidak ada warning 🚀

              </p>

            )}

          </div>

          {/* PREDICTIONS */}

          <div className="bg-yellow-100 p-6 rounded-3xl shadow">

            <h2 className="text-2xl font-bold mb-4 text-yellow-700">

              AI Predictions 🧠

            </h2>

            {data.predictions?.length > 0 ? (

              <ul className="space-y-3">

                {data.predictions.map(
                  (
                    item: string,
                    index: number
                  ) => (

                    <li
                      key={index}
                      className="bg-white p-4 rounded-2xl"
                    >

                      {item}

                    </li>

                  )
                )}

              </ul>

            ) : (

              <p>

                Belum ada prediksi

              </p>

            )}

          </div>

          {/* AI ADVICE */}

          <div className="bg-white shadow p-6 rounded-3xl">

            <h2 className="text-2xl font-bold mb-4">

              AI Advice 🤖

            </h2>

            <p className="whitespace-pre-line leading-8 text-gray-700">

              {data.ai_advice}

            </p>

          </div>

        </div>

      )}

    </div>
  );
}