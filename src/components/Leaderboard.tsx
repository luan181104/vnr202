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

  return (
    <div className="p-4 border rounded-xl">
      <h2 className="font-bold text-lg mb-3">🏆 Bảng xếp hạng</h2>
      <ul>
        {scores.map((p, idx) => (
          <li key={p.name} className="my-1">
            <b>{idx + 1}. {p.name}</b>  
            — {p.score} điểm — {p.time}s
          </li>
        ))}
      </ul>
    </div>
  );
}
