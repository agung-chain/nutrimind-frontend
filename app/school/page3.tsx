"use client";

import Link from "next/link";

export default function SchoolPage() {

  const menus = [

    {
      title: "Dashboard",
      icon: "📊",
      desc: "Monitoring kondisi sekolah",
      link: "/dashboard",
      color: "from-blue-500 to-indigo-600"
    },

    {
      title: "Alerts",
      icon: "🚨",
      desc: "Siswa yang butuh perhatian",
      link: "/school/alerts",
      color: "from-red-500 to-pink-600"
    },

    {
      title: "Analytics",
      icon: "📈",
      desc: "Analisa kesehatan sekolah",
      link: "/school/analytics",
      color: "from-green-500 to-emerald-600"
    },

    {
      title: "Students",
      icon: "👨‍🎓",
      desc: "Data seluruh siswa",
      link: "/school/students",
      color: "from-cyan-500 to-sky-600"
    },

    {
      title: "AI Prediction",
      icon: "🤖",
      desc: "Prediksi AI sekolah",
      link: "/school/prediction",
      color: "from-purple-500 to-violet-600"
    },

    {
      title: "Rewards",
      icon: "🏆",
      desc: "Leaderboard siswa sehat",
      link: "/school/rewards",
      color: "from-yellow-500 to-orange-500"
    }

  ];

  return (

    <div className="min-h-screen bg-gray-100 p-6 pb-24">

      {/* HEADER */}

      <div
        className="
          bg-gradient-to-r
          from-indigo-600
          to-purple-600
          text-white
          p-8
          rounded-3xl
          shadow-xl
          mb-8
        "
      >

        <h1 className="text-5xl font-bold">

          School Command Center 🏫

        </h1>

        <p className="mt-4 text-lg opacity-90">

          AI Wellness Monitoring Platform

        </p>

      </div>

      {/* MENU GRID */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
      >

        {menus.map(
          (menu, index) => (

            <Link
              href={menu.link}
              key={index}
            >

              <div
                className={`
                  bg-gradient-to-r
                  ${menu.color}

                  text-white
                  p-8
                  rounded-3xl
                  shadow-xl
                  hover:scale-105
                  transition-all
                  duration-300
                  cursor-pointer
                `}
              >

                <div className="text-6xl">

                  {menu.icon}

                </div>

                <h2 className="text-3xl font-bold mt-5">

                  {menu.title}

                </h2>

                <p className="mt-3 text-lg opacity-90">

                  {menu.desc}

                </p>

              </div>

            </Link>

          )
        )}

      </div>

    </div>
  );
}