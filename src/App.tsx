import { useState, useEffect } from 'react';
import { Home, BookOpen, ImageIcon, Volume2, VolumeX, Puzzle, GamepadIcon } from 'lucide-react';
import ContentSection from './components/ContentSection';
import Gallery from './components/Gallery';
import HomePage from './components/HomePage';
import QuizLobby from './components/QuizLobby';
import Crossword from './components/Crossword';

function App() {
  const [currentSection, setCurrentSection] = useState<'home' | 'content' | 'quiz' | 'gallery' | 'crossword'>('home');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    document.title = 'Sự Lãnh Đạo Của Đảng (1954-1975)';
  }, []);

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-yellow-50">
      <nav className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <span className="text-yellow-400 text-xl font-bold">★</span>
              </div>
              <h1 className="text-xl font-bold hidden sm:block">Lịch sử Đảng Cộng sản Việt Nam</h1>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => setCurrentSection('home')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all transform hover:scale-105 ${
                  currentSection === 'home' ? 'bg-red-800 shadow-lg' : 'hover:bg-red-600'
                }`}
              >
                <Home size={18} />
                <span className="hidden sm:inline">Trang chủ</span>
              </button>

              <button
                onClick={() => setCurrentSection('content')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all transform hover:scale-105 ${
                  currentSection === 'content' ? 'bg-red-800 shadow-lg' : 'hover:bg-red-600'
                }`}
              >
                <BookOpen size={18} />
                <span className="hidden sm:inline">Nội dung</span>
              </button>

              <button
                onClick={() => setCurrentSection('quiz')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all transform hover:scale-105 ${
                  currentSection === 'quiz' ? 'bg-red-800 shadow-lg' : 'hover:bg-red-600'
                }`}
              >
                <GamepadIcon size={18} />
                <span className="hidden sm:inline">Trắc nghiệm</span>
              </button>

              <button
                onClick={() => setCurrentSection('crossword')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all transform hover:scale-105 ${
                  currentSection === 'crossword' ? 'bg-red-800 shadow-lg' : 'hover:bg-red-600'
                }`}
              >
                <Puzzle size={18} />
                <span className="hidden sm:inline">Ô chữ</span>
              </button>

              <button
                onClick={() => setCurrentSection('gallery')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all transform hover:scale-105 ${
                  currentSection === 'gallery' ? 'bg-red-800 shadow-lg' : 'hover:bg-red-600'
                }`}
              >
                <ImageIcon size={18} />
                <span className="hidden sm:inline">Thư viện</span>
              </button>

              <button
                onClick={toggleMusic}
                className="ml-2 px-3 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 transition-all transform hover:scale-105 text-red-700"
                title={isMusicPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
              >
                {isMusicPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="animate-fadeIn">
          {currentSection === 'home' && <HomePage onNavigate={setCurrentSection} />}
          {currentSection === 'content' && <ContentSection />}
          {currentSection === 'quiz' && <QuizLobby />}
          {currentSection === 'gallery' && <Gallery />}
          {currentSection === 'crossword' && (<Crossword />)}
        </div>
      </main>

      <footer className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>Nhóm 4</p>
          <p className="font-semibold">Sản phẩm sáng tạo môn Lịch sử Đảng Cộng sản Việt Nam</p>
          <p className="text-sm mt-2 text-red-100">Giai đoạn 1954-1975: Từ Hiệp định Giơnevơ đến Đại thắng mùa Xuân</p>
        </div>
      </footer>

      {isMusicPlaying && (
        <audio autoPlay loop className="hidden">
          <source src="/assets/nhucobachotrongngayvuidaithang.mp3" type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
}

export default App;
