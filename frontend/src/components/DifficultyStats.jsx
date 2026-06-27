import React, { useEffect, useState } from "react";
import api from "../services/api";

const colors = {
  Easy: "bg-green-500",
  Medium: "bg-yellow-500",
  Hard: "bg-red-500",
};

export default function DifficultyStats() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await api.getDifficultyStats();
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    loadStats();
  }, []);

  if (!stats.length) return null;

  const max = Math.max(...stats.map(s => s.count));

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
      <h2 className="text-2xl font-bold mb-5">
        📊 Difficulty Distribution
      </h2>

      <div className="space-y-5">
        {stats.map(item => (
          <div key={item.difficulty}>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">
                {item.difficulty}
              </span>

              <span>
                {item.count}
              </span>
            </div>

            <div className="bg-gray-200 rounded-full h-2">
              <div
                className={`${colors[item.difficulty] || "bg-blue-500"} h-2 rounded-full`}
                style={{
                  width: `${(item.count / max) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}