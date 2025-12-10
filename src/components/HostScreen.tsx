import React, { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import { db } from "./firebase";

export default function HostScreen({ roomId }: { roomId: string }) {
  const [players, setPlayers] = useState({});
  const [status, setStatus] = useState("waiting");

  // Lắng nghe danh sách người chơi
  useEffect(() => {
    const playersRef = ref(db, `rooms/${roomId}/players`);
    return onValue(playersRef, (snapshot) => {
      setPlayers(snapshot.val() || {});
    });
  }, [roomId]);

  // Lắng nghe trạng thái phòng
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

  return (
    <div className="p-4 w-80 border rounded-xl">
      <h2 className="text-lg font-bold">Chủ phòng - Phòng {roomId}</h2>

      {status === "waiting" && (
        <>
          <h3 className="mt-3">Người chơi:</h3>
          <ul>
            {Object.keys(players).map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>

          <button
            className="bg-purple-600 text-white p-2 w-full mt-4"
            onClick={startGame}
          >
            Bắt đầu
          </button>
        </>
      )}

      {status === "started" && (
        <div className="mt-3">
          <p className="text-green-600 font-semibold">
            Quiz đang diễn ra...
          </p>
          <button
            className="bg-red-600 text-white p-2 w-full mt-4"
            onClick={finishGame}
          >
            Kết thúc & Xem bảng xếp hạng
          </button>
        </div>
      )}

      {status === "finished" && (
        <div className="mt-3">
          <p className="font-semibold text-blue-600">
            Quiz đã kết thúc. Mọi người đang xem bảng xếp hạng!
          </p>
        </div>
      )}
    </div>
  );
}
