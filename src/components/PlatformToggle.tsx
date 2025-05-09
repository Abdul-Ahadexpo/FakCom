import React from 'react';
import { Platform } from '../types';

interface PlatformToggleProps {
  platform: Platform;
  onChange: (platform: Platform) => void;
}

const PlatformToggle: React.FC<PlatformToggleProps> = ({ platform, onChange }) => {
  return (
    <div className="flex items-center justify-center p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <button
        className={`px-4 py-2 rounded-md transition-all ${
          platform === 'youtube'
            ? 'bg-white dark:bg-gray-700 shadow-sm'
            : 'text-gray-500 dark:text-gray-400'
        }`}
        onClick={() => onChange('youtube')}
      >
        YouTube
      </button>
      <button
        className={`px-4 py-2 rounded-md transition-all ${
          platform === 'instagram'
            ? 'bg-white dark:bg-gray-700 shadow-sm'
            : 'text-gray-500 dark:text-gray-400'
        }`}
        onClick={() => onChange('instagram')}
      >
        Instagram
      </button>
    </div>
  );
};

export default PlatformToggle;