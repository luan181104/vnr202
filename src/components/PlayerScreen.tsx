import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";
import QuizGame from "./QuizGame";
import Leaderboard from "./Leaderboard";

export default function PlayerScreen({
  roomId,
  player,
}: {
  roomId: string;
  player: string;
}) {
  const [status, setStatus] = useState("waiting");
  const [players, setPlayers] = useState({});

  useEffect(() => {
    const roomRef = ref(db, `rooms/${roomId}/status`);
    return onValue(roomRef, (snapshot) => {
      setStatus(snapshot.val() || "waiting");
    });
  }, [roomId]);

  useEffect(() => {
    const playersRef = ref(db, `rooms/${roomId}/players`);
    return onValue(playersRef, (snapshot) => {
      setPlayers(snapshot.val() || {});
    });
  }, [roomId]);

  if (status === "started") {
    return <QuizGame roomId={roomId} playerName={player} />;
  }

  if (status === "finished") {
    return <Leaderboard roomId={roomId} />;
  }

  const playerCount = Object.keys(players).length;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
        {/* Player Info Card */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-2xl border-2 border-white/30">
              {player.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-100 mb-1">Người chơi</p>
              <h2 className="text-2xl font-bold">{player}</h2>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-sm font-medium text-blue-100 mb-1">Phòng</p>
              <p className="text-xl font-bold">{roomId}</p>
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="text-center mb-8">
          {status === "waiting" && (
            <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-yellow-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-yellow-800 mb-2">Đang chờ bắt đầu...</h3>
              <p className="text-yellow-700">Chủ phòng sẽ bắt đầu trò chơi sớm thôi!</p>
            </div>
          )}
        </div>

        {/* Players List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Người chơi trong phòng</h3>
            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
              {playerCount} {playerCount === 1 ? 'người' : 'người'}
            </div>
          </div>

          {playerCount === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-gray-500 font-medium">Chưa có người chơi nào khác</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
              {Object.keys(players).map((name, index) => {
                const isCurrentPlayer = name === player;
                return (
                  <div
                    key={name}
                    className={`rounded-xl p-4 flex items-center space-x-3 transition-all ${
                      isCurrentPlayer
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                        : 'bg-gradient-to-r from-gray-50 to-slate-50 hover:shadow-md'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      isCurrentPlayer
                        ? 'bg-white/20 backdrop-blur-sm text-white border-2 border-white/30'
                        : 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white'
                    }`}>
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className={`font-semibold truncate ${
                          isCurrentPlayer ? 'text-white' : 'text-gray-800'
                        }`}>
                          {name}
                        </p>
                        {isCurrentPlayer && (
                          <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-semibold border border-white/30">
                            Bạn
                          </span>
                        )}
                      </div>
                      <p className={`text-sm ${
                        isCurrentPlayer ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        Người chơi #{index + 1}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className={`w-3 h-3 rounded-full ${
                        isCurrentPlayer ? 'bg-white' : 'bg-green-500'
                      }`}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Mẹo nhỏ</h4>
              <p className="text-sm text-gray-600">Hãy sẵn sàng! Trò chơi sẽ bắt đầu khi chủ phòng nhấn nút bắt đầu.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}