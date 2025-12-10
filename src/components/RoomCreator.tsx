import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "./firebase";

export default function RoomCreator({ onRoomCreated }: { onRoomCreated: (id: string) => void }) {
  const [roomCode, setRoomCode] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const createRoom = async () => {
    if (!roomCode.trim()) {
      alert("Vui lòng nhập mã phòng");
      return;
    }

    setIsCreating(true);
    try {
      await set(ref(db, `rooms/${roomCode}`), {
        status: "waiting",
        players: {},
      });
      onRoomCreated(roomCode);
    } catch (error) {
      alert("Có lỗi xảy ra khi tạo phòng");
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-600 rounded-full p-4 mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Tạo phòng mới</h1>
          <p className="text-gray-600">Nhập mã phòng để bắt đầu trò chơi</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mã phòng
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:bg-white transition-all outline-none text-lg font-semibold text-gray-800"
                placeholder="VD: ROOM123"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && createRoom()}
                maxLength={10}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Mã phòng giúp người chơi tham gia vào trò chơi của bạn
            </p>
          </div>

          <button
            onClick={createRoom}
            disabled={isCreating || !roomCode.trim()}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              isCreating || !roomCode.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-lg hover:scale-105'
            }`}
          >
            {isCreating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang tạo...
              </span>
            ) : (
              'Tạo phòng'
            )}
          </button>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">Lưu ý</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Chọn mã phòng dễ nhớ để chia sẻ với bạn bè</li>
                <li>• Mã phòng nên ngắn gọn và không có khoảng trắng</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}