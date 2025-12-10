import React, { useState } from "react";
import { ref, update, get } from "firebase/database";
import { db } from "./firebase";

export default function JoinRoom({
  onJoin,
}: {
  onJoin: (roomId: string, playerName: string) => void;
}) {
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");

  const joinRoom = async () => {
    if (!roomCode || !playerName) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const snapshot = await get(ref(db, `rooms/${roomCode}`));
    if (!snapshot.exists()) {
      alert("Phòng không tồn tại");
      return;
    }

    // Lưu người chơi vào DB
    await update(ref(db, `rooms/${roomCode}/players/${playerName}`), {
      joinedAt: Date.now(),
    });

    // GỌI LẠI QUIZLOBBY → chuyển sang playerScreen !!!
    onJoin(roomCode, playerName);
  };

  return (
    <div className="p-4 border rounded-xl w-64">
      <h2 className="font-semibold">Tham gia phòng</h2>

      <input
        className="border p-2 w-full mt-2"
        placeholder="Mã phòng"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />

      <input
        className="border p-2 w-full mt-2"
        placeholder="Tên của bạn"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />

      <button
        className="bg-green-600 text-white p-2 w-full mt-4"
        onClick={joinRoom}
      >
        Tham gia
      </button>
    </div>
  );
}
