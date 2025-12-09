import { useState } from 'react';
import { MapPin, Info } from 'lucide-react';

type Region = 'north' | 'south' | null;

interface RegionInfo {
  title: string;
  period: string;
  color: string;
  tasks: string[];
  achievements: string[];
}

const regionData: Record<'north' | 'south', RegionInfo> = {
  north: {
    title: 'MIỀN BẮC',
    period: '1954 - 1975',
    color: 'from-blue-600 to-blue-700',
    tasks: [
      'Khôi phục kinh tế sau chiến tranh',
      'Cải tạo quan hệ sản xuất theo con đường XHCN',
      'Xây dựng cơ sở vật chất - kỹ thuật của CNXH',
      'Hỗ trợ trực tiếp cho miền Nam',
      'Vừa chiến đấu, vừa sản xuất'
    ],
    achievements: [
      'Khôi phục kinh tế (1954-1957)',
      'Hợp tác hóa nông nghiệp',
      'Xây dựng gang thép Thái Nguyên',
      'Điện Biên Phủ trên không (1972)',
      'Trở thành hậu phương lớn'
    ]
  },
  south: {
    title: 'MIỀN NAM',
    period: '1954 - 1975',
    color: 'from-green-600 to-green-700',
    tasks: [
      'Đấu tranh chống Mỹ - Diệm',
      'Giữ vững và mở rộng lực lượng cách mạng',
      'Xây dựng ba vùng chiến lược',
      'Đánh bại các chiến lược của Mỹ',
      'Tiến tới giải phóng hoàn toàn'
    ],
    achievements: [
      'Phong trào Đồng Khởi (1960)',
      'Thành lập MTDTGPMN (1960)',
      'Tổng tiến công Tết Mậu Thân (1968)',
      'Đánh bại "Việt Nam hóa"',
      'Đại thắng mùa Xuân (1975)'
    ]
  }
};

function VietnamMap() {
  const [selectedRegion, setSelectedRegion] = useState<Region>(null);

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-red-700 mb-2 flex items-center justify-center">
          <MapPin className="mr-2" />
          Bản đồ hai miền Nam - Bắc
        </h3>
        <p className="text-gray-600 text-sm">Nhấp vào từng miền để xem thông tin chi tiết</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="flex justify-center items-start">
          <div className="relative w-full max-w-md">
            <svg viewBox="0 0 200 400" className="w-full h-auto">
              <defs>
                <linearGradient id="northGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="southGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#15803d', stopOpacity: 1 }} />
                </linearGradient>
              </defs>

              <path
                d="M 100 20 L 80 40 L 60 80 L 70 120 L 90 150 L 100 180 L 110 150 L 130 120 L 140 80 L 120 40 Z"
                fill={selectedRegion === 'north' ? 'url(#northGradient)' : '#93c5fd'}
                stroke="#1e40af"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:opacity-80"
                onClick={() => setSelectedRegion('north')}
              />

              <line x1="50" y1="185" x2="150" y2="185" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" />
              <text x="100" y="195" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">
                Vĩ tuyến 17
              </text>

              <path
                d="M 100 190 L 90 210 L 70 250 L 60 290 L 80 330 L 100 360 L 120 330 L 140 290 L 130 250 L 110 210 Z"
                fill={selectedRegion === 'south' ? 'url(#southGradient)' : '#86efac'}
                stroke="#15803d"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:opacity-80"
                onClick={() => setSelectedRegion('south')}
              />

              <text x="100" y="100" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">
                MIỀN BẮC
              </text>
              <text x="100" y="270" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">
                MIỀN NAM
              </text>

              <circle cx="100" cy="80" r="4" fill="#fbbf24" className="animate-pulse-slow" />
              <text x="110" y="83" fontSize="8" fill="#1e40af">Hà Nội</text>

              <circle cx="100" cy="340" r="4" fill="#fbbf24" className="animate-pulse-slow" />
              <text x="110" y="343" fontSize="8" fill="#15803d">Sài Gòn</text>
            </svg>

            <div className="mt-4 text-center">
              <div className="inline-flex items-center space-x-4 bg-red-50 px-4 py-2 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm">Miền Bắc</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Miền Nam</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          {!selectedRegion ? (
            <div className="w-full bg-gradient-to-br from-red-50 to-yellow-50 rounded-xl p-8 border-2 border-dashed border-red-300 text-center">
              <Info size={48} className="mx-auto text-red-400 mb-4" />
              <p className="text-gray-600 text-lg">
                Nhấp vào miền Bắc hoặc miền Nam trên bản đồ để xem thông tin chi tiết về nhiệm vụ và thành tựu
              </p>
            </div>
          ) : (
            <div className={`w-full bg-gradient-to-br ${regionData[selectedRegion].color} rounded-xl p-6 text-white shadow-2xl animate-fadeIn`}>
              <h4 className="text-2xl font-bold mb-2">{regionData[selectedRegion].title}</h4>
              <p className="text-sm opacity-90 mb-6">{regionData[selectedRegion].period}</p>

              <div className="mb-6">
                <h5 className="font-bold text-lg mb-3 flex items-center">
                  <span className="w-1 h-6 bg-yellow-400 mr-2"></span>
                  Nhiệm vụ chính
                </h5>
                <ul className="space-y-2">
                  {regionData[selectedRegion].tasks.map((task, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-300 mr-2">•</span>
                      <span className="text-sm">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-lg mb-3 flex items-center">
                  <span className="w-1 h-6 bg-yellow-400 mr-2"></span>
                  Thành tựu nổi bật
                </h5>
                <ul className="space-y-2">
                  {regionData[selectedRegion].achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-300 mr-2">★</span>
                      <span className="text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-red-50 rounded-lg p-6 border-l-4 border-red-600">
        <h4 className="font-bold text-red-700 mb-3">Ý nghĩa lịch sử</h4>
        <p className="text-gray-700 text-sm leading-relaxed">
          Đường lối "một Đảng - hai nhiệm vụ chiến lược - một mục tiêu chung" đã khẳng định tính đúng đắn trong việc lãnh đạo cách mạng.
          Miền Bắc trở thành hậu phương vững chắc, miền Nam là mặt trận quyết định, cùng nhau hướng tới mục tiêu giải phóng hoàn toàn miền Nam,
          thống nhất đất nước và xây dựng chủ nghĩa xã hội.
        </p>
      </div>
    </div>
  );
}

export default VietnamMap;
