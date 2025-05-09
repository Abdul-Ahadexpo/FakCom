import React from 'react';
import { CommentData, Platform } from '../types';
import ImageUploader from './ImageUploader';

interface CommentFormProps {
  data: CommentData;
  onChange: (data: Partial<CommentData>) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      onChange({ [name]: parseInt(value) || 0 });
    } else if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      onChange({ [name]: target.checked });
    } else {
      onChange({ [name]: value });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Profile Name
        </label>
        <input
          type="text"
          name="profileName"
          value={data.profileName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          placeholder="Username"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Profile Picture
        </label>
        <ImageUploader 
          imageUrl={data.profileImageUrl} 
          onChange={(url) => onChange({ profileImageUrl: url })} 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Comment Text
        </label>
        <textarea
          name="commentText"
          value={data.commentText}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          placeholder="Write your comment here..."
        />
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Time Ago
          </label>
          <input
            type="text"
            name="timeAgo"
            value={data.timeAgo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="e.g., 3 hours ago, 2d"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Like Count
          </label>
          <input
            type="number"
            name="likeCount"
            value={data.likeCount}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="0"
          />
        </div>
      </div>

      {data.platform === 'youtube' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Reply Count (YouTube only)
          </label>
          <input
            type="number"
            name="replyCount"
            value={data.replyCount || 0}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="0"
          />
        </div>
      )}

      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isVerified"
            name="isVerified"
            checked={data.isVerified}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="isVerified" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Verified Account
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="includeWatermark"
            name="includeWatermark"
            checked={data.includeWatermark}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="includeWatermark" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Include Watermark
          </label>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;