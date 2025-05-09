import React from 'react';
import { Check } from 'lucide-react';
import { CommentData } from '../types';

interface YouTubeCommentProps {
  data: CommentData;
}

const YouTubeComment: React.FC<YouTubeCommentProps> = ({ data }) => {
  const {
    profileName,
    profileImageUrl,
    commentText,
    timeAgo,
    likeCount,
    replyCount,
    isVerified
  } = data;

  const avatarUrl = profileImageUrl || 'https://i.pravatar.cc/100';

  return (
    <div className="flex flex-col max-w-2xl bg-[#ffffff] dark:bg-[#0f0f0f] text-black dark:text-white p-3 font-roboto">
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <img
            src={avatarUrl}
            alt={profileName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-medium text-[13px] mr-1">{profileName}</span>
            {isVerified && (
              <span className="bg-[#606060] dark:bg-[#aaaaaa] rounded-full p-0.5 mr-1">
                <Check size={10} className="text-white" />
              </span>
            )}
            <span className="text-[#606060] dark:text-[#aaaaaa] text-[13px]">{timeAgo}</span>
          </div>
          <div className="mt-1 mb-1 text-[14px] whitespace-pre-wrap">{commentText}</div>
          <div className="flex items-center mt-2 text-[#606060] dark:text-[#aaaaaa]">
            <button className="mr-4 flex items-center group">
              <svg className="w-6 h-6 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>
              </svg>
              <span className="text-[13px]">{likeCount}</span>
            </button>
            <button className="mr-4 flex items-center group">
              <svg className="w-6 h-6 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M17,12.4L11.4,18.46C11.21,18.67,10.92,18.79,10.62,18.79c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.41H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.71l1.34-6 C5.46,4.33,5.97,4,6.57,4H16v8.4H17z"></path>
              </svg>
            </button>
            {replyCount !== undefined && replyCount > 0 && (
              <button className="text-[13px] font-medium">REPLY</button>
            )}
          </div>
          {replyCount !== undefined && replyCount > 0 && (
            <div className="mt-2 text-[#065FD4] dark:text-[#3EA6FF] text-[13px] font-medium">
              {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YouTubeComment;