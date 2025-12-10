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
    <div className="p-4 text-center space-y-4">
      <h2 className="text-xl font-bold">Chọn chế độ</h2>

      <button
        onClick={() => setMode("host")}
        className="px-4 py-2 bg-red-600 text-white rounded-lg w-full"
      >
        Tạo phòng (Host)
      </button>

      <button
        onClick={() => setMode("join")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
      >
        Tham gia phòng (Player)
      </button>
    </div>
  );
}
