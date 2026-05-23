"use client";

import Link from "next/link";

export default function PredictionPage() {

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

        AI Prediction 🤖

      </h1>

    </div>

  );
}