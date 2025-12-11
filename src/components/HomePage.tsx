import { BookOpen, GamepadIcon, ImageIcon, ArrowRight, Puzzle } from 'lucide-react';

interface HomePageProps {
  onNavigate: (section: 'home' | 'content' | 'quiz' | 'gallery' | 'crossword') => void;
}

function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12 animate-fadeIn">
        <div className="mb-6">
          <div className="w-32 h-24 bg-gradient-to-br from-red-600 to-red-700 rounded-none mx-auto flex items-center justify-center shadow-2xl animate-pulse-slow">
            <span className="text-yellow-400 text-5xl">★</span>
          </div>

        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-red-700 mb-4">
          Sự Lãnh Đạo Của Đảng
        </h1>
        <p className="text-2xl text-red-600 mb-2">1954 - 1975</p>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Khám phá hành trình vẻ vang của dân tộc Việt Nam dưới sự lãnh đạo của Đảng Cộng sản,
          từ Hiệp định Giơnevơ đến ngày giải phóng hoàn toàn miền Nam, thống nhất đất nước
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div
          onClick={() => onNavigate('content')}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer animate-slideInLeft border-t-4 border-red-600"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <BookOpen size={32} className="text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-red-700 mb-2 text-center">Nội dung lịch sử</h3>
          <p className="text-gray-600 text-center mb-4">
            Timeline tương tác, bản đồ chia miền và các sự kiện quan trọng
          </p>
          <div className="flex justify-center">
            <ArrowRight className="text-red-600" />
          </div>
        </div>

        {/* <div
          onClick={() => onNavigate('quiz')}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer animate-fadeIn border-t-4 border-yellow-500"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <GamepadIcon size={32} className="text-yellow-600" />
          </div>
          <h3 className="text-xl font-bold text-red-700 mb-2 text-center">Trắc nghiệm</h3>
          <p className="text-gray-600 text-center mb-4">
            Kiểm tra kiến thức của bạn với quiz có tính giờ và chấm điểm
          </p>
          <div className="flex justify-center">
            <ArrowRight className="text-yellow-600" />
          </div>
        </div> */}

        <div
          onClick={() => onNavigate('crossword')}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer animate-fadeIn border-t-4 border-blue-600"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Puzzle size={32} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-blue-700 mb-2 text-center">Ô chữ</h3>
          <p className="text-gray-600 text-center mb-4">
            Trò chơi ô chữ tương tác, tìm chữ vàng và câu trả lời ẩn
          </p>
          <div className="flex justify-center">
            <ArrowRight className="text-blue-600" />
          </div>
        </div>


        <div
          onClick={() => onNavigate('gallery')}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer animate-slideInRight border-t-4 border-amber-600"
        >
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <ImageIcon size={32} className="text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-red-700 mb-2 text-center">Thư viện ảnh</h3>
          <p className="text-gray-600 text-center mb-4">
            Bộ sưu tập hình ảnh và tài liệu lịch sử quý giá
          </p>
          <div className="flex justify-center">
            <ArrowRight className="text-amber-600" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-700 to-red-600 rounded-xl shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Bối cảnh lịch sử</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm leading-relaxed">
          <div className="bg-red-800 bg-opacity-50 rounded-lg p-4">
            <h3 className="font-bold mb-2 text-yellow-300">Sau Hiệp định Giơnevơ (1954)</h3>
            <ul className="space-y-1 text-red-50">
              <li>• Đất nước tạm thời chia cắt hai miền</li>
              <li>• Miền Bắc: hoàn toàn giải phóng</li>
              <li>• Miền Nam: dưới ách Mỹ - Diệm</li>
              <li>• Mục tiêu: thống nhất đất nước</li>
            </ul>
          </div>
          <div className="bg-red-800 bg-opacity-50 rounded-lg p-4">
            <h3 className="font-bold mb-2 text-yellow-300">Đường lối của Đảng</h3>
            <ul className="space-y-1 text-red-50">
              <li>• Một Đảng lãnh đạo</li>
              <li>• Hai chiến lược cách mạng</li>
              <li>• Miền Bắc: xây dựng CNXH</li>
              <li>• Miền Nam: giải phóng dân tộc</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
