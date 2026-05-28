"use client";

import { useEffect, useState }
from "react";

import { useRouter }
from "next/navigation";

import { supabase }
from "@/lib/supabase";

import StudentBottomNav
from "@/components/StudentBottomNav";



export default function ProfilePage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  // 🔥 PROFILE STATE

  const [schoolCode, setSchoolCode] =
    useState("");

  const [nis, setNis] =
    useState("");

  const [name, setName] =
    useState("");

  const [age, setAge] =
    useState("");

  const [height, setHeight] =
    useState("");

  const [weight, setWeight] =
    useState("");

  const [user, setUser] =
  useState<any>(null);

  useEffect(() => {

    loadUser();

  }, []);

  async function loadUser() {

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {

      router.push("/login");
      return;

    }

    setUser(user);
  }
  // =========================
  // INIT
  // =========================

  useEffect(() => {

    loadProfile();

  }, []);

  async function loadProfile() {

    // 🔥 AMBIL PROFILE CACHE

    const raw =
      localStorage.getItem("profile");

    if (!raw) return;

    const profile =
      JSON.parse(raw);

    setSchoolCode(
      profile.school_code || ""
    );

    setNis(
      profile.nis || ""
    );

    setName(
      profile.name || ""
    );

    setAge(
      profile.age || ""
    );

    setHeight(
      profile.height || ""
    );

    setWeight(
      profile.weight || ""
    );
  }

  // =========================
  // SAVE PROFILE
  // =========================

  async function saveProfile() {

  if (!user?.email) {

    alert("User belum login");
    return;

  }

  try {

    // 🔥 KIRIM KE BACKEND
    const response = await fetch(

      `${process.env.NEXT_PUBLIC_API_URL}/save-profile`,

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          email: user.email,

          school_code: schoolCode,

          nis: nis,

          name: name,

          age: age,

          height: height,

          weight: weight

        })
      }

    );

    const result =
      await response.json();

    console.log(result);

    // 🔥 GAGAL
    if (!result.success) {

      alert("Gagal simpan profile");
      return;

    }

    // 🔥 SIMPAN LOCAL PROFILE
    const profile = {

      email: user.email,

      student_uid:
        result.student_uid,

      school_code: schoolCode,

      nis: nis,

      name: name,

      age: age,

      height: height,

      weight: weight

    };

    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );

    alert("Profile berhasil disimpan 🚀");

    router.push("/student");

  } catch (err) {

    console.log(err);

    alert("Backend tidak terhubung");
  }
}

  return (

    <div className="min-h-screen bg-gray-100 p-6 pb-28">

      <h1 className="text-3xl font-bold mb-6">

        Profile Siswa 👨‍🎓

      </h1>

      <div className="bg-white p-6 rounded-3xl shadow">

        {/* SCHOOL CODE */}

        <input
          placeholder="School Code (SMPN105)"
          value={schoolCode}
          onChange={(e) =>
            setSchoolCode(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl mb-4"
        />

        {/* NIS */}

        <input
          placeholder="NIS"
          value={nis}
          onChange={(e) =>
            setNis(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl mb-4"
        />

        {/* NAME */}

        <input
          placeholder="Nama Lengkap"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl mb-4"
        />

        {/* AGE */}

        <input
          type="number"
          placeholder="Umur"
          value={age}
          onChange={(e) =>
            setAge(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl mb-4"
        />

        {/* HEIGHT */}

        <input
          type="number"
          placeholder="Tinggi Badan (cm)"
          value={height}
          onChange={(e) =>
            setHeight(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl mb-4"
        />

        {/* WEIGHT */}

        <input
          type="number"
          placeholder="Berat Badan (kg)"
          value={weight}
          onChange={(e) =>
            setWeight(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl mb-6"
        />

        {/* BUTTON */}

        <button
          onClick={saveProfile}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-4 rounded-2xl font-bold disabled:opacity-50"
        >

          {loading
            ? "Menyimpan..."
            : "Simpan Profile 🚀"}

        </button>

      </div>

      <StudentBottomNav />

    </div>
  );
}