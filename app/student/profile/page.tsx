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

  const [user, setUser] =
    useState<any>(null);

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

    const savedProfile =
      localStorage.getItem(
        `profile_${user.email}`
      );

    if (savedProfile) {

      const profile =
        JSON.parse(savedProfile);

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
  }

  async function saveProfile() {

    const profile = {

      // 🔥 IDENTITAS SEKOLAH

      school_code: schoolCode,

      nis: nis,

      // 🔥 PROFILE SISWA

      name,
      age,
      height,
      weight

    };

    localStorage.setItem(

      `profile_${user.email}`,

      JSON.stringify(profile)

    );

    alert(
      "Profile berhasil disimpan ✅"
    );

    router.push("/student");
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6 pb-28">

      <h1 className="text-3xl font-bold mb-6">

        Profile Siswa 👨‍🎓

      </h1>

      <div className="bg-white p-6 rounded-3xl shadow">

        {/* SCHOOL CODE */}

        <input
          placeholder="School Code (SMA1)"
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

        {/* NAMA */}

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

        {/* UMUR */}

        <input
          placeholder="Umur"
          value={age}
          onChange={(e) =>
            setAge(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl mb-4"
        />

        {/* TINGGI */}

        <input
          placeholder="Tinggi Badan (cm)"
          value={height}
          onChange={(e) =>
            setHeight(
              e.target.value
            )
          }
          className="w-full p-4 border rounded-2xl mb-4"
        />

        {/* BERAT */}

        <input
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
          className="w-full bg-blue-500 text-white p-4 rounded-2xl font-bold"
        >

          Simpan Profile 🚀

        </button>

      </div>

      <StudentBottomNav />

    </div>
  );
}