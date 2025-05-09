import React, { useRef } from 'react';
import { CommentData } from '../types';
import YouTubeComment from './YouTubeComment';
import InstagramComment from './InstagramComment';
import { Download } from 'lucide-react';
import { downloadAsImage } from '../utils/downloadUtils';

interface CommentPreviewProps {
  data: CommentData;
}

const CommentPreview: React.FC<CommentPreviewProps> = ({ data }) => {
  const commentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    const fileName = `${data.platform}-comment-${Date.now()}`;
    await downloadAsImage('comment-preview', fileName);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Preview</h3>
        <div 
          className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden" 
          id="comment-preview" 
          ref={commentRef}
        >
          {data.platform === 'youtube' ? (
            <YouTubeComment data={data} />
          ) : (
            <InstagramComment data={data} />
          )}
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <Download size={16} className="mr-2" />
        Download as Image
      </button>
    </div>
  );
};

export default CommentPreview;