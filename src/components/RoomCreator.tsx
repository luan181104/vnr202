import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "./firebase";


export default function RoomCreator({ onRoomCreated }: { onRoomCreated: (id: string) => void }) {
  const [roomCode, setRoomCode] = useState("");

  const createRoom = async () => {
    if (!roomCode) return;

    await set(ref(db, `rooms/${roomCode}`), {
      status: "waiting",
      players: {},
    });

    onRoomCreated(roomCode);
  };

  return (
    <div className="p-4 border rounded-xl w-64">
      <h2>Tạo phòng</h2>

      <input
        className="border p-2 w-full mt-2"
        placeholder="Enter room code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />

      <button className="bg-blue-500 text-white p-2 w-full mt-4" onClick={createRoom}>
        Tạo
      </button>
    </div>
  );
}
