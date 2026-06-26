import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function TrendingCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.getCompanyStats();
        setCompanies(res.data.slice(0, 5)); // Top 5 companies
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          🔥 Trending Companies
        </h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center">
        🔥 Trending Companies
      </h2>

      <div className="space-y-4">
        {companies.map((company, index) => (
          <div key={company.slug}>
            <div className="flex justify-between mb-1">
              <span className="font-semibold text-gray-800">
                {index + 1}. {company.company}
              </span>

              <span className="text-sm font-medium text-blue-600">
                {company.totalThreads} Experiences
              </span>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${(company.totalThreads / companies[0].totalThreads) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}