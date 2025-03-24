// resources/js/Pages/Videos/PlayVideo.jsx
import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Link, usePage } from '@inertiajs/react';

export default function PlayVideo() {
    const { video } = usePage().props;
    
    return (
        <div className="container mx-auto px-4" dir="rtl">
            <div className="py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">{video.title}</h1>
                    <Link
                        href={route('videos.index')}
                        className="bg-gray-500 text-white py-2 px-4 rounded-md text-sm hover:bg-gray-600"
                    >
                        العودة إلى قائمة الفيديوهات
                    </Link>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col space-y-4">
                        <div className="w-full">
                            <video 
                                src={video.url} 
                                controls 
                                className="w-full rounded-lg max-h-screen"
                                controlsList="nodownload"
                            ></video>
                        </div>
                        
                        {video.description && (
                            <div className="mt-4">
                                <h3 className="text-lg font-medium mb-2">الوصف:</h3>
                                <p className="text-gray-700">{video.description}</p>
                            </div>
                        )}
                        
                        <div className="mt-4">
                            <h3 className="text-lg font-medium mb-2">معلومات الوحدة:</h3>
                            <p className="text-gray-700">
                                الوحدة: {video.unit?.title} | 
                                الفصل الدراسي: {video.unit?.semester?.title}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

PlayVideo.layout = page => <DashboardLayout children={page} />;