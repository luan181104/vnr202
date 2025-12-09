import { useState } from 'react';
import Timeline from './Timeline';
import VietnamMap from './VietnamMap';

function ContentSection() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'map'>('timeline');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-red-700 mb-4">Nội dung lịch sử</h2>
        <p className="text-gray-600">Khám phá các sự kiện và giai đoạn lịch sử quan trọng</p>
      </div>

      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
            activeTab === 'timeline'
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-white text-red-600 border-2 border-red-600'
          }`}
        >
          Timeline lịch sử
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
            activeTab === 'map'
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-white text-red-600 border-2 border-red-600'
          }`}
        >
          Bản đồ hai miền
        </button>
      </div>

      <div className="animate-fadeIn">
        {activeTab === 'timeline' && <Timeline />}
        {activeTab === 'map' && <VietnamMap />}
      </div>
    </div>
  );
}

export default ContentSection;
