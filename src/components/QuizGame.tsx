import { useState, useEffect } from "react";
import { ref, update, get, onValue } from "firebase/database";
import { db } from "../components/firebase";

import {
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  Play,
} from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    question: 'Hiệp định Giơnevơ được ký vào thời gian nào?',
    options: ['Tháng 5/1954', 'Tháng 7/1954', 'Tháng 9/1954', 'Tháng 12/1954'],
    correctAnswer: 1,
    explanation: 'Hiệp định Giơnevơ được ký ngày 21/7/1954, chấm dứt chiến tranh Đông Dương lần thứ nhất.'
  },
  {
    question: 'Sau Hiệp định Giơnevơ, Việt Nam bị chia cắt tại vĩ tuyến nào?',
    options: ['Vĩ tuyến 15', 'Vĩ tuyến 16', 'Vĩ tuyến 17', 'Vĩ tuyến 18'],
    correctAnswer: 2,
    explanation: 'Việt Nam tạm thời chia cắt tại vĩ tuyến 17, miền Bắc hoàn toàn giải phóng, miền Nam dưới ách Mỹ-Diệm.'
  },
  {
    question: 'Đại hội Đảng toàn quốc lần III được tổ chức khi nào?',
    options: ['Tháng 9/1960', 'Tháng 9/1961', 'Tháng 9/1959', 'Tháng 9/1962'],
    correctAnswer: 0,
    explanation: 'Đại hội lần III họp tháng 9/1960, xác định hai nhiệm vụ chiến lược: CMXHCN ở miền Bắc và CMDN ở miền Nam.'
  },
  {
    question: 'Phong trào Đồng Khởi bùng nổ đầu tiên ở tỉnh nào?',
    options: ['Long An', 'Tiền Giang', 'Bến Tre', 'Vĩnh Long'],
    correctAnswer: 2,
    explanation: 'Phong trào Đồng Khởi bùng nổ ở Bến Tre (1959-1960), sau đó lan ra toàn miền Nam.'
  },
  {
    question: 'Mặt trận Dân tộc Giải phóng miền Nam được thành lập năm nào?',
    options: ['1959', '1960', '1961', '1962'],
    correctAnswer: 1,
    explanation: 'Mặt trận được thành lập tháng 12/1960, tập hợp mọi tầng lớp nhân dân chống Mỹ-Diệm.'
  },
  {
    question: 'Trận chiến nào đánh dấu mở đầu thắng lợi chống "chiến tranh cục bộ"?',
    options: ['Ấp Bắc', 'Vạn Tường', 'Bình Giã', 'Ba Gia'],
    correctAnswer: 1,
    explanation: 'Trận Vạn Tường (1965) mở đầu thắng lợi chống "chiến tranh cục bộ" của Mỹ.'
  },
  {
    question: 'Tổng tiến công và nổi dậy Tết Mậu Thân diễn ra năm nào?',
    options: ['1967', '1968', '1969', '1970'],
    correctAnswer: 1,
    explanation: 'Tết Mậu Thân 1968 làm lung lay ý chí xâm lược của Mỹ, gây chấn động dư luận thế giới.'
  },
  {
    question: 'Chiến thắng "Điện Biên Phủ trên không" diễn ra tháng nào?',
    options: ['Tháng 10/1972', 'Tháng 11/1972', 'Tháng 12/1972', 'Tháng 1/1973'],
    correctAnswer: 2,
    explanation: 'Tháng 12/1972, ta bắn rơi hàng trăm máy bay B-52, buộc Mỹ ký Hiệp định Paris.'
  },
  {
    question: 'Hiệp định Paris được ký vào ngày nào?',
    options: ['27/1/1973', '27/2/1973', '27/3/1973', '27/4/1973'],
    correctAnswer: 0,
    explanation: 'Hiệp định Paris ký ngày 27/1/1973, Mỹ phải rút quân hoàn toàn khỏi Việt Nam.'
  },
  {
    question: 'Chiến dịch Hồ Chí Minh kết thúc vào ngày nào?',
    options: ['15/4/1975', '20/4/1975', '25/4/1975', '30/4/1975'],
    correctAnswer: 3,
    explanation: 'Ngày 30/4/1975, Sài Gòn hoàn toàn giải phóng, đất nước thống nhất.'
  },
  {
    question: 'Nhiệm vụ trung tâm của miền Bắc sau 1954 là gì?',
    options: ['Giải phóng miền Nam', 'Xây dựng CNXH', 'Kháng chiến chống Mỹ', 'Thống nhất đất nước'],
    correctAnswer: 1,
    explanation: 'Miền Bắc tập trung xây dựng CNXH và trở thành hậu phương lớn cho cả nước.'
  },
  {
    question: 'Công trình công nghiệp lớn nào được xây dựng ở miền Bắc giai đoạn 1961-1965?',
    options: ['Gang thép Thái Nguyên', 'Nhà máy Viglacera', 'Nhà máy Xi măng Hải Phòng', 'Nhà máy Dệt Nam Định'],
    correctAnswer: 0,
    explanation: 'Gang thép Thái Nguyên và điện Uông Bí là những công trình trọng điểm trong kế hoạch 5 năm lần 1.'
  },
  {
    question: 'Chiến lược "Việt Nam hóa chiến tranh" của Mỹ diễn ra giai đoạn nào?',
    options: ['1965-1968', '1968-1972', '1969-1973', '1970-1973'],
    correctAnswer: 2,
    explanation: 'Giai đoạn 1969-1973, Mỹ rút dần quân viễn chinh, tăng cường VNCH nhưng vẫn thất bại.'
  },
  {
    question: 'Ba vùng chiến lược ở miền Nam là?',
    options: ['Núi - rừng - biển', 'Núi - nông thôn - đô thị', 'Bắc - Trung - Nam', 'Đồng bằng - trung du - cao nguyên'],
    correctAnswer: 1,
    explanation: 'Ba vùng chiến lược: rừng núi, nông thôn đồng bằng và đô thị, tạo thế trận bao vây địch.'
  },
  {
    question: 'Trận đánh nào mở màn cho Chiến dịch Hồ Chí Minh?',
    options: ['Xuân Lộc', 'Buôn Ma Thuột', 'Huế', 'Đà Nẵng'],
    correctAnswer: 1,
    explanation: 'Giải phóng Buôn Ma Thuột (tháng 3/1975) mở màn cho chiến dịch cuối cùng giải phóng miền Nam.'
  }
];

// 👉 FIX 1: hàm formatTime
function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function QuizGame({
  roomId,
  playerName,
}: {
  roomId: string;
  playerName: string;
}) {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(quizQuestions.length).fill(false)
  );
  const [timeLeft, setTimeLeft] = useState(600);
  const [isFinished, setIsFinished] = useState(false);

  // 👉 sanitize tên người chơi làm key Firebase
  const safeName = playerName.replace(/[.#$[\]]/g, "_");

  // Lắng nghe HOST start
  useEffect(() => {
    const statusRef = ref(db, `rooms/${roomId}/status`);
    return onValue(statusRef, (snap) => {
      if (snap.val() === "started") {
        startGame();
      }
    });
  }, []);

  // Timer
  useEffect(() => {
    if (gameStarted && !isFinished && timeLeft > 0) {
      const t = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            finishGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(t);
    }
  }, [gameStarted, isFinished, timeLeft]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(600);
    setAnsweredQuestions(new Array(quizQuestions.length).fill(false));
    setIsFinished(false);
  };

  // Lưu câu trả lời
  const saveAnswerToFirebase = async (
    answerIndex: number,
    correct: boolean
  ) => {
    const playerRef = ref(db, `rooms/${roomId}/players/${safeName}`);
    const snap = await get(playerRef);
    const data = snap.val() || {};

    update(playerRef, {
      score: (data.score || 0) + (correct ? 1 : 0),
      answers: {
        ...(data.answers || {}),
        [currentQuestion]: { answer: answerIndex, correct },
      },
    });
  };

  const handleAnswer = async (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const correct =
      answerIndex === quizQuestions[currentQuestion].correctAnswer;

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);

    if (correct) setScore((s) => s + 1);

    await saveAnswerToFirebase(answerIndex, correct);

    setTimeout(() => setShowResult(true), 300);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      finishGame();
    }
  };

  const finishGame = async () => {
  setIsFinished(true);

  const timeUsed = 600 - timeLeft;

  // Lưu vào players để theo dõi
  update(ref(db, `rooms/${roomId}/players/${safeName}`), {
    isFinished: true,
    finalScore: score,
    timeUsed: timeUsed,
  });

  // Lưu vào scores để Leaderboard đọc được
  update(ref(db, `rooms/${roomId}/scores/${safeName}`), {
    score: score,
    time: timeUsed
  });
};



  const getScoreMessage = () => {
    const p = (score / quizQuestions.length) * 100;
    if (p >= 90) return { text: "Xuất sắc!", color: "text-green-600" };
    if (p >= 70) return { text: "Khá tốt!", color: "text-blue-600" };
    if (p >= 50) return { text: "Trung bình!", color: "text-yellow-600" };
    return { text: "Cần cố gắng thêm!", color: "text-red-600" };
  };

  // 👉 FIX 2: thêm biến question đúng tên
  const question = quizQuestions[currentQuestion];

  // ===================== UI =====================
  if (!gameStarted) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
          <Trophy size={64} className="mx-auto text-yellow-500 mb-4" />
          <h2 className="text-3xl font-bold text-red-700 mb-4">
            Trắc nghiệm Lịch sử
          </h2>

          <button
            onClick={() =>
              update(ref(db, `rooms/${roomId}`), { status: "started" })
            }
            className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg"
          >
            <Play className="mr-2" /> Bắt đầu làm bài
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const msg = getScoreMessage();
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-red-700">Kết quả bài thi</h2>

          <div className={`text-6xl font-bold ${msg.color}`}>
            {score}/{quizQuestions.length}
          </div>

          <button
            onClick={startGame}
            className="bg-red-600 text-white px-8 py-3 rounded-lg mt-4 font-bold"
          >
            <RotateCcw /> Làm lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl p-6 mb-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-red-100 px-4 py-2 rounded-lg">
              <span className="text-red-700 font-bold">
                Câu {currentQuestion + 1}/{quizQuestions.length}
              </span>
            </div>

            <div className="bg-green-100 px-4 py-2 rounded-lg">
              <span className="text-green-700 font-bold">Điểm: {score}</span>
            </div>
          </div>

          {/* Timer */}
          <div
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              timeLeft < 60 ? "bg-red-100 animate-glow" : "bg-blue-100"
            }`}
          >
            <Clock
              size={20}
              className={timeLeft < 60 ? "text-red-600" : "text-blue-600"}
            />
            <span
              className={`font-bold ${
                timeLeft < 60 ? "text-red-600" : "text-blue-600"
              }`}
            >
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Thanh tiến độ */}
        <div className="mb-6">
          <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-red-600 to-red-700 h-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestion + 1) / quizQuestions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          {question.question}
        </h3>

        {/* OPTIONS */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            let bg = "bg-gray-50 hover:bg-gray-100";
            let border = "border-gray-300";
            let icon = null;

            if (selectedAnswer !== null) {
              if (index === question.correctAnswer) {
                bg = "bg-green-100";
                border = "border-green-500";
                icon = <CheckCircle className="text-green-600" />;
              } else if (index === selectedAnswer) {
                bg = "bg-red-100";
                border = "border-red-500";
                icon = <XCircle className="text-red-600" />;
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-lg border-2 ${border} ${bg} text-left transition-all flex items-center justify-between`}
              >
                <span>{option}</span>
                {icon}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p>
              <span className="font-bold text-blue-700">Giải thích: </span>
              {question.explanation}
            </p>
          </div>
        )}
      </div>

      {showResult && (
        <div className="text-center">
          <button
            onClick={nextQuestion}
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold"
          >
            {currentQuestion < quizQuestions.length - 1
              ? "Câu tiếp theo"
              : "Xem kết quả"}
          </button>
        </div>
      )}
    </div>
  );
}
