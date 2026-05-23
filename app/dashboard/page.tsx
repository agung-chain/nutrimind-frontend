"use client";

import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function DashboardPage() {

  const [data, setData] =
    useState<any>(null);

  const [leaderboard, setLeaderboard] =
    useState<any[]>([]);

  // =====================================
  // LOAD
  // =====================================

  useEffect(() => {

    // SCHOOL INTELLIGENCE

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/school-intelligence`
    )
      .then((res) => res.json())
      .then((result) => {

        setData(result);

      });

    // LEADERBOARD

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/leaderboard`
    )
      .then((res) => res.json())
      .then((result) => {

        setLeaderboard(result);

      });

  }, []);

  // =====================================
  // LOADING
  // =====================================

  if (!data) {

    return (

      <div className="p-10 text-xl">

        Loading dashboard...

      </div>

    );
  }

  // =====================================
  // CHART DATA
  // =====================================

  const chartData = [

    {
      name: "High Stress",
      value: data.high_stress_cases
    },

    {
      name: "Low Sleep",
      value: data.low_sleep_cases
    },

    {
      name: "Low Mood",
      value: data.low_mood_cases
    }

  ];

  const barData = [

    {
      name: "Students",
      total: data.total_students
    },

    {
      name: "Stress",
      total: data.high_stress_cases
    },

    {
      name: "Sleep",
      total: data.low_sleep_cases
    }

  ];

  // =====================================
  // AI STATUS
  // =====================================

  let schoolStatus =
    "STABLE";

  let statusColor =
    "bg-green-500";

  if (
    data.high_stress_cases >= 10
  ) {

    schoolStatus =
      "HIGH ALERT";

    statusColor =
      "bg-red-500";

  } else if (
    data.high_stress_cases >= 5
  ) {

    schoolStatus =
      "WARNING";

    statusColor =
      "bg-yellow-500";
  }

  // =====================================
  // AI INSIGHT
  // =====================================

  let aiInsight =
    "Kondisi sekolah relatif stabil.";

  if (
    data.low_sleep_cases >
    data.high_stress_cases
  ) {

    aiInsight =
      "😴 Banyak siswa mengalami kurang tidur. AI merekomendasikan pengurangan aktivitas malam.";

  }

  if (
    data.high_stress_cases >= 5
  ) {

    aiInsight =
      "🧠 Tekanan pikiran siswa meningkat minggu ini. Disarankan menambah aktivitas positif dan relaksasi.";

  }

  // =====================================
  // UI
  // =====================================

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold">

          NutriMind AI Dashboard 🧠

        </h1>

        <p className="text-gray-500 mt-3 text-lg">

          School Wellness Intelligence Platform

        </p>

      </div>

      {/* SCHOOL STATUS */}

      <div className="bg-white rounded-3xl shadow p-6 mb-8">

        <div className="flex items-center gap-4">

          <div
            className={`
              w-5 h-5 rounded-full animate-pulse

              ${statusColor}
            `}
          />

          <div>

            <h2 className="text-3xl font-bold">

              {schoolStatus}

            </h2>

            <p className="text-gray-500 mt-1">

              AI realtime monitoring

            </p>

          </div>

        </div>

      </div>

      {/* AI INSIGHT */}

      <div
        className="
          bg-gradient-to-r
          from-indigo-500
          to-purple-600
          text-white
          rounded-3xl
          shadow-xl
          p-8
          mb-10
        "
      >

        <h2 className="text-3xl font-bold mb-5">

          AI School Insight 🤖

        </h2>

        <p className="text-lg leading-8">

          {aiInsight}

        </p>

      </div>

      {/* CARD SECTION */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-4
          gap-6
          mb-10
        "
      >

        <div className="bg-white rounded-3xl shadow-xl p-6">

          <h2 className="text-gray-500">

            Total Students

          </h2>

          <p className="text-5xl font-bold mt-4">

            {data.total_students}

          </p>

        </div>

        <div className="bg-red-100 rounded-3xl shadow-xl p-6">

          <h2 className="text-red-700">

            High Stress

          </h2>

          <p className="text-5xl font-bold mt-4">

            {data.high_stress_cases}

          </p>

        </div>

        <div className="bg-yellow-100 rounded-3xl shadow-xl p-6">

          <h2 className="text-yellow-700">

            Low Sleep

          </h2>

          <p className="text-5xl font-bold mt-4">

            {data.low_sleep_cases}

          </p>

        </div>

        <div className="bg-blue-100 rounded-3xl shadow-xl p-6">

          <h2 className="text-blue-700">

            Low Mood

          </h2>

          <p className="text-5xl font-bold mt-4">

            {data.low_mood_cases}

          </p>

        </div>

      </div>

      {/* CHART SECTION */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-8
        "
      >

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl shadow-xl p-6">

          <h2 className="text-2xl font-bold mb-4">

            Health Distribution

          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={chartData}
                dataKey="value"
                outerRadius={100}
                label
              >

                <Cell fill="#ef4444" />

                <Cell fill="#facc15" />

                <Cell fill="#3b82f6" />

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl shadow-xl p-6">

          <h2 className="text-2xl font-bold mb-4">

            School Analytics

          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart data={barData}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="total"
                fill="#6366f1"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* AI RECOMMENDATION */}

      <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

        <h2 className="text-3xl font-bold mb-6">

          AI Recommendations 💡

        </h2>

        <div className="space-y-4">

          <div className="bg-blue-100 p-5 rounded-2xl">

            😴 Tambahkan edukasi tidur sehat
            untuk siswa.

          </div>

          <div className="bg-yellow-100 p-5 rounded-2xl">

            🧠 Kurangi tekanan tugas
            malam minggu ini.

          </div>

          <div className="bg-green-100 p-5 rounded-2xl">

            🏃 Tingkatkan aktivitas fisik
            pagi hari.

          </div>

        </div>

      </div>

      {/* LEADERBOARD */}

      <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

        <h2 className="text-3xl font-bold mb-6">

          Healthy Student Leaderboard 🏆

        </h2>

        <div className="space-y-4">

          {leaderboard.map(

            (
              student,
              index
            ) => (

              <div
                key={index}
                className="
                  flex
                  justify-between
                  items-center
                  border-b
                  pb-4
                "
              >

                <div>

                  <p className="font-bold text-xl">

                    #{index + 1}
                    {" "}
                    -
                    {" "}
                    {student.name}

                  </p>

                  <p className="text-gray-500 mt-1">

                    {student.badge}

                  </p>

                </div>

                <div className="text-right">

                  <p className="font-bold text-2xl">

                    {student.points} pts

                  </p>

                  <p className="text-sm text-blue-500">

                    {student.level}

                  </p>

                </div>

              </div>

            )

          )}

        </div>

      </div>

    </div>

  );
}