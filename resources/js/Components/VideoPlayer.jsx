import React from 'react';

const VideoPlayer = ({ video }) => (
  <div id="video-player" className="mt-8 bg-white p-6 rounded-lg shadow-md">
    <div className="mb-4 flex justify-between items-center">
      <h3 className="text-xl font-bold">{video.title} </h3>
    </div>
    <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
      {video.url ? (
        <iframe 
          src={video.url} 
          className="w-full h-full" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      ) : video.file_path ? (
        <video 
          src={video.file_path} 
          className="w-full h-full" 
          controls
        ></video>
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-100">
          <p className="text-gray-500">لا يوجد فيديو متاح</p>
        </div>
      )}
    </div>
    {video.description && (
      <div className="mt-4">
        <h4 className="text-lg font-medium">وصف الفيديو:</h4>
        <p className="mt-2 text-gray-700">{video.description}</p>
      </div>
    )}
  </div>
);

export default VideoPlayer;