import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PlatformToggle from './PlatformToggle';
import CommentForm from './CommentForm';
import CommentPreview from './CommentPreview';
import { CommentData, Platform, ThemeMode, HistoryItem } from '../types';
import ThemeToggle from './ThemeToggle';
import HistoryPanel from './HistoryPanel';
import { getHistory, saveToHistory } from '../utils/localStorage';
import { History, HelpCircle } from 'lucide-react';

const defaultCommentData: CommentData = {
  platform: 'youtube',
  profileName: 'FakCom',
  profileImageUrl: 'https://i.postimg.cc/VNpb9yhv/kb2b4j68av6d1.png',
  commentText: 'My love is Overflow.ing!',
  timeAgo: '1 hours ago',
  likeCount: 69,
  replyCount: 5,
  isVerified: false,
  includeWatermark: false
};

const CommentGenerator: React.FC = () => {
  const [commentData, setCommentData] = useState<CommentData>(defaultCommentData);
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
    loadHistory();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const loadHistory = () => {
    const savedHistory = getHistory();
    setHistory(savedHistory);
  };

  const handlePlatformChange = (platform: Platform) => {
    setCommentData((prev) => ({
      ...prev,
      platform
    }));
  };

  const handleDataChange = (data: Partial<CommentData>) => {
    setCommentData((prev) => ({
      ...prev,
      ...data
    }));
  };

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
  };

  const handleSaveToHistory = () => {
    const historyItem: HistoryItem = {
      ...commentData,
      id: uuidv4(),
      createdAt: Date.now()
    };
    saveToHistory(historyItem);
    loadHistory();
  };

  const handleSelectHistoryItem = (item: CommentData) => {
    setCommentData(item);
    setShowHistory(false);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
           ~FakCom~
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <History size={18} className="mr-2" />
              <span>History</span>
            </button>

            <button
              onClick={() => setShowHelp(true)}
              className="flex items-center px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium transition"
            >
              <HelpCircle size={18} className="mr-2" />
              Help
            </button>
            {showHelp && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
                <div className="bg-white text-gray-900 rounded-xl shadow-2xl p-6 max-w-xl w-full">
                  <h2 className="text-2xl font-bold mb-4">How to Use</h2>
                  <ul className="space-y-3 text-sm">
                    <li><strong>1. Choose Platform:</strong> Pick YouTube or Instagram comment style.</li>
                    <li><strong>2. Customize Profile:</strong> Enter name and upload or link profile picture.</li>
                    <li><strong>3. Write Comment:</strong> Add comment text, time, likes, etc.</li>
                    <li><strong>4. Add Extras:</strong> Use verification badge, replies, watermark toggle.</li>
                    <li><strong>5. Download:</strong> Click “Download as Image” to save it.</li>
                  </ul>
                  <button
                    onClick={() => setShowHelp(false)}
                    className="mt-6 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Got it!
                  </button>
                </div>
              </div>
            )}

            <ThemeToggle theme={theme} onChange={handleThemeChange} />
          </div>
        </div>

        {showHistory && (
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">History</h2>
              <button
                onClick={() => setShowHistory(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Close
              </button>
            </div>
            <HistoryPanel 
              history={history} 
              onSelect={handleSelectHistoryItem} 
              onHistoryUpdate={loadHistory} 
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="mb-6 flex justify-center">
              <PlatformToggle
                platform={commentData.platform}
                onChange={handlePlatformChange}
              />
            </div>
            <CommentForm data={commentData} onChange={handleDataChange} />
            <div className="mt-6">
              <button
                onClick={handleSaveToHistory}
                className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Save to History
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <CommentPreview data={commentData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentGenerator;
