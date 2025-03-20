import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function Dashboard() {
    // Sample stats data for the dashboard
    const stats = [
        { title: 'إجمالي المستخدمين', value: '3,456', change: '+12%', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { title: 'الإيرادات الشهرية', value: '₪ 45,789', change: '+5.2%', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { title: 'عدد الزيارات', value: '28,419', change: '+18.7%', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { title: 'معدل التحويل', value: '6.43%', change: '+2.5%', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    ];

    // Sample activity data
    const recentActivity = [
        { id: 1, user: 'أحمد محمد', action: 'قام بتسجيل الدخول', time: 'منذ 5 دقائق' },
        { id: 2, user: 'سارة أحمد', action: 'قامت بتحديث الملف الشخصي', time: 'منذ 15 دقيقة' },
        { id: 3, user: 'عمر خالد', action: 'قام بإضافة منتج جديد', time: 'منذ ساعة' },
        { id: 4, user: 'ليلى سعيد', action: 'قامت بتحديث الإعدادات', time: 'منذ ساعتين' },
    ];

    // Sample tasks data
    const tasks = [
        { id: 1, title: 'تحديث صفحة الموقع الرئيسية', status: 'قيد التنفيذ', dueDate: '21 مارس', priority: 'عالي' },
        { id: 2, title: 'مراجعة طلبات المستخدمين الجدد', status: 'قيد الانتظار', dueDate: '22 مارس', priority: 'متوسط' },
        { id: 3, title: 'تحديث قاعدة البيانات الأسبوعي', status: 'مكتمل', dueDate: '20 مارس', priority: 'منخفض' },
    ];

    // Determine screen size
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="container mx-auto px-4" dir="rtl">
            {/* Welcome Section */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">مرحباً بك في لوحة التحكم</h1>
                <p className="text-gray-600">مرحباً بعودتك، إليك آخر التحديثات والإحصائيات</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                                <h3 className="text-xl font-bold text-gray-800">{stat.value}</h3>
                                <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.change} من الشهر الماضي
                                </span>
                            </div>
                            <div className="bg-green-100 p-2 rounded-lg">
                                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-800">النشاطات الأخيرة</h2>
                        </div>
                        <div className="p-4">
                            <div className="space-y-4">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-start">
                                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium mr-3">
                                            {activity.user.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-gray-800">
                                                <span className="font-medium">{activity.user}</span> {activity.action}
                                            </p>
                                            <p className="text-xs text-gray-500">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 text-center">
                                <Link href="#" className="text-sm font-medium text-green-600 hover:text-green-700">
                                    عرض جميع النشاطات
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tasks */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-800">المهام</h2>
                            <button className="text-sm font-medium text-green-600 hover:text-green-700">
                                إضافة مهمة
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="space-y-3">
                                {tasks.map((task) => (
                                    <div key={task.id} className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-medium text-gray-800">{task.title}</h3>
                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                task.status === 'مكتمل' ? 'bg-green-100 text-green-700' : 
                                                task.status === 'قيد التنفيذ' ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {task.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>تاريخ الاستحقاق: {task.dueDate}</span>
                                            <span className={`font-medium ${
                                                task.priority === 'عالي' ? 'text-red-600' : 
                                                task.priority === 'متوسط' ? 'text-yellow-600' :
                                                'text-green-600'
                                            }`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 text-center">
                                <Link href="#" className="text-sm font-medium text-green-600 hover:text-green-700">
                                    عرض جميع المهام
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { title: 'إضافة مستخدم', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
                    { title: 'تقارير المبيعات', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                    { title: 'إعدادات النظام', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
                    { title: 'مركز الدعم', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                ].map((action, index) => (
                    <button key={index} className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 border border-gray-100 hover:bg-green-50 hover:border-green-200 transition-colors duration-200">
                        <div className="bg-green-100 rounded-full p-2 mb-2">
                            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={action.icon} />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{action.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

Dashboard.layout = page => <DashboardLayout children={page} />;