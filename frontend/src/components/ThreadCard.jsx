import React from 'react'
import { Link } from 'react-router-dom'

export default function ThreadCard({ thread }) {
  const getDifficultyColor = (difficulty) => {
    const colors = {
      'easy': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'hard': 'bg-red-100 text-red-800'
    }
    return colors[difficulty?.toLowerCase()] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Link to={`/thread/${thread._id}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
  <div className="flex items-center gap-3">
    {thread.company?.logo && (
        <img
            src={`/logos/${thread.company.logo}`}
           alt={thread.company.name}
           className="w-12 h-12 rounded-lg object-contain bg-white border p-1"
      />
    )}

    <div>
      <h3 className="font-bold text-lg text-gray-900">
        {thread.company?.name || "Unknown Company"}
      </h3>

      <p className="text-sm text-gray-600">
        {thread.jobRole?.title || "Role not specified"} •{" "}
        {thread.yearOfPlacement || "Year not specified"}
      </p>
    </div>
  </div>

  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
      thread.difficulty
    )}`}
  >
    {thread.difficulty}
  </span>
</div>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {thread.experience || 'No experience description'}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex gap-2">
            {thread.rounds && <span className="bg-gray-100 px-2 py-1 rounded">{thread.rounds} rounds</span>}
            {thread.candidateName && <span className="bg-gray-100 px-2 py-1 rounded">By {thread.candidateName}</span>}
          </div>
          <time>{formatDate(thread.createdAt)}</time>
        </div>
      </div>
    </Link>
  )
}
