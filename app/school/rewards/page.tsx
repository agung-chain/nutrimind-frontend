"use client";

import Link from "next/link";

export default function RewardsPage() {

  return (

    <div className="p-10">

      <Link
        href="/school"
        className="
          bg-black
          text-white
          px-5
          py-3
          rounded-2xl
        "
      >

        ← Back

      </Link>

      <h1 className="text-5xl font-bold mt-8">

        Rewards 🏆

      </h1>

    </div>

  );
}