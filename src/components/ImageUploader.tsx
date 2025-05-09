import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  imageUrl: string;
  onChange: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imageUrl, onChange }) => {
  const [isUrlInput, setIsUrlInput] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlValue, setUrlValue] = useState(imageUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onChange(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlValue(e.target.value);
  };

  const handleUrlSubmit = () => {
    onChange(urlValue);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onChange(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded ${
              isUrlInput 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
            onClick={() => setIsUrlInput(true)}
          >
            URL
          </button>
          <button
            className={`px-3 py-1 text-sm rounded ${
              !isUrlInput 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
            onClick={() => setIsUrlInput(false)}
          >
            Upload
          </button>
        </div>
        {imageUrl && (
          <div className="flex items-center">
            <img 
              src={imageUrl} 
              alt="Preview" 
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        )}
      </div>

      {isUrlInput ? (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="https://example.com/image.jpg"
            value={urlValue}
            onChange={handleUrlChange}
          />
          <button
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={handleUrlSubmit}
          >
            Set
          </button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-10 w-10 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Drag & drop an image here, or click to select
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;