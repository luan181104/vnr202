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
  const [status, setStatus] = useState("waiting");   // waiting | started
  const [players, setPlayers] = useState({});

  // Lắng nghe trạng thái ROOM
  useEffect(() => {
    const roomRef = ref(db, `rooms/${roomId}/status`);
    return onValue(roomRef, (snapshot) => {
      setStatus(snapshot.val() || "waiting");
    });
  }, [roomId]);

  // Lắng nghe danh sách người chơi
  useEffect(() => {
    const playersRef = ref(db, `rooms/${roomId}/players`);
    return onValue(playersRef, (snapshot) => {
      setPlayers(snapshot.val() || {});
    });
  }, [roomId]);

  // ⬅️ Quan trọng: chỉ chuyển sang QuizGame khi status === "started"
  if (status === "started") {
    return <QuizGame roomId={roomId} playerName={player} />;
  }

  if (status === "finished") {
  return <Leaderboard roomId={roomId} />;
}


  return (
    <div className="p-4 w-80 border rounded-xl">
      <h2>Người chơi: {player}</h2>
      <p>Phòng: {roomId}</p>
      <p>Trạng thái: {status}</p>

      {status === "waiting" && (
        <p className="text-yellow-600 mt-2">Chờ chủ phòng bắt đầu…</p>
      )}

      <div className="mt-4">
        <h3 className="font-semibold mb-1">Người chơi trong phòng:</h3>
        <ul className="list-disc ml-5">
          {Object.keys(players).map((name) => (
            <li key={name}>
              {name} {name === player && "(Bạn)"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
