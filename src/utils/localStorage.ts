import { HistoryItem } from '../types';

const HISTORY_KEY = 'comment-generator-history';

export const saveToHistory = (item: HistoryItem): void => {
  const history = getHistory();
  const updatedHistory = [item, ...history].slice(0, 10); // Keep only the last 10 items
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
};

export const getHistory = (): HistoryItem[] => {
  const historyString = localStorage.getItem(HISTORY_KEY);
  if (!historyString) return [];
  
  try {
    return JSON.parse(historyString);
  } catch (error) {
    console.error('Failed to parse history from localStorage', error);
    return [];
  }
};

export const clearHistory = (): void => {
  localStorage.removeItem(HISTORY_KEY);
};

export const removeHistoryItem = (id: string): void => {
  const history = getHistory();
  const updatedHistory = history.filter(item => item.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
};