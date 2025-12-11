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
    description:
     'Ngày **21/7/1954** ký **Hiệp định Giơnevơ**, chấm dứt chiến tranh Đông Dương. Việt Nam tạm chia cắt theo **vĩ tuyến 17**. **Miền Bắc** được hoàn toàn giải phóng, bắt đầu xây dựng **hậu phương XHCN**. **Miền Nam** rơi vào tay **Mỹ – Diệm**, chính quyền **gia đình trị** được thiết lập, phá hoại **tổng tuyển cử 1956** và thực thi "**tố cộng – diệt cộng**", biến miền Nam thành **thuộc địa kiểu mới** và căn cứ quân sự. **Ý nghĩa:** Mở ra thời kỳ mới của cách mạng Việt Nam – một Đảng, hai chiến lược cách mạng khác nhau ở hai miền nhưng cùng hướng tới mục tiêu **thống nhất đất nước**.'
,
    category: 'both'
  },
  {
    year: '1954-1957',
    title: 'Khôi phục kinh tế miền Bắc',
    description:
      'Miền Bắc tập trung **hàn gắn hậu quả chiến tranh**, khôi phục **công – nông nghiệp**, giao thông, hạ tầng. Năm **1957**, sản lượng nông nghiệp vượt mức trước chiến tranh, công nghiệp nhẹ và thủ công nghiệp hồi phục nhanh, hệ thống giao thông được khôi phục từng bước. **Ý nghĩa lịch sử:** Đây là nền tảng quan trọng giúp miền Bắc dần ổn định, tạo tiền đề xây dựng **hậu phương lớn** cho cả nước trong cuộc kháng chiến chống Mỹ.',
    category: 'north'
  },
  {
    year: '1954-1959',
    title: 'Đấu tranh chính trị miền Nam',
    description:
      'Nhân dân miền Nam kiên quyết chống lại chính sách **khủng bố của Mỹ – Diệm**: **Luật 10/59** đặt cộng sản ngoài vòng pháp luật, các chiến dịch tiêu diệt cơ sở cách mạng tàn bạo. Nhiều phong trào biểu tình, đấu tranh của **học sinh – sinh viên**, **Phật giáo**, **trí thức**, nhân sĩ yêu nước nổ ra mạnh mẽ. **Ý nghĩa:** Bảo vệ và giữ vững lực lượng cách mạng trong điều kiện vô cùng khốc liệt, tạo nền tảng cho các cuộc đấu tranh mạnh mẽ hơn sau này.',
    category: 'south'
  },
  {
    year: '1958-1960',
    title: 'Cải tạo XHCN miền Bắc',
    description:
      'Thực hiện **hợp tác hóa nông nghiệp**, thành lập **hợp tác xã**; cải tạo **công thương nghiệp tư bản tư doanh**; xây dựng **quan hệ sản xuất mới** theo định hướng XHCN. Đến 1960, **85%** hộ nông dân tham gia hợp tác xã. **Ý nghĩa lịch sử:** Xây dựng cơ sở vật chất và quan hệ sản xuất XHCN, tạo nền tảng chi viện miền Nam.',
    category: 'north'
  },
  {
    year: '1959-1960',
    title: 'Phong trào Đồng Khởi',
    description:
      'Nổ ra đầu tiên tại **Bến Tre (1/1960)**, lan nhanh ra toàn Nam Bộ. Hình thức đấu tranh chuyển từ **chính trị → kết hợp vũ trang**, làm sụp đổ bộ máy Mỹ – Diệm ở nhiều vùng nông thôn. **Ý nghĩa:** Bước ngoặt lớn, mở đường cho thành lập **Mặt trận Dân tộc Giải phóng Miền Nam** và đấu tranh vũ trang toàn diện.',
    category: 'south'
  },
  {
    year: '9/1960',
    title: 'Đại hội Đảng lần III',
    description:
      'Đại hội xác định **hai nhiệm vụ chiến lược**: cách mạng **XHCN ở miền Bắc** (quyết định nhất) và **cách mạng dân tộc dân chủ ở miền Nam** (quyết định trực tiếp). **Ý nghĩa:** Mốc quan trọng nhất thời kỳ 1954–1965, thống nhất đường lối cho toàn quốc.',
    category: 'both'
  },
  {
    year: '12/1960',
    title: 'Thành lập Mặt trận Dân tộc Giải phóng Miền Nam',
    description:
      'Ngày 20/12/1960 thành lập **Mặt trận Dân tộc Giải phóng Miền Nam**, tập hợp mọi lực lượng yêu nước chống Mỹ-Diệm, xây dựng tổ chức chính trị và quân sự mạnh mẽ ở ba vùng chiến lược: rừng núi, nông thôn, đô thị. **Ý nghĩa:** Tạo khối **đoàn kết dân tộc rộng rãi**, xây dựng lực lượng chính trị – quân sự mạnh mẽ.',
    category: 'south'
  },
  {
    year: '1961-1965',
    title: 'Kế hoạch 5 năm lần thứ nhất – Miền Bắc',
    description:
      'Xây dựng cơ sở vật chất XHCN. Các công trình trọng điểm hoàn thành: **Gang thép Thái Nguyên**, **Điện Uông Bí**, **Cơ khí Hà Nội**… Giáo dục, y tế, văn hóa phát triển mạnh; quốc phòng – an ninh được tăng cường. Mở rộng **đường Trường Sơn** chi viện miền Nam. **Ý nghĩa:** Miền Bắc trở thành **hậu phương vững chắc** cả về kinh tế, chính trị, văn hóa và quân sự, đủ sức chi viện lâu dài và toàn diện cho chiến trường miền Nam.',
    category: 'north'
  },
  {
    year: '1961-1965',
    title: 'Đánh bại "Chiến tranh đặc biệt"',
    description:
      'Mỹ – Diệm triển khai chiến lược dồn dân lập **ấp chiến lược**, tăng cường quân đội Ngụy, cố vấn Mỹ trực tiếp chỉ huy. Nhân dân miền Nam giành thắng lợi lớn ở **Ấp Bắc (1963)**, **Bình Giã (1964)**, **Ba Gia (1965)**, **Đồng Xoài (1965)**. **Ý nghĩa:** Làm phá sản hoàn toàn chiến lược **Chiến tranh đặc biệt**, buộc Mỹ chuyển sang **Chiến tranh cục bộ**.',
    category: 'south'
  },
  {
    year: '1965',
    title: 'Mỹ đưa quân viễn chinh – Chiến tranh cục bộ',
    description:
      'Mỹ đổ **quân viễn chinh** ồ ạt vào miền Nam, mở rộng chiến tranh phá hoại miền Bắc, huy động hỏa lực mạnh nhất thời bấy giờ. Hội nghị Trung ương 11–12 (1965) quyết tâm: “**Đánh thắng giặc Mỹ trong mọi tình huống**”. Miền Bắc thực hiện **"vừa sản xuất, vừa chiến đấu"**. **Ý nghĩa:** Cuộc kháng chiến bước vào giai đoạn **khốc liệt nhất**, cả nước huy động tối đa sức người, sức của cho mặt trận.',
    category: 'both'
  },
  {
    year: '1965-1968',
    title: 'Đánh bại "Chiến tranh cục bộ"',
    description:
      'Miền Bắc xây dựng hệ thống phòng không nhân dân, đánh bại chiến tranh phá hoại lần thứ nhất, duy trì sản xuất, chi viện tối đa cho miền Nam. Miền Nam giành chiến thắng **Vạn Tường (1965)– trận đầu thắng Mỹ; Plây Me – Ia Drang chiến dịch mùa khô 1966–67 **. Đỉnh cao: **Tổng tiến công Tết Mậu Thân (1968)**. **Ý nghĩa:** Làm lung lay mạnh ý chí xâm lược của Mỹ, tác động mạnh đến dư luận thế giới, tạo bước ngoặt quan trọng trong cuộc kháng chiến.',
    category: 'south'
  },
  {
    year: '1968',
    title: 'Tổng tiến công Tết Mậu Thân',
    description:
      'Tấn công đồng loạt **41 đô thị** miền Nam, từ Sài Gòn đến các tỉnh lỵ, thị xã. Chiến dịch gây chấn động toàn cầu. Mỹ buộc tuyên bố “**phi Mỹ hóa chiến tranh**”. **Ý nghĩa:** Bước ngoặt chiến lược, kết hợp **quân sự – chính trị – ngoại giao**, tạo tiền đề thắng lợi cuối cùng.',
    category: 'south'
  },
  {
    year: '1969-1973',
    title: 'Đánh bại "Việt Nam hóa chiến tranh"',
    description:
      'Mỹ rút dần quân viễn chinh nhưng tăng cường hỏa lực, dựa vào quân đội Sài Gòn. Ta thắng lớn tại **Đường 9 – Nam Lào (1971)**, **Campuchia (1971)**. **Ý nghĩa:** Làm phá sản chiến lược **Việt Nam hóa chiến tranh**, chuẩn bị cho tổng tiến công.',
    category: 'south'
  },
  {
    year: '12/1972',
    title: 'Điện Biên Phủ trên không',
    description:
      '**12 ngày đêm (18–29/12)** chiến đấu ác liệt, quân và dân miền Bắc bắn rơi nhiều máy bay Mỹ trong đó có hàng chục chiếc **B-52**, buộc Mỹ phải ngừng ném bom và ký **Hiệp định Paris**. **Ý nghĩa:** Chiến thắng vang dội, thể hiện sức mạnh phòng không của nhân dân Việt Nam, buộc Mỹ phải rút quân hoàn toàn khỏi Việt Nam, mở đường cho giải phóng miền Nam.',
    category: 'north'
  },
  {
    year: '1/1973',
    title: 'Hiệp định Paris',
    description:
      'Ngày 27/1/1973, **Hiệp định Paris** về chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam được ký kết. Mỹ cam kết rút hoàn toàn quân viễn chinh và cố vấn quân sự khỏi miền Nam. Chính quyền Sài Gòn suy yếu nghiêm trọng cả về quân sự, chính trị và tinh thần. **Ý nghĩa:** Tạo bước ngoặt quan trọng, mở đường cho cách mạng miền Nam tiến tới **giải phóng hoàn toàn** trong thời gian sớm nhất.',
    category: 'both'
  },
  {
    year: '3/1975',
    title: 'Giải phóng Tây Nguyên',
    description:
      'Tháng 3/1975, chiến dịch giải phóng Tây Nguyên thắng lợi vang dội, mở màn bằng chiến thắng **Buôn Ma Thuột**. Làm tan rã phòng tuyến chiến lược của địch, quân Sài Gòn mất hơn 1/3 lực lượng, tinh thần suy sụp. **Ý nghĩa:** Mở toang chiến trường, tạo thế cho tổng tiến công.',
    category: 'south'
  },
  {
    year: '3/1975',
    title: 'Giải phóng Huế – Đà Nẵng',
    description:
      'Ta áp dụng phương châm **đánh nhanh – thọc sâu**, chia cắt và làm tan rã toàn bộ tuyến phòng thủ của địch ở miền Trung. Chỉ trong vài ngày, ta giải phóng **Huế (26/3)**, **Đà Nẵng (29/3)**, làm sụp đổ toàn bộ quân khu I của chính quyền Sài Gòn, buộc địch rút chạy hỗn loạn. **Ý nghĩa:** Làm tan rã quân khu I, mở đường trực tiếp cho **Chiến dịch Hồ Chí Minh**.',
    category: 'south'
  },
  {
    year: '30/4/1975',
    title: 'Giải phóng hoàn toàn miền Nam',
    description:
      '**Chiến dịch Hồ Chí Minh** toàn thắng. Giải phóng miền Nam. **Thống nhất đất nước**, kết thúc nghìn năm chống ngoại xâm.',
    category: 'both'
  }
];


function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const formatText = (text: string) => {
  return text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
};


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
    <div className="bg-white rounded-xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6 mt-6">
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
<p
  className="text-gray-700 leading-relaxed"
  dangerouslySetInnerHTML={{ __html: formatText(selectedEvent.description) }}
></p>

        </div>
      )}

      <div className="mt-12 bg-gradient-to-r from-red-700 to-red-600 rounded-xl shadow-xl p-8 text-white">
  <h2 className="text-2xl font-bold mb-4 text-center">Ý nghĩa lịch sử và kinh nghiệm lãnh đạo của Đảng</h2>

  <div className="grid md:grid-cols-2 gap-6 text-sm leading-relaxed">

    {/* Ý nghĩa lịch sử */}
    <div className="bg-red-800 bg-opacity-50 rounded-lg p-4">
      <h3 className="font-bold mb-2 text-yellow-300">Ý nghĩa lịch sử (1954–1975)</h3>
      <ul className="space-y-1 text-red-50">
        <li>• Giải phóng hoàn toàn miền Nam, thống nhất đất nước, chấm dứt hơn một thế kỷ chống ngoại xâm.</li>
        <li>• Mở ra kỷ nguyên mới: cả nước hòa bình, thống nhất, cùng đi lên CNXH.</li>
        <li>• Tăng cường thế và lực của cách mạng Việt Nam; nâng cao uy tín quốc tế.</li>
        <li>• Cổ vũ phong trào giải phóng dân tộc và phong trào hòa bình trên thế giới.</li>
        <li>• Đánh bại chiến lược thực dân mới lớn nhất của Mỹ sau Thế chiến II.</li>
      </ul>
    </div>

    {/* Kinh nghiệm lãnh đạo */}
    <div className="bg-red-800 bg-opacity-50 rounded-lg p-4">
      <h3 className="font-bold mb-2 text-yellow-300">Kinh nghiệm lãnh đạo của Đảng</h3>
      <ul className="space-y-1 text-red-50">
        <li>• Kiên định mục tiêu độc lập dân tộc gắn với CNXH.</li>
        <li>• Thực hiện hai chiến lược song song:</li>
        <li className="ml-4">– Miền Bắc: xây dựng CNXH → hậu phương lớn.</li>
        <li className="ml-4">– Miền Nam: cách mạng dân tộc dân chủ → quyết định trực tiếp.</li>
        <li>• Vận dụng sáng tạo chiến tranh nhân dân: quân sự – chính trị – ngoại giao.</li>
        <li>• Tiến công – nổi dậy trên ba vùng chiến lược, ba mũi giáp công.</li>
        <li>• Tổ chức chiến đấu chặt chẽ, giành thắng lợi từng bước đến tổng thắng lợi.</li>
        <li>• Xây dựng Đảng vững mạnh và tranh thủ ủng hộ quốc tế.</li>
      </ul>
    </div>

  </div>
</div>
    </div>
    
  );
}

export default Timeline;
