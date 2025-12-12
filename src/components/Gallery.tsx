import { useState } from 'react';
import { X, ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  year: string;
  category: 'north' | 'south' | 'both' | 'summary';
  imageUrl: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Hiệp định Giơnevơ 1954',
    description: 'Lễ ký kết Hiệp định Giơnevơ chấm dứt chiến tranh Đông Dương, mở ra giai đoạn mới cho cách mạng Việt Nam.',
    year: '1954',
    category: 'both',
    imageUrl: '/assets/gionevo.jpg'
  },
  {
    id: 2,
    title: 'Xây dựng miền Bắc',
    description: 'Nhân dân miền Bắc tích cực tham gia khôi phục kinh tế, xây dựng các công trình công nghiệp.',
    year: '1955-1960',
    category: 'north',
    imageUrl: '/assets/xaydungmienbac.jpg'
  },
  {
    id: 3,
    title: 'Phong trào Đồng Khởi',
    description: 'Quần chúng nhân dân miền Nam nổi dậy đấu tranh chống chính quyền Mỹ-Diệm, giành quyền làm chủ.',
    year: '1960',
    category: 'south',
    imageUrl: '/assets/dongkhoi.jpg'
  },
  {
    id: 4,
    title: 'Đại hội Đảng lần III',
    description: 'Đại hội xác định đường lối cách mạng hai miền: xây dựng CNXH ở Bắc, giải phóng dân tộc ở Nam.',
    year: '1960',
    category: 'both',
    imageUrl: '/assets/daihoidang3.jpg'
  },
  {
    id: 5,
    title: 'Gang thép Thái Nguyên',
    description: 'Công trình công nghiệp nặng đầu tiên của miền Bắc, biểu tượng của sự nghiệp công nghiệp hóa.',
    year: '1963',
    category: 'north',
    imageUrl: '/assets/gangthepthainguyen.jpg'
  },
  {
    id: 6,
    title: 'Đường Trường Sơn',
    description: 'Con đường huyền thoại chi viện cho miền Nam, biểu tượng của ý chí kiên cường của dân tộc.',
    year: '1959-1975',
    category: 'both',
    imageUrl: '/assets/duongtruongson.jpg'
  },
  {
    id: 7,
    title: 'Chiến sĩ giải phóng miền Nam',
    description: 'Lực lượng vũ trang nhân dân miền Nam anh dũng chiến đấu chống quân Mỹ và bù nhìn.',
    year: '1965-1975',
    category: 'south',
    imageUrl: '/assets/chiensimiennam.jpg'
  },
  {
    id: 8,
    title: 'Phòng không nhân dân',
    description: 'Lực lượng phòng không miền Bắc anh dũng bắn rơi máy bay Mỹ, bảo vệ bầu trời Tổ quốc.',
    year: '1965-1972',
    category: 'north',
    imageUrl: '/assets/phongkhong.jpg'
  },
  {
    id: 9,
    title: 'Tết Mậu Thân 1968',
    description: 'Tổng tiến công và nổi dậy lịch sử, làm chấn động thế giới và lung lay ý chí chiến tranh của Mỹ.',
    year: '1968',
    category: 'south',
    imageUrl: '/assets/tetmauthan.jpg'
  },
  {
    id: 10,
    title: 'Điện Biên Phủ trên không',
    description: 'Chiến thắng vang dội chống chiến tranh phá hoại bằng máy bay B-52 của Mỹ.',
    year: '1972',
    category: 'north',
    imageUrl: '/assets/dienbienphu.jpg'
  },
  {
    id: 11,
    title: 'Hiệp định Paris',
    description: 'Lễ ký kết Hiệp định Paris buộc Mỹ phải rút quân hoàn toàn khỏi Việt Nam.',
    year: '1973',
    category: 'both',
    imageUrl: '/assets/hiepdinhpari.jpg'
  },
  {
    id: 12,
    title: 'Chiến dịch Hồ Chí Minh',
    description: 'Chiến dịch cuối cùng giải phóng hoàn toàn miền Nam, thống nhất đất nước.',
    year: '1975',
    category: 'both',
    imageUrl: '/assets/xetang.jpg'
  },
  {
    id: 13,
    title: 'Ngày giải phóng 30/4/1975',
    description: 'Khoảnh khắc lịch sử - xe tăng tiến vào Dinh Độc Lập, đất nước hoàn toàn thống nhất.',
    year: '1975',
    category: 'south',
    imageUrl: '/assets/xetang2.jpg'
  },
  {
    id: 14,
    title: 'Niềm vui đoàn tụ',
    description: 'Người dân cả nước hân hoan đón nhận thắng lợi, đất nước hoàn toàn độc lập và thống nhất.',
    year: '1975',
    category: 'both',
    imageUrl: '/assets/niemvui.jpg'
  },
  {
    id: 15,
    title: 'Xây dựng đất nước',
    description: 'Sau ngày thống nhất, cả nước hướng tới xây dựng và phát triển đất nước xã hội chủ nghĩa.',
    year: '1976',
    category: 'both',
    imageUrl: '/assets/xaydungdatnuoc.jpg'
  },
  {
    id: 16,
    title: 'Sơ đồ tư duy tổng hợp',
    description: 'Sơ đồ tổng hợp toàn bộ nội dung lịch sử 1954–1975.',
    year: 'Tổng hợp',
    category: 'summary',
    imageUrl: '/assets/sodotonghop.png'
  }
];

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'north' | 'south' | 'both' | 'summary'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredItems =
  selectedCategory === 'all'
    ? galleryItems.filter(item => item.category !== 'summary')
    : galleryItems.filter(item => item.category === selectedCategory);


  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'north': return 'bg-blue-500';
      case 'south': return 'bg-green-500';
      case 'both': return 'bg-red-600';
      case 'summary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'north': return 'Miền Bắc';
      case 'south': return 'Miền Nam';
      case 'both': return 'Cả nước';
      case 'summary': return 'Tổng hợp';
      default: return '';
    }
  };

  const openLightbox = (item: GalleryItem, index: number) => {
    setSelectedImage(item);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredItems.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredItems[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredItems[prevIndex]);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-red-700 mb-4 flex items-center justify-center">
          <ImageIcon className="mr-2" />
          Thư viện ảnh và video
        </h2>
        <p className="text-gray-600">Bộ sưu tập hình ảnh và tài liệu</p>
      </div>

      <div className="flex justify-center mb-8 flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 ${
            selectedCategory === 'all'
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-white text-red-600 border-2 border-red-600'
          }`}
        >
          Tất cả ({galleryItems.length})
        </button>
        <button
          onClick={() => setSelectedCategory('north')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 ${
            selectedCategory === 'north'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-blue-600 border-2 border-blue-600'
          }`}
        >
          Miền Bắc ({galleryItems.filter(i => i.category === 'north').length})
        </button>
        <button
          onClick={() => setSelectedCategory('south')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 ${
            selectedCategory === 'south'
              ? 'bg-green-600 text-white shadow-lg'
              : 'bg-white text-green-600 border-2 border-green-600'
          }`}
        >
          Miền Nam ({galleryItems.filter(i => i.category === 'south').length})
        </button>
        <button
          onClick={() => setSelectedCategory('both')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 ${
            selectedCategory === 'both'
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-white text-red-600 border-2 border-red-600'
          }`}
        >
          Cả nước ({galleryItems.filter(i => i.category === 'both').length})
        </button>
        <button
          onClick={() => setSelectedCategory('summary')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 ${
            selectedCategory === 'summary'
              ? 'bg-yellow-500 text-white shadow-lg'
              : 'bg-white text-yellow-600 border-2 border-yellow-500'
          }`}
         >
          Tổng hợp ({galleryItems.filter(i => i.category === 'summary').length})
        </button>

      </div>

      {selectedCategory === 'summary' && (
  <div className="mb-10">
    <h3 className="text-2xl font-bold text-yellow-600 mb-4 text-center">
      Video tổng hợp giai đoạn 1954 – 1975
    </h3>

    <video
      src="/assets/tonghop3.mp4"
      controls
      className="w-full max-h-[600px] mx-auto rounded-xl shadow-xl bg-black"
    >
      Trình duyệt của bạn không hỗ trợ video.
    </video>
  </div>
)}


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => openLightbox(item, index)}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl animate-fadeIn"
          >
            <div className="relative h-48 overflow-hidden bg-gray-200">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2">
                <span className={`${getCategoryColor(item.category)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                  {getCategoryLabel(item.category)}
                </span>
              </div>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-bold">
                {item.year}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">{item.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors z-10"
          >
            <X size={36} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-red-400 transition-colors z-10"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-red-400 transition-colors z-10"
          >
            <ChevronRight size={48} />
          </button>

          <div className="max-w-5xl w-full">
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain bg-gray-100"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`${getCategoryColor(selectedImage.category)} text-white px-4 py-1 rounded-full text-sm font-bold`}>
                    {getCategoryLabel(selectedImage.category)}
                  </span>
                  <span className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm font-bold">
                    {selectedImage.year}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-red-700 mb-3">{selectedImage.title}</h3>
                <p className="text-gray-700 leading-relaxed">{selectedImage.description}</p>
                <div className="mt-4 text-center text-sm text-gray-500">
                  {currentImageIndex + 1} / {filteredItems.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
