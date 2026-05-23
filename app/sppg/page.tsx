"use client";

import { useEffect, useState } from "react";

export default function SppgPage() {

  const [data, setData] = useState<any>(null);

  useEffect(() => {

    fetch(
      "http://localhost:8000/sppg-intelligence"
    )
      .then((res) => res.json())
      .then((result) => {

        setData(result);

      });

  }, []);

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">

        SPPG Intelligence Dashboard

      </h1>

      {data && (

        <div className="space-y-6">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <div className="bg-blue-500 text-white p-6 rounded-xl">

              <h2>Total Students</h2>

              <p className="text-5xl font-bold">

                {data.total_students}

              </p>

            </div>

            <div className="bg-red-500 text-white p-6 rounded-xl">

              <h2>High Stress</h2>

              <p className="text-5xl font-bold">

                {data.high_stress}

              </p>

            </div>

            <div className="bg-yellow-500 text-white p-6 rounded-xl">

              <h2>Sleep Problem</h2>

              <p className="text-5xl font-bold">

                {data.sleep_problem}

              </p>

            </div>

            <div className="bg-green-500 text-white p-6 rounded-xl">

              <h2>High BMI</h2>

              <p className="text-5xl font-bold">

                {data.high_bmi}

              </p>

            </div>

          </div>

          <div className="bg-white shadow p-6 rounded-xl">

            <h2 className="text-2xl font-bold mb-4">

              AI MBG Recommendations

            </h2>

            <ul className="list-disc pl-6 space-y-2">

              {data.recommendations.map(
                (item: string, index: number) => (

                  <li key={index}>
                    {item}
                  </li>
                )
              )}

            </ul>

          </div>

        </div>

      )}

    </div>
  );
}