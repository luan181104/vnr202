import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: 'north' | 'south' | 'both';
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '7/1954',
    title: 'Hiệp định Giơnevơ',
    description: 'Đất nước tạm thời chia cắt thành hai miền. Miền Bắc hoàn toàn giải phóng, miền Nam dưới ách Mỹ-Diệm.',
    category: 'both'
  },
  {
    year: '1954-1957',
    title: 'Khôi phục kinh tế miền Bắc',
    description: 'Khôi phục công nghiệp, nông nghiệp, giao thông. Đến 1957 sản lượng vượt mức trước chiến tranh.',
    category: 'north'
  },
  {
    year: '1954-1959',
    title: 'Đấu tranh chính trị miền Nam',
    description: 'Chống luật 10/59, chống "tố cộng - diệt cộng". Bảo vệ cơ sở cách mạng.',
    category: 'south'
  },
  {
    year: '1958-1960',
    title: 'Cải tạo XHCN miền Bắc',
    description: 'Hợp tác hóa nông nghiệp, cải tạo công thương nghiệp. Xây dựng HTX.',
    category: 'north'
  },
  {
    year: '1959-1960',
    title: 'Phong trào Đồng Khởi',
    description: 'Bùng nổ ở Bến Tre, lan toàn miền Nam. Chuyển từ đấu tranh chính trị sang kết hợp chính trị-vũ trang.',
    category: 'south'
  },
  {
    year: '9/1960',
    title: 'Đại hội Đảng lần III',
    description: 'Xác định hai nhiệm vụ chiến lược: Cách mạng XHCN ở miền Bắc và CMDN ở miền Nam.',
    category: 'both'
  },
  {
    year: '12/1960',
    title: 'Thành lập Mặt trận Dân tộc Giải phóng',
    description: 'Tập hợp mọi tầng lớp chống Mỹ-Diệm. Xây dựng "ba vùng chiến lược".',
    category: 'south'
  },
  {
    year: '1961-1965',
    title: 'Kế hoạch 5 năm lần 1 miền Bắc',
    description: 'Xây dựng công nghiệp nặng: gang thép Thái Nguyên, điện Uông Bí. Tăng cường quốc phòng.',
    category: 'north'
  },
  {
    year: '1961-1965',
    title: 'Đánh bại "Chiến tranh đặc biệt"',
    description: 'Các trận: Ấp Bắc (1963), Bình Giã (1964), Ba Gia (1965). Làm phá sản chiến lược Mỹ.',
    category: 'south'
  },
  {
    year: '1965',
    title: 'Mỹ đưa quân viễn chinh',
    description: 'Chuyển sang "chiến tranh cục bộ". Miền Bắc "vừa chiến đấu, vừa sản xuất".',
    category: 'both'
  },
  {
    year: '1965-1968',
    title: 'Đánh bại "Chiến tranh cục bộ"',
    description: 'Trận Vạn Tường, Plây Me-Ia Drang. Đỉnh cao: Tổng tiến công Tết Mậu Thân 1968.',
    category: 'south'
  },
  {
    year: '1968',
    title: 'Tổng tiến công Tết Mậu Thân',
    description: 'Làm lung lay ý chí xâm lược của Mỹ, gây chấn động dư luận quốc tế.',
    category: 'south'
  },
  {
    year: '1969-1973',
    title: 'Đánh bại "Việt Nam hóa"',
    description: 'Mỹ rút quân, tăng cường VNCH. Ta phản công: Đường 9-Nam Lào (1971).',
    category: 'south'
  },
  {
    year: '12/1972',
    title: 'Điện Biên Phủ trên không',
    description: 'Chiến thắng vang dội, bắn rơi hàng trăm máy bay B-52 của Mỹ.',
    category: 'north'
  },
  {
    year: '1/1973',
    title: 'Hiệp định Paris',
    description: 'Mỹ rút quân hoàn toàn, tạo bước ngoặt quyết định cho cách mạng.',
    category: 'both'
  },
  {
    year: '3/1975',
    title: 'Giải phóng Tây Nguyên',
    description: 'Mở màn chiến dịch Hồ Chí Minh. Giải phóng Buôn Ma Thuột.',
    category: 'south'
  },
  {
    year: '3/1975',
    title: 'Giải phóng Huế - Đà Nẵng',
    description: 'Tiến công nhanh, giải phóng miền Trung trong thời gian ngắn.',
    category: 'south'
  },
  {
    year: '30/4/1975',
    title: 'Giải phóng hoàn toàn miền Nam',
    description: 'Chiến dịch Hồ Chí Minh thắng lợi. Giải phóng Sài Gòn, thống nhất đất nước.',
    category: 'both'
  }
];

function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'north': return 'bg-blue-500';
      case 'south': return 'bg-green-500';
      case 'both': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'north': return 'Miền Bắc';
      case 'south': return 'Miền Nam';
      case 'both': return 'Cả nước';
      default: return '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-red-700 flex items-center">
          <Calendar className="mr-2" />
          Timeline lịch sử 1954-1975
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-all"
          >
            <ChevronLeft className="text-red-600" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-all"
          >
            <ChevronRight className="text-red-600" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <span>Miền Bắc</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span>Miền Nam</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-600 rounded-full mr-2"></div>
            <span>Cả nước</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto pb-6 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex space-x-8 min-w-max px-4 pt-3">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                onClick={() => setSelectedEvent(event)}
                className="flex flex-col items-center cursor-pointer transform transition-all hover:scale-110"
              >
                <div className={`w-4 h-4 ${getCategoryColor(event.category)} rounded-full mb-2 animate-pulse-slow`}></div>
                <div className="w-1 h-20 bg-gray-300"></div>
                <div className="w-32 bg-gray-50 rounded-lg p-3 shadow-md hover:shadow-xl transition-all border-2 border-gray-200 hover:border-red-400">
                  <p className="text-xs font-bold text-red-600 mb-1">{event.year}</p>
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2">{event.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600"></div>
      </div>

      {selectedEvent && (
        <div className="mt-8 bg-gradient-to-r from-red-50 to-yellow-50 rounded-lg p-6 border-l-4 border-red-600 animate-fadeIn">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold mb-2 ${getCategoryColor(selectedEvent.category)}`}>
                {getCategoryLabel(selectedEvent.category)}
              </span>
              <h4 className="text-xl font-bold text-red-700">{selectedEvent.title}</h4>
              <p className="text-sm text-red-600 font-semibold">{selectedEvent.year}</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
        </div>
      )}
    </div>
  );
}

export default Timeline;
