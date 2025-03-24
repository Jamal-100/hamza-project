import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Link, usePage, router } from '@inertiajs/react';
import { toast } from 'react-toastify';

export default function VideoManagement() {
    const { units, flash = {} } = usePage().props;
    const [expandedUnits, setExpandedUnits] = useState({});

    // Show toast message if there's a flash message
    React.useEffect(() => {
        if (flash && flash.success) {
            toast.success(flash.success);
        }
        if (flash && flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const toggleUnitVideos = (unitId) => {
        setExpandedUnits({
            ...expandedUnits,
            [unitId]: !expandedUnits[unitId]
        });
    };

    const handleDeleteVideo = (videoId) => {
        if (confirm('هل أنت متأكد من حذف الفيديو؟')) {
            router.delete(route('videos.destroy', videoId));
        }
    };

    return (
        <>
            <div className="container mx-auto px-4" dir="rtl">
                <div className="py-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800">إدارة الفيديو</h1>
                    </div>

                    {/* Units List */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        عنوان الوحدة
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        السنة الدراسية
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        إدارة الفيديو
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {units && units.map((unit) => (
                                    <React.Fragment key={unit.id}>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {unit.title}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {unit.semester?.year?.year || "N/A"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                                <div className="flex space-x-2 space-x-reverse">
                                                    <Link
                                                        href={route('videos.create', { unit_id: unit.id })}
                                                        className="bg-blue-600 text-white py-1 px-3 rounded-md text-sm hover:bg-blue-700"
                                                    >
                                                        إضافة فيديو
                                                    </Link>
                                                    <button
                                                        onClick={() => toggleUnitVideos(unit.id)}
                                                        className="bg-gray-600 text-white py-1 px-3 rounded-md text-sm hover:bg-gray-700"
                                                    >
                                                        {expandedUnits[unit.id] ? 'إخفاء الفيديوهات' : 'عرض الفيديوهات'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Videos for this unit */}
                                        {expandedUnits[unit.id] && unit.videos && unit.videos.length > 0 ? (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-4">
                                                    <div className="bg-gray-50 p-4 rounded-md">
                                                        <h3 className="text-lg font-medium mb-3">فيديوهات الوحدة</h3>
                                                        <div className="space-y-3">
                                                            {unit.videos.map((video) => (
                                                                <div key={video.id} className="bg-white p-3 rounded border flex justify-between items-center">
                                                                    <div>
                                                                        <h4 className="font-medium">{video.title}</h4>
                                                                        <p className="text-sm text-gray-600">{video.description}</p>
                                                                    </div>
                                                                    <div className="flex space-x-2 space-x-reverse">
                                                                        <Link
                                                                            href={route('videos.play', video.id)}
                                                                            className="bg-blue-500 text-white py-1 px-3 rounded-md text-sm hover:bg-blue-600"
                                                                        >
                                                                            تشغيل
                                                                        </Link>
                                                                        <Link
                                                                            href={route('videos.edit', video.id)}
                                                                            className="bg-yellow-500 text-white py-1 px-3 rounded-md text-sm hover:bg-yellow-600"
                                                                        >
                                                                            تعديل
                                                                        </Link>
                                                                        <button
                                                                            onClick={() => handleDeleteVideo(video.id)}
                                                                            className="bg-red-600 text-white py-1 px-3 rounded-md text-sm hover:bg-red-700"
                                                                        >
                                                                            حذف
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : expandedUnits[unit.id] ? (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                                    لا توجد فيديوهات مضافة لهذه الوحدة
                                                </td>
                                            </tr>
                                        ) : null}
                                    </React.Fragment>
                                ))}

                                {(!units || units.length === 0) && (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                            لا توجد وحدات مضافة بعد
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

VideoManagement.layout = page => <DashboardLayout children={page} />;