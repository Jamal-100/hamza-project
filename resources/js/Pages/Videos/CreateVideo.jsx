// resources/js/Pages/Videos/CreateVideo.jsx
import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useForm, usePage, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function CreateVideo() {
    const { units, selectedUnit } = usePage().props;
    const [videoPreview, setVideoPreview] = useState(null);
    
    const { data, setData, post, processing, errors, progress } = useForm({
        title: '',
        video_file: null,
        unit_id: selectedUnit ? selectedUnit.id : '',
        description: ''
    });
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('video_file', file);
        
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setVideoPreview(fileUrl);
        } else {
            setVideoPreview(null);
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('videos.store'), {
            forceFormData: true
        });
    };
    
    return (
        <div className="container mx-auto px-4" dir="rtl">
            <div className="py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">إضافة فيديو جديد</h1>
                    <Link
                        href={route('videos.index')}
                        className="bg-gray-500 text-white py-2 px-4 rounded-md text-sm hover:bg-gray-600"
                    >
                        العودة إلى قائمة الفيديوهات
                    </Link>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                عنوان الفيديو
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.title && <InputError message={errors.title} className="mt-1" />}
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="video_file" className="block text-sm font-medium text-gray-700 mb-1">
                                ملف الفيديو
                            </label>
                            <input
                                type="file"
                                id="video_file"
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                accept="video/mp4,video/mov,video/avi,video/wmv"
                            />
                            {errors.video_file && <InputError message={errors.video_file} className="mt-1" />}
                            
                            {/* شريط تقدم التحميل */}
                            {progress && (
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                    <div 
                                        className="bg-blue-600 h-2.5 rounded-full" 
                                        style={{ width: `${progress.percentage}%` }}
                                    ></div>
                                </div>
                            )}
                            
                            {/* معاينة الفيديو */}
                            {videoPreview && (
                                <div className="mt-3">
                                    <video 
                                        src={videoPreview} 
                                        controls 
                                        className="max-w-lg rounded"
                                        style={{ maxHeight: '200px' }}
                                    ></video>
                                </div>
                            )}
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="unit_id" className="block text-sm font-medium text-gray-700 mb-1">
                                الوحدة
                            </label>
                            <select
                                id="unit_id"
                                value={data.unit_id}
                                onChange={(e) => setData('unit_id', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">اختر الوحدة</option>
                                {units.map((unit) => (
                                    <option key={unit.id} value={unit.id}>
                                        {unit.title} - {unit.semester?.title}
                                    </option>
                                ))}
                            </select>
                            {errors.unit_id && <InputError message={errors.unit_id} className="mt-1" />}
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                وصف الفيديو
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>
                        
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {processing ? 'جاري الحفظ...' : 'حفظ الفيديو'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

CreateVideo.layout = page => <DashboardLayout children={page} />;