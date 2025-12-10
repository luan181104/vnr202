import React, { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import { db } from "./firebase";

export default function HostScreen({ roomId }: { roomId: string }) {
  const [players, setPlayers] = useState({});
  const [status, setStatus] = useState("waiting");

  useEffect(() => {
    const playersRef = ref(db, `rooms/${roomId}/players`);
    return onValue(playersRef, (snapshot) => {
      setPlayers(snapshot.val() || {});
    });
  }, [roomId]);

  useEffect(() => {
    const statusRef = ref(db, `rooms/${roomId}/status`);
    return onValue(statusRef, (snapshot) => {
      setStatus(snapshot.val() || "waiting");
    });
  }, [roomId]);

  const startGame = () => {
    update(ref(db, `rooms/${roomId}`), { status: "started" });
  };

  const finishGame = () => {
    update(ref(db, `rooms/${roomId}`), { status: "finished" });
  };

  const playerCount = Object.keys(players).length;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-full px-6 py-3 mb-4">
            <svg className="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-white font-bold text-lg">CHỦ PHÒNG</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Phòng {roomId}</h1>
          
          {status === "waiting" && (
            <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
              Đang chờ người chơi
            </div>
          )}
          
          {status === "started" && (
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Đang chơi
            </div>
          )}
          
          {status === "finished" && (
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Đã kết thúc
            </div>
          )}
        </div>

        {/* Players Section */}
        {status === "waiting" && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Người chơi</h2>
              <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                {playerCount} {playerCount === 1 ? 'người' : 'người'}
              </div>
            </div>

            {playerCount === 0 ? (
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-gray-500 font-medium">Chưa có người chơi nào</p>
                <p className="text-gray-400 text-sm mt-1">Chia sẻ mã phòng để bắt đầu!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {Object.keys(players).map((name, index) => (
                  <div
                    key={name}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 flex items-center space-x-3 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 font-semibold truncate">{name}</p>
                      <p className="text-gray-500 text-sm">Người chơi #{index + 1}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={startGame}
              disabled={playerCount === 0}
              className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all ${
                playerCount === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105'
              }`}
            >
              {playerCount === 0 ? 'Chờ người chơi tham gia' : `Bắt đầu trò chơi (${playerCount} người)`}
            </button>
          </div>
        )}

        {/* Game Started */}
        {status === "started" && (
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Trò chơi đang diễn ra!</h3>
              <p className="text-gray-600">Người chơi đang trả lời các câu hỏi</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <h4 className="font-semibold text-gray-700 mb-3">Người chơi tham gia ({playerCount})</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {Object.keys(players).map((name) => (
                  <div key={name} className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                    {name}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={finishGame}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all"
            >
              Kết thúc & Xem bảng xếp hạng
            </button>
          </div>
        )}

        {/* Game Finished */}
        {status === "finished" && (
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Trò chơi đã kết thúc!</h3>
              <p className="text-gray-600">Người chơi đang xem bảng xếp hạng</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}