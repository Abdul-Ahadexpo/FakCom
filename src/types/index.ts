export type Platform = 'youtube' | 'instagram';

export type ThemeMode = 'light' | 'dark';

export interface CommentData {
  platform: Platform;
  profileName: string;
  profileImageUrl: string;
  commentText: string;
  timeAgo: string;
  likeCount: number;
  replyCount?: number;
  isVerified: boolean;
  includeWatermark: boolean;
}

export interface HistoryItem extends CommentData {
  id: string;
  createdAt: number;
}