import React from 'react';
import classNames from 'classnames';
import EmptyState from './EmptyState';

const VideoSelector = ({ videos, selectedVideo, onVideoSelect, selectedUnit, unitName, isMobile }) => {
  // Helper function to generate button classes
  const getButtonClasses = (isSelected) => {
    return classNames(
      'w-full flex items-center p-4 rounded-lg transition-all duration-200',
      {
        'bg-blue-50 border border-blue-200 text-blue-700': isSelected,
        'bg-gray-50 hover:bg-gray-100 text-gray-700': !isSelected,
      }
    );
  };

  const renderMobileVideoItem = (video) => (
    <button
      key={video.id}
      onClick={() => onVideoSelect(video)}
      className={getButtonClasses(selectedVideo && selectedVideo.id === video.id)}
      disabled={!selectedUnit}
    >
      <div className="bg-blue-100 rounded-full p-3 ml-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="text-right flex-grow">
        <p className="font-medium">{video.title}</p>
        {video.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-1">{video.description}</p>
        )}
      </div>
    </button>
  );

  const renderDesktopVideoItem = (video) => (
    <button
      key={video.id}
      onClick={() => onVideoSelect(video)}
      className={classNames(
        'w-full text-right py-3 px-4 rounded-lg transition-all duration-200',
        {
          'bg-blue-600 text-white font-medium shadow-md': selectedVideo && selectedVideo.id === video.id,
          'bg-gray-50 hover:bg-gray-100 text-gray-700': !(selectedVideo && selectedVideo.id === video.id),
        }
      )}
      disabled={!selectedUnit}
    >
      <div className="flex items-center justify-end">
        <span>{video.title} يييييييي</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </button>
  );

  return (
    <div
      className={classNames(
        'bg-white p-6 rounded-lg shadow-md',
        { 'opacity-50': !selectedUnit && !isMobile }
      )}
    >
      <h3 className="text-lg font-medium text-gray-900 border-b pb-3 mb-4">
        {isMobile ? `${unitName} - الفيديوهات` : 'الفيديوهات'}
      </h3>
      <div className={classNames('space-y-3', { 'space-y-2': !isMobile })}>
        {videos.length > 0 ? (
          videos.map((video) => (isMobile ? renderMobileVideoItem(video) : renderDesktopVideoItem(video)))
        ) : selectedUnit ? (
          <EmptyState
            icon="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            message={isMobile ? "لا توجد فيديوهات لهذه الوحدة" : "لا توجد فيديوهات"}
          />
        ) : (
          <p className="text-gray-400 text-center italic pt-6">الرجاء اختيار الوحدة أولاً</p>
        )}
      </div>
    </div>
  );
};

export default VideoSelector;