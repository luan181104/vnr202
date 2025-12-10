import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";

export default function Leaderboard({ roomId }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const scoreRef = ref(db, `rooms/${roomId}/scores`);
    return onValue(scoreRef, (snapshot) => {
      const data = snapshot.val() || {};

      // Convert object -> array
      const arr = Object.keys(data).map((name) => ({
        name,
        score: data[name].score,
        time: data[name].time,
      }));

      // Sort: score DESC → time ASC
      arr.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.time - b.time;
      });

      setScores(arr);
    });
  }, [roomId]);

  const getMedalColor = (rank) => {
    if (rank === 0) return "from-yellow-400 to-yellow-600"; // Gold
    if (rank === 1) return "from-gray-300 to-gray-500"; // Silver
    if (rank === 2) return "from-orange-400 to-orange-600"; // Bronze
    return "from-blue-400 to-blue-600"; // Default
  };

  const getMedalIcon = (rank) => {
    if (rank === 0) return "🥇";
    if (rank === 1) return "🥈";
    if (rank === 2) return "🥉";
    return "🏅";
  };

  const getRankBadgeStyle = (rank) => {
    if (rank === 0) return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
    if (rank === 1) return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
    if (rank === 2) return "bg-gradient-to-r from-orange-400 to-orange-600 text-white";
    return "bg-gradient-to-r from-blue-400 to-blue-600 text-white";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-4 mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏆 Bảng xếp hạng</h1>
          <p className="text-gray-600">Phòng: {roomId}</p>
        </div>

        {/* Leaderboard */}
        {scores.length === 0 ? (
          <div className="bg-gray-50 rounded-2xl p-12 text-center">
            <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-500 font-medium text-lg">Chưa có kết quả</p>
            <p className="text-gray-400 text-sm mt-1">Điểm số sẽ xuất hiện sau khi trò chơi kết thúc</p>
          </div>
        ) : (
          <div className="space-y-3">
            {scores.map((player, idx) => (
              <div
                key={player.name}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                  idx < 3 ? 'hover:scale-105' : 'hover:scale-102'
                } ${idx === 0 ? 'shadow-xl' : 'shadow-md'}`}
              >
                {/* Background gradient for top 3 */}
                {idx < 3 && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${getMedalColor(idx)} opacity-10`}></div>
                )}
                
                <div className="relative bg-white border-2 border-gray-100 rounded-2xl p-5 flex items-center space-x-4">
                  {/* Rank Badge */}
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl ${getRankBadgeStyle(idx)} flex items-center justify-center shadow-md`}>
                    <span className="text-2xl font-bold">
                      {idx < 3 ? getMedalIcon(idx) : `#${idx + 1}`}
                    </span>
                  </div>

                  {/* Player Avatar */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r ${getMedalColor(idx)} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                    {player.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Player Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-800 truncate">
                      {player.name}
                      {idx === 0 && (
                        <span className="ml-2 text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                          Nhất 👑
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Thời gian: {player.time}s
                    </p>
                  </div>

                  {/* Score Display */}
                  <div className="flex-shrink-0 text-right">
                    <div className={`inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r ${getMedalColor(idx)} shadow-md`}>
                      <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <span className="text-2xl font-bold text-white">
                        {player.score}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">điểm</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Stats */}
        {scores.length > 0 && (
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Tổng người chơi</p>
              <p className="text-2xl font-bold text-purple-700">{scores.length}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Điểm cao nhất</p>
              <p className="text-2xl font-bold text-blue-700">{scores[0]?.score || 0}</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Thời gian tốt nhất</p>
              <p className="text-2xl font-bold text-green-700">{scores[0]?.time || 0}s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}