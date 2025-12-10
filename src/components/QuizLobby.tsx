import { useState } from "react";
import RoomCreator from "./RoomCreator";
import JoinRoom from "./JoinRoom";
import HostScreen from "./HostScreen";
import PlayerScreen from "./PlayerScreen";

export default function QuizLobby() {
  const [mode, setMode] = useState<"menu" | "host" | "join" | "hostScreen" | "playerScreen">("menu");
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");

  if (mode === "host") {
    return (
      <RoomCreator
        onRoomCreated={(id) => {
          setRoomId(id);
          setMode("hostScreen");
        }}
      />
    );
  }

  if (mode === "join") {
    return (
      <JoinRoom
        onJoin={(id, name) => {
          setRoomId(id);
          setPlayerName(name);
          setMode("playerScreen");
        }}
      />
    );
  }

  if (mode === "hostScreen") {
    return <HostScreen roomId={roomId} />;
  }

  if (mode === "playerScreen") {
    return <PlayerScreen roomId={roomId} player={playerName} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-4 mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Quiz Game</h1>
          <p className="text-gray-600">Chọn chế độ chơi của bạn</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setMode("host")}
            className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 p-1 transition-all hover:scale-105 hover:shadow-xl"
          >
            <div className="relative bg-white rounded-xl p-6 transition-all group-hover:bg-opacity-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-red-100 rounded-full p-3 group-hover:bg-white/20 transition-colors">
                    <svg className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-white transition-colors">Tạo phòng</h3>
                    <p className="text-sm text-gray-600 group-hover:text-white/80 transition-colors">Làm chủ phòng quiz</p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          <button
            onClick={() => setMode("join")}
            className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 p-1 transition-all hover:scale-105 hover:shadow-xl"
          >
            <div className="relative bg-white rounded-xl p-6 transition-all group-hover:bg-opacity-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 rounded-full p-3 group-hover:bg-white/20 transition-colors">
                    <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-white transition-colors">Tham gia</h3>
                    <p className="text-sm text-gray-600 group-hover:text-white/80 transition-colors">Vào phòng có sẵn</p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">Chơi cùng bạn bè và thử thách trí tuệ!</p>
        </div>
      </div>
    </div>
  );
}