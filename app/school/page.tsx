"use client";

import { useEffect, useState }
from "react";

export default function SchoolPage() {

  // =====================================
  // STATE
  // =====================================

  const [activeTab, setActiveTab] =
    useState("overview");

  const [analytics, setAnalytics] =
    useState<any>(null);

  const [warnings, setWarnings] =
    useState<any>(null);

  const [predictions, setPredictions] =
    useState<any>(null);

  const [alerts, setAlerts] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // LOAD
  // =====================================

  async function loadDashboard() {

    try {

      setLoading(true);

      // ANALYTICS

      const analyticsRes =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/school-intelligence`
        );

      const analyticsData =
        await analyticsRes.json();

      setAnalytics(
        analyticsData
      );

      // WARNINGS

      const warningRes =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/school-warnings`
        );

      const warningData =
        await warningRes.json();

      setWarnings(
        warningData
      );

      // PREDICTIONS

      const predictionRes =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/school-predictions`
        );

      const predictionData =
        await predictionRes.json();

      setPredictions(
        predictionData
      );

      // ALERTS

      const alertRes =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/health-alerts`
        );

      const alertData =
        await alertRes.json();

      setAlerts(
        alertData
      );

    } catch (err) {

      console.error(err);

    }

    setLoading(false);
  }

  // =====================================
  // INIT
  // =====================================

  useEffect(() => {

    loadDashboard();

    const interval =
      setInterval(() => {

        loadDashboard();

      }, 10000);

    return () =>
      clearInterval(interval);

  }, []);

  // =====================================
  // SCHOOL STATUS
  // =====================================

  let schoolStatus =
    "STABLE";

  let statusColor =
    "bg-green-500";

  if (
    analytics?.high_stress_cases >= 10
  ) {

    schoolStatus =
      "HIGH ALERT";

    statusColor =
      "bg-red-500";

  } else if (
    analytics?.high_stress_cases >= 5
  ) {

    schoolStatus =
      "WARNING";

    statusColor =
      "bg-yellow-500";

  }

  /* ===================================== */
/* DYNAMIC AI SCHOOL INSIGHT */
/* ===================================== */

let schoolInsight = "";

if (
  analytics?.low_sleep_cases >= 10
) {

  schoolInsight +=
    "😴 Banyak siswa mengalami "
    + "penurunan kualitas tidur "
    + "minggu ini.\n\n";
}

if (
  analytics?.high_stress_cases >= 10
) {

  schoolInsight +=
    "🧠 Tekanan pikiran siswa "
    + "terlihat meningkat.\n\n";
}

if (
  analytics?.low_mood_cases >= 10
) {

  schoolInsight +=
    "💛 Mood beberapa siswa "
    + "terlihat menurun.\n\n";
}

if (
  analytics?.average_bmi >= 28
) {

  schoolInsight +=
    "🍔 AI mendeteksi peningkatan "
    + "risiko pola makan tidak sehat.\n\n";
}

if (
  analytics?.high_stress_cases <= 3 &&
  analytics?.low_sleep_cases <= 3
) {

  schoolInsight +=
    "✅ Kondisi sekolah relatif stabil "
    + "dan wellness siswa cukup baik.\n\n";
}

/* ===================================== */
/* AI RECOMMENDATION */
/* ===================================== */

schoolInsight +=
  "AI merekomendasikan:\n\n";

if (
  analytics?.high_stress_cases >= 5
) {

  schoolInsight +=
    "• Tambahkan aktivitas relaksasi\n";
}

if (
  analytics?.low_sleep_cases >= 5
) {

  schoolInsight +=
    "• Kurangi tugas malam\n";
}

if (
  analytics?.low_mood_cases >= 5
) {

  schoolInsight +=
    "• Tambahkan kegiatan sosial positif\n";
}

if (
  analytics?.average_bmi >= 28
) {

  schoolInsight +=
    "• Edukasi pola makan sehat\n";
}

schoolInsight +=
  "• Tingkatkan edukasi pola hidup sehat\n";

/* ===================================== */
/* TOP PROBLEMS */
/* ===================================== */

const topProblems = [];

if (
  analytics?.low_sleep_cases >= 5
) {

  topProblems.push(
    "😴 Kurang tidur meningkat"
  );
}

if (
  analytics?.high_stress_cases >= 5
) {

  topProblems.push(
    "🧠 Tekanan pikiran meningkat"
  );
}

if (
  analytics?.low_mood_cases >= 5
) {

  topProblems.push(
    "💛 Mood siswa menurun"
  );
}

if (
  analytics?.average_bmi >= 28
) {

  topProblems.push(
    "🍔 Risiko pola makan tidak sehat meningkat"
  );
}

if (
  topProblems.length === 0
) {

  topProblems.push(
    "✅ Tidak ada masalah besar terdeteksi"
  );
}
  // =====================================
  // UI
  // =====================================

  return (

    <div className="min-h-screen bg-gray-100 pb-24">

      {/* HEADER */}

      <div
        className="
          bg-gradient-to-r
          from-indigo-600
          to-purple-600
          text-white
          p-6
          shadow-xl
        "
      >

        <h1 className="text-4xl font-bold">

          School Command Center 🏫

        </h1>

        <p className="mt-2 text-lg opacity-90">

          AI Wellness Intelligence System

        </p>

      </div>

      {/* TAB NAVIGATION */}

      <div
        className="
          sticky top-0 z-50
          bg-white
          shadow-sm
          overflow-x-auto
        "
      >

        <div className="flex gap-3 p-4 min-w-max">

          <button
            onClick={() =>
              setActiveTab(
                "overview"
              )
            }
            className={`
              px-5 py-3 rounded-2xl font-bold

              ${activeTab === "overview"

                ? "bg-blue-500 text-white"

                : "bg-gray-100"}
            `}
          >

            Overview

          </button>

          <button
            onClick={() =>
              setActiveTab(
                "alerts"
              )
            }
            className={`
              px-5 py-3 rounded-2xl font-bold

              ${activeTab === "alerts"

                ? "bg-red-500 text-white"

                : "bg-gray-100"}
            `}
          >

            Alerts

          </button>

          <button
            onClick={() =>
              setActiveTab(
                "analytics"
              )
            }
            className={`
              px-5 py-3 rounded-2xl font-bold

              ${activeTab === "analytics"

                ? "bg-green-500 text-white"

                : "bg-gray-100"}
            `}
          >

            Analytics

          </button>

          <button
            onClick={() =>
              setActiveTab(
                "prediction"
              )
            }
            className={`
              px-5 py-3 rounded-2xl font-bold

              ${activeTab === "prediction"

                ? "bg-purple-500 text-white"

                : "bg-gray-100"}
            `}
          >

            AI Prediction

          </button>

          <button
            onClick={() =>
              setActiveTab(
                "gamification"
              )
            }
            className={`
              px-5 py-3 rounded-2xl font-bold

              ${activeTab === "gamification"

                ? "bg-yellow-500 text-white"

                : "bg-gray-100"}
            `}
          >

            Rewards

          </button>

        </div>

      </div>

      {/* CONTENT */}

      <div className="p-6">

        {loading && (

          <div className="bg-white p-6 rounded-3xl shadow">

            Loading dashboard...

          </div>

        )}

        {/* ================================= */}
        {/* OVERVIEW */}
        {/* ================================= */}

        {activeTab ===
          "overview" && (

          <div className="space-y-6">

            {/* STATUS */}

            <div className="bg-white p-6 rounded-3xl shadow">

              <h2 className="text-2xl font-bold mb-4">

                School Status 🚨

              </h2>

              <div className="flex items-center gap-4">

                <div
                  className={`
                    w-5 h-5 rounded-full animate-pulse

                    ${statusColor}
                  `}
                />

                <h2 className="text-3xl font-bold">

                  {schoolStatus}

                </h2>

              </div>

            </div>

            {/* AI INSIGHT */}
            {/* ===================================== */}

            <div
              className="
                bg-gradient-to-r
                from-indigo-500
                to-purple-600
                text-white
                p-8
                rounded-3xl
                shadow-xl
              "
            >

              <h2 className="text-3xl font-bold mb-5">

                AI School Insight 🧠

              </h2>

              <p
                className="
                  text-lg
                  leading-8
                  whitespace-pre-line
                "
              >

                {schoolInsight}

              </p>

                

            </div>

            {/* ANALYTICS */}

            {analytics && (

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-4
                  gap-6
                "
              >

                <div className="bg-blue-500 text-white p-6 rounded-3xl shadow-xl">

                  <h2>Total Students</h2>

                  <p className="text-5xl font-bold mt-4">

                    {analytics.total_students}

                  </p>

                </div>

                <div className="bg-red-500 text-white p-6 rounded-3xl shadow-xl">

                  <h2>Stress Cases</h2>

                  <p className="text-5xl font-bold mt-4">

                    {analytics.high_stress_cases}

                  </p>

                </div>

                <div className="bg-yellow-500 text-white p-6 rounded-3xl shadow-xl">

                  <h2>Sleep Issues</h2>

                  <p className="text-5xl font-bold mt-4">

                    {analytics.low_sleep_cases}

                  </p>

                </div>

                <div className="bg-green-500 text-white p-6 rounded-3xl shadow-xl">

                  <h2>Average BMI</h2>

                  <p className="text-5xl font-bold mt-4">

                    {analytics.average_bmi}

                  </p>

                </div>

              </div>

            )}

          </div>

        )}

        {/* ================================= */}
        {/* ALERTS */}
        {/* ================================= */}

        {activeTab ===
          "alerts" && (

          <div className="space-y-6">

            <div className="bg-white p-6 rounded-3xl shadow">

              <h2 className="text-3xl font-bold mb-6">

                🚨 Need Immediate Attention

              </h2>

              <div className="space-y-4">

                {alerts?.alerts?.high_risk
                  ?.length > 0 ? (

                  alerts.alerts.high_risk
                    .slice(0, 10)
                    .map(
                      (
                        student: any,
                        index: number
                      ) => (

                        <div
                          key={index}
                          className="
                            bg-red-50
                            border border-red-200
                            p-5
                            rounded-3xl
                          "
                        >

                          <div className="flex justify-between">

                            <div>

                              <h2 className="text-2xl font-bold">

                                {student.name}

                              </h2>

                              <p className="text-gray-500 mt-1">

                                {student.student_uid}

                              </p>

                            </div>

                            <div className="text-right">

                              <p>

                                😴 Tidur:
                                {" "}
                                {student.sleep} jam

                              </p>

                              <p>

                                🧠 Pikiran:
                                {" "}
                                {student.stress}

                              </p>

                              <p>

                                🙂 Mood:
                                {" "}
                                {student.mood}

                              </p>

                            </div>

                          </div>

                        </div>

                      )
                    )

                ) : (

                  <div className="bg-green-100 p-5 rounded-3xl">

                    Tidak ada siswa critical 🚀

                  </div>

                )}

              </div>

            </div>

          </div>

        )}

        {/* ================================= */}
        {/* ANALYTICS */}
        {/* ================================= */}

        {activeTab ===
          "analytics" && (

          <div className="space-y-6">

            <div className="bg-white p-6 rounded-3xl shadow">

              <h2 className="text-3xl font-bold mb-5">

                Top Problems Detected 🔥

              </h2>

              <div className="space-y-4">

                {topProblems.map(
                  (
                    item,
                    index
                  ) => (

                    <div
                      key={index}
                      className="
                        bg-red-100
                        p-5
                        rounded-2xl
                      "
                    >

                      {item}

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        )}

        {/* ================================= */}
        {/* PREDICTION */}
        {/* ================================= */}

        {activeTab ===
          "prediction" && (

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-6
            "
          >

            <div className="bg-red-600 text-white p-6 rounded-3xl shadow-xl">

              <h2>Burnout Risk</h2>

              <p className="text-5xl font-bold mt-4">

                {predictions?.burnout_risk}

              </p>

            </div>

            <div className="bg-purple-600 text-white p-6 rounded-3xl shadow-xl">

              <h2>Obesity Risk</h2>

              <p className="text-5xl font-bold mt-4">

                {predictions?.obesity_risk}

              </p>

            </div>

            <div className="bg-yellow-600 text-white p-6 rounded-3xl shadow-xl">

              <h2>Mental Risk</h2>

              <p className="text-5xl font-bold mt-4">

                {predictions?.mental_health_risk}

              </p>

            </div>

          </div>

        )}

        {/* ================================= */}
        {/* GAMIFICATION */}
        {/* ================================= */}

        {activeTab ===
          "gamification" && (

          <div className="space-y-6">

            <div className="bg-white p-6 rounded-3xl shadow">

              <h2 className="text-3xl font-bold mb-6">

                Top Healthy Students 🏆

              </h2>

              <div className="space-y-4">

                <div className="bg-yellow-100 p-5 rounded-2xl">

                  🥇 AgungWD — Wellness 96

                </div>

                <div className="bg-gray-100 p-5 rounded-2xl">

                  🥈 Budi — Wellness 90

                </div>

                <div className="bg-orange-100 p-5 rounded-2xl">

                  🥉 Johan — Wellness 87

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}