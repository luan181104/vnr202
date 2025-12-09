import { useState, useEffect } from 'react';
import { Trophy, Clock, CheckCircle, XCircle, RotateCcw, Play } from 'lucide-react';

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

function QuizGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(quizQuestions.length).fill(false));
  const [timeLeft, setTimeLeft] = useState(600);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (gameStarted && !isFinished && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, isFinished, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnsweredQuestions(new Array(quizQuestions.length).fill(false));
    setTimeLeft(600);
    setIsFinished(false);
  };

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);

    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setShowResult(true);
    }, 500);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 90) return { text: 'Xuất sắc!', color: 'text-green-600' };
    if (percentage >= 70) return { text: 'Khá tốt!', color: 'text-blue-600' };
    if (percentage >= 50) return { text: 'Trung bình!', color: 'text-yellow-600' };
    return { text: 'Cần cố gắng thêm!', color: 'text-red-600' };
  };

  if (!gameStarted) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
          <Trophy size={64} className="mx-auto text-yellow-500 mb-4" />
          <h2 className="text-3xl font-bold text-red-700 mb-4">Trắc nghiệm Lịch sử</h2>
          <p className="text-gray-600 mb-6">Kiểm tra kiến thức của bạn về giai đoạn 1954-1975</p>

          <div className="bg-red-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-bold text-red-700 mb-3">Thông tin về bài thi:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <CheckCircle size={18} className="text-green-600 mr-2" />
                <span>Tổng số câu hỏi: {quizQuestions.length}</span>
              </li>
              <li className="flex items-center">
                <Clock size={18} className="text-blue-600 mr-2" />
                <span>Thời gian: 10 phút</span>
              </li>
              <li className="flex items-center">
                <Trophy size={18} className="text-yellow-600 mr-2" />
                <span>Mỗi câu đúng: 1 điểm</span>
              </li>
            </ul>
          </div>

          <button
            onClick={startGame}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg flex items-center mx-auto"
          >
            <Play className="mr-2" />
            Bắt đầu làm bài
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const scoreMsg = getScoreMessage();
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center animate-fadeIn">
          <Trophy size={64} className="mx-auto text-yellow-500 mb-4 animate-pulse-slow" />
          <h2 className="text-3xl font-bold text-red-700 mb-4">Kết quả bài thi</h2>

          <div className="bg-gradient-to-br from-red-50 to-yellow-50 rounded-lg p-8 mb-6">
            <div className={`text-6xl font-bold mb-2 ${scoreMsg.color}`}>
              {score}/{quizQuestions.length}
            </div>
            <div className={`text-2xl font-bold mb-4 ${scoreMsg.color}`}>
              {scoreMsg.text}
            </div>
            <div className="text-gray-600">
              Tỷ lệ chính xác: {((score / quizQuestions.length) * 100).toFixed(1)}%
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-6">
            {quizQuestions.map((_, index) => {
              const isCorrect = index < answeredQuestions.length &&
                               answeredQuestions[index] &&
                               selectedAnswer === quizQuestions[index].correctAnswer;
              return (
                <div
                  key={index}
                  className={`h-10 rounded flex items-center justify-center font-bold ${
                    !answeredQuestions[index]
                      ? 'bg-gray-300 text-gray-600'
                      : isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>

          <button
            onClick={startGame}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg flex items-center mx-auto"
          >
            <RotateCcw className="mr-2" />
            Làm lại
          </button>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-red-100 px-4 py-2 rounded-lg">
              <span className="text-red-700 font-bold">
                Câu {currentQuestion + 1}/{quizQuestions.length}
              </span>
            </div>
            <div className="bg-green-100 px-4 py-2 rounded-lg">
              <span className="text-green-700 font-bold">
                Điểm: {score}
              </span>
            </div>
          </div>
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            timeLeft < 60 ? 'bg-red-100 animate-glow' : 'bg-blue-100'
          }`}>
            <Clock size={20} className={timeLeft < 60 ? 'text-red-600' : 'text-blue-600'} />
            <span className={`font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-blue-600'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-red-600 to-red-700 h-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h3>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            let bgColor = 'bg-gray-50 hover:bg-gray-100';
            let borderColor = 'border-gray-300';
            let icon = null;

            if (selectedAnswer !== null) {
              if (index === question.correctAnswer) {
                bgColor = 'bg-green-100';
                borderColor = 'border-green-500';
                icon = <CheckCircle className="text-green-600" />;
              } else if (index === selectedAnswer) {
                bgColor = 'bg-red-100';
                borderColor = 'border-red-500';
                icon = <XCircle className="text-red-600" />;
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-lg border-2 ${borderColor} ${bgColor} text-left transition-all transform hover:scale-102 disabled:cursor-not-allowed flex items-center justify-between`}
              >
                <span className="font-medium">{option}</span>
                {icon}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded animate-fadeIn">
            <p className="text-sm text-gray-700">
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
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg"
          >
            {currentQuestion < quizQuestions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizGame;
