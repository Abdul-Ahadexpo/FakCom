import React from 'react';
import { CommentData } from '../types';
import { CheckCircle } from 'lucide-react';

interface InstagramCommentProps {
  data: CommentData;
}

const InstagramComment: React.FC<InstagramCommentProps> = ({ data }) => {
  const {
    profileName,
    profileImageUrl,
    commentText,
    timeAgo,
    likeCount,
    isVerified
  } = data;

  const avatarUrl = profileImageUrl || 'https://i.pravatar.cc/100';

  return (
    <div className="max-w-xl bg-[#ffffff] dark:bg-[#262626] text-[#262626] dark:text-[#f1f1f1] p-3 font-[-apple-system,system-ui]">
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <img
            src={avatarUrl}
            alt={profileName}
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="font-semibold text-[14px] mr-1">{profileName}</span>
              {isVerified && (
                <span className="text-[#0095f6] dark:text-[#0095f6] ml-0.5">
                  <CheckCircle size={12} className="fill-[#0095f6]" />
                </span>
              )}
            </div>
            <div className="text-[14px] whitespace-pre-wrap mb-1">{commentText}</div>
            <div className="flex items-center text-[#8e8e8e] dark:text-[#a8a8a8] text-[12px] space-x-3">
              <span>{timeAgo}</span>
              {likeCount > 0 && <span>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>}
              <button className="font-semibold">Reply</button>
            </div>
          </div>
        </div>
        <div className="ml-2 flex items-start">
          <button className="text-[#8e8e8e] dark:text-[#a8a8a8]">
            <svg
              aria-label="Like"
              className="w-3.5 h-3.5"
              fill="none"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstagramComment;