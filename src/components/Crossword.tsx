import { useRef, useState } from 'react';
import { Lightbulb, CheckCircle, AlertCircle } from 'lucide-react';

interface CrosswordClue {
  clue: string;
  answer: string;
  goldenLetterIndex: number;
}

const crosswordClues: CrosswordClue[] = [
  {
    clue: '______ chia cắt đất nước thành hai miền',
    answer: 'VklUVVlFTjE3',
    goldenLetterIndex: 2  
  },
  {
    clue: 'Phong trào ______ 1960 bùng nổ ở Bến Tre',
    answer: 'RE9OR0tIT0k=',
    goldenLetterIndex: 5,
  },
  {
    clue: '______ Đảng lần III xác định đường lối cách mạng hai miền',
    answer: 'REFJSE9J',
    goldenLetterIndex: 4,
  },
  {
    clue: '______ Dân tộc Giải phóng miền Nam thành lập 12/1960',
    answer: 'TUFUVFJBTg==',
    goldenLetterIndex: 6,
  },
  {
    clue: ' Hiệp  định ______ chia cắt đất nước tại vĩ tuyến 17 năm 1954',
    answer: 'R0lPTkVWTw==',
    goldenLetterIndex: 0,
  },
  {
    clue: 'Tết ______ 1968 - tổng tiến công làm lung lay ý chí Mỹ',
    answer: 'TUFVVEhBTg==',
    goldenLetterIndex: 6,
  },
  {
    clue: '______ miền Bắc bắn rơi hàng trăm máy bay B-52',
    answer: 'UEhPTkdLSE9ORw==',
    goldenLetterIndex: 1,
  },
  {
    clue: 'Hiệp định ______ 1973 buộc Mỹ rút quân khỏi Việt Nam',
    answer: 'UEFSSVM=',
    goldenLetterIndex: 1,
  },
  {
    clue: 'Chiến dịch______1975 mở màn Chiến dịch Hồ Chí Minh',
    answer: 'VEFZTkdVWUVO',
    goldenLetterIndex: 0,
  },
  {
    clue: '______ ra đời ngày 3/2/1930',
    answer: 'REFOR0NPTkdTQU5WSUVUTkFN',
    goldenLetterIndex: 0,
  },
  {
    clue: '______ khởi xướng đường lối đổi mới năm 1986',
    answer: 'REFJSE9JNg==',
    goldenLetterIndex: 1,
  },
  {
    clue: ' Ngày 18/8/1965, trên đất ______ đã diễn ra trận đánh diệt Mỹ quy mô lớn đầu tiên của quân và dân miền Nam.',
    answer: 'VkFOVFVPTkc=',
    goldenLetterIndex: 3,
  },
  {
    clue: 'Khu vực được dựng lên để gom dân, cô lập cơ sở cách mạng gọi là ______',
    answer: 'QVBDSElFTkxVT0M=',
    goldenLetterIndex: 6,
  },
  {
    clue: 'Xe tăng T-54 mang số hiệu 843 do ______ điều khiển đã húc đổ cổng Dinh Độc Lập',
    answer: 'QlVJUVVBTkdUSEFO',
    goldenLetterIndex: 1,
  },
  {
    clue: 'Nhà máy nhiệt điện lớn của Quảng Ninh, một trong những biểu tượng của công nghiệp nặng miền Bắc thời chống Mỹ?',
    answer: 'VU9OR0JJ',
    goldenLetterIndex: 1,
  },
  {
    clue: 'Chiến lược quân sự của Mỹ nhằm "tìm diệt" lực lượng cách mạng, đẩy mạnh bình định miền Nam, thực hiện từ 1965 đến 1968.',
    answer: 'Q0hJRU5UUkFOSENVQ0JP',
    goldenLetterIndex: 10,
  }
];


function Crossword() {
  const [answers, setAnswers] = useState<string[]>(new Array(crosswordClues.length).fill(''));
  const [selectedClue, setSelectedClue] = useState<number | null>(null);
  const [hints, setHints] = useState<boolean[]>(new Array(crosswordClues.length).fill(false));
  const [submitted, setSubmitted] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[][]>(
  crosswordClues.map(clue => new Array(clue.answer.length).fill(null))
  );
  const decode = (str: string) => atob(str);



  // const handleInputChange = (index: number, value: string) => {
  //   const newAnswers = [...answers];
  //   newAnswers[index] = value.toUpperCase().replace(/[^A-Z0-9ÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ]/g, '');
  //   setAnswers(newAnswers);
  // };

  const toggleHint = (index: number) => {
    const newHints = [...hints];
    newHints[index] = !newHints[index];
    setHints(newHints);
  };

  // const getVerticalWord = () => {
  //   return crosswordClues
  //     .map((clue, index) => {
  //       const answer = answers[index];
  //       if (answer.length > clue.goldenLetterIndex) {
  //         return answer[clue.goldenLetterIndex];
  //       }
  //       return '';
  //     })
  //     .join('');
  // };

  const checkAnswer = (index: number) => {
  return answers[index] === decode(crosswordClues[index].answer);
};


  // const allCorrect = crosswordClues.every((_, index) => checkAnswer(index));

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const resetGame = () => {
    setAnswers(new Array(crosswordClues.length).fill(''));
    setSubmitted(false);
    setSelectedClue(null);
    setHints(new Array(crosswordClues.length).fill(false));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-red-700 mb-4">Trò chơi Ô chữ lịch sử</h2>
        <p className="text-gray-600">Điền đáp án cho 16 hàng ngang. 16 ô vàng tạo thành từ khóa cuối cùng!</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="space-y-4">
              {crosswordClues.map((clue, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedClue(index)}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer transform hover:scale-102 ${
                    selectedClue === index
                      ? 'border-red-600 bg-red-50 shadow-lg'
                      : submitted && checkAnswer(index)
                      ? 'border-green-500 bg-green-50'
                      : submitted
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 hover:border-red-400'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="font-bold text-red-700 mb-1">
                        Hàng {index + 1}: {clue.clue}
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        ({decode(clue.answer).length} chữ)
                      </div>
                    </div>
                    {submitted && (
                      <div className="ml-2">
                        {checkAnswer(index) ? (
                          <CheckCircle className="text-green-600" size={24} />
                        ) : (
                          <AlertCircle className="text-red-600" size={24} />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 items-end">
                    <div className="flex gap-1">
                      {Array.from(decode(clue.answer)).map((letter, pos) => {
                        const isGolden = pos === clue.goldenLetterIndex;

                        return (
                          <input
                            key={pos}
                            type="text"
                            maxLength={1}
                            ref={(el) => (inputRefs.current[index][pos] = el)}
                            value={answers[index][pos] || ''}
                            onChange={(e) => {
                              const newAnswers = [...answers];
                              const arr = newAnswers[index].split('');
                              arr[pos] = e.target.value.toUpperCase();
                              newAnswers[index] = arr.join('');
                              setAnswers(newAnswers);

                              // Auto-focus ô tiếp theo
                              if (e.target.value && pos < clue.answer.length - 1) {
                                inputRefs.current[index][pos + 1]?.focus();
                              }
                              
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Backspace' && !answers[index][pos] && pos > 0) {
                                inputRefs.current[index][pos - 1]?.focus();
                              }
                            }}

                            className={`w-8 h-8 text-center border-2 rounded font-bold uppercase transition-all ${
                              isGolden ? 'bg-yellow-500 text-white border-yellow-600' : 'bg-gray-100 text-gray-800 border-gray-300'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>

                    {/* {hints[index] && (
                        <div className="mt-3 pt-3 border-t-2 border-yellow-300">
                            <img
                            src={clue.hintImage}
                            alt="Gợi ý hình ảnh"
                            className="w-full h-48 object-cover rounded-lg shadow-md cursor-zoom-in"
                            onClick={() => setModalImage(clue.hintImage)}
                            />
                        </div>
                    )} */}


                  {/* {submitted && !checkAnswer(index) && (
                    <div className="mt-3 pt-3 border-t-2 border-red-300 text-sm text-red-700 font-semibold">
                      Đáp án đúng: {decode(clue.answer)}
                    </div>
                  )} */}

                  {/* {answers[index] && (
                    <div className="mt-2 flex justify-between text-xs">
                      {Array.from(clue.answer).map((letter, pos) => {
                        const isGolden = pos === clue.goldenLetterIndex;

                        // Khi chưa bấm nộp -> không hiển thị đúng/sai
                        if (!submitted) {
                            return (
                            <div
                                key={pos}
                                className={`w-6 h-6 flex items-center justify-center rounded font-bold text-white ${
                                isGolden ? 'bg-yellow-500' : 'bg-gray-300'
                                }`}
                            >
                                {answers[index][pos] || ''}
                            </div>
                            );
                        }

                        // Khi đã nộp -> hiện đúng (xanh) sai (đỏ)
                        return (
                            <div
                            key={pos}
                            className={`w-6 h-6 flex items-center justify-center rounded font-bold text-white ${
                                isGolden
                                ? 'bg-yellow-500'
                                : answers[index][pos] === letter
                                ? 'bg-green-500'
                                : 'bg-red-500'
                            }`}
                            >
                            {answers[index][pos] || ''}
                            </div>
                        );
                        })}

                    </div>
                  )} */}
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={handleSubmit}
                disabled={answers.some(a => a === '')}
                className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 ${
                  answers.some(a => a === '')
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : submitted
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {submitted ? 'Kiểm tra lại' : 'Kiểm tra đáp án'}
              </button>
              {submitted && (
                <button
                  onClick={resetGame}
                  className="flex-1 px-6 py-3 rounded-lg font-bold bg-gray-600 hover:bg-gray-700 text-white transition-all transform hover:scale-105"
                >
                  Chơi lại
                </button>
              )}
            </div>
          </div>
        </div>

        {/* <div>
          <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24">
            <h3 className="font-bold text-lg text-red-700 mb-4">Từ khóa dọc</h3>
            <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-lg p-4 border-2 border-yellow-400">
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 flex items-center justify-center rounded font-bold text-sm ${
                      getVerticalWord()[i]
                        ? 'bg-yellow-500 text-white shadow-lg'
                        : 'bg-yellow-200 text-gray-400 border-2 border-dashed border-yellow-400'
                    }`}
                  >
                    {getVerticalWord()[i] || '?'}
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-600 text-sm font-semibold">
                {getVerticalWord().length === 16 && !getVerticalWord().includes('')
                  ? getVerticalWord()
                  : 'Chưa hoàn thành...'}
              </p>
            </div>

            <div className="mt-6">
              <h4 className="font-bold text-red-700 mb-3">Tiến độ</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Hàng đã điền:</span>
                  <span className="font-bold text-blue-600">
                    {answers.filter(a => a).length}/16
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Hàng đúng:</span>
                  <span className="font-bold text-green-600">
                    {submitted ? crosswordClues.filter((_, i) => checkAnswer(i)).length : '-'}/16
                  </span>
                </div>
              </div>
              <div className="mt-4 bg-gray-200 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    allCorrect && submitted ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{
                    width: submitted
                      ? `${(crosswordClues.filter((_, i) => checkAnswer(i)).length / 16) * 100}%`
                      : `${(answers.filter(a => a).length / 16) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            {allCorrect && submitted && (
              <div className="mt-6 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-500 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">Xuất sắc!</div>
                <p className="text-sm text-green-700">
                  Bạn đã giải quyết thành công trò chơi ô chữ!
                </p>
              </div>
            )}
          </div>
        </div> */}
      </div>

      <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
        <h4 className="font-bold text-blue-700 mb-3">Hướng dẫn chơi:</h4>
        <ul className="text-sm text-blue-700 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">1.</span>
            <span>Đọc gợi ý cho mỗi hàng ngang</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">2.</span>
            <span>Nhập đáp án vào ô trắng</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">3.</span>
            <span>Nhấp nút vàng để xem hình ảnh gợi ý</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">4.</span>
            <span>16 ô vàng tạo thành từ khóa cuối cùng</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">5.</span>
            <span>Nhấp "Kiểm tra đáp án" khi hoàn thành</span>
          </li>
        </ul>
      </div>
      {modalImage && (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={() => setModalImage(null)}
        >
            <img
            src={modalImage}
            alt="Zoomed hint"
            className="max-w-full max-h-full rounded-lg shadow-lg"
            />
        </div>
        )}

    </div>
    
  );
}

export default Crossword;
