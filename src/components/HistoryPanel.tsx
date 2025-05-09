import React from 'react';
import { HistoryItem, CommentData } from '../types';
import { Trash2, Clock } from 'lucide-react';
import { removeHistoryItem } from '../utils/localStorage';

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (item: CommentData) => void;
  onHistoryUpdate: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ 
  history, 
  onSelect, 
  onHistoryUpdate 
}) => {
  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeHistoryItem(id);
    onHistoryUpdate();
  };

  if (history.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        <Clock className="mx-auto h-8 w-8 mb-2 opacity-50" />
        <p>No history yet. Generated comments will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[300px] overflow-y-auto">
      {history.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item)}
          className="p-3 border border-gray-200 dark:border-gray-700 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition flex justify-between items-center"
        >
          <div className="flex items-center space-x-3">
            <img
              src={item.profileImageUrl}
              alt={item.profileName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center">
                <span className="font-medium">{item.profileName}</span>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 capitalize">
                  ({item.platform})
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[250px]">
                {item.commentText}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => handleRemove(item.id, e)}
            className="text-gray-400 hover:text-red-500 transition"
            aria-label="Remove from history"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default HistoryPanel;