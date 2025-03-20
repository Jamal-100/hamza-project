import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import axios from 'axios';

export default function ManagementAcademicYears() {
    const [academicYears, setAcademicYears] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newYear, setNewYear] = useState('');
    const [editingYear, setEditingYear] = useState(null);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState({ text: '', type: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [yearToDelete, setYearToDelete] = useState(null);

    // جلب بيانات السنوات الدراسية
    useEffect(() => {
        fetchAcademicYears();
    }, []);

    // إخفاء رسالة النجاح أو الفشل بعد 5 ثوان
    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => {
                setMessage({ text: '', type: '' });
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const fetchAcademicYears = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/academic-years');
            setAcademicYears(response.data);
        } catch (error) {
            console.error('خطأ في جلب البيانات:', error);
            setMessage({ text: 'حدث خطأ أثناء جلب البيانات', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    // إضافة سنة دراسية جديدة
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            if (editingYear) {
                await axios.put(`/api/academic-years/${editingYear.id}`, { year: newYear });
                setMessage({ text: 'تم تحديث السنة الدراسية بنجاح', type: 'success' });
            } else {
                await axios.post('/api/academic-years', { year: newYear });
                setMessage({ text: 'تمت إضافة السنة الدراسية بنجاح', type: 'success' });
            }

            setNewYear('');
            setEditingYear(null);
            setShowModal(false);
            fetchAcademicYears();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setMessage({ text: 'حدث خطأ أثناء حفظ البيانات', type: 'error' });
                console.error('خطأ في حفظ البيانات:', error);
            }
        } finally {
            setProcessing(false);
        }
    };

    // تعديل سنة دراسية
    const handleEdit = (year) => {
        setEditingYear(year);
        setNewYear(year.year);
        setErrors({});
        setShowModal(true);
    };

    // حذف سنة دراسية
    const confirmDelete = (year) => {
        setYearToDelete(year);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!yearToDelete) return;

        setProcessing(true);
        try {
            await axios.delete(`/api/academic-years/${yearToDelete.id}`);
            setMessage({ text: 'تم حذف السنة الدراسية بنجاح', type: 'success' });
            fetchAcademicYears();
        } catch (error) {
            setMessage({ text: 'حدث خطأ أثناء حذف البيانات', type: 'error' });
            console.error('خطأ في حذف البيانات:', error);
        } finally {
            setYearToDelete(null);
            setShowDeleteModal(false);
            setProcessing(false);
        }
    };

    // تصفية السنوات الدراسية
    const filteredAcademicYears = academicYears.filter(year => {
        // تحقق مما إذا كانت القيمة نصية
        if (typeof year.year === 'string') {
            return year.year.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (year.year !== null && year.year !== undefined) {
            // إذا لم تكن نصًا ولكن لها قيمة، قم بتحويلها إلى نص
            return String(year.year).toLowerCase().includes(searchTerm.toLowerCase());
        }
        // إذا كانت null أو undefined، لا تقم بإضافتها للنتيجة
        return false;
    });


    // عرض رسالة النجاح أو الفشل
    const MessageAlert = () => {
        if (!message.text) return null;

        return (
            <div className={`p-4 mb-4 rounded flex items-center justify-between ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                <div className="flex items-center">
                    {message.type === 'success' ? (
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    )}
                    <span>{message.text}</span>
                </div>
                <button onClick={() => setMessage({ text: '', type: '' })} className="text-gray-500 hover:text-gray-700">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4" dir="rtl">
            <div className="py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">إدارة السنوات الدراسية</h1>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center"
                        onClick={() => {
                            setEditingYear(null);
                            setNewYear('');
                            setErrors({});
                            setShowModal(true);
                        }}
                    >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        إضافة سنة دراسية
                    </button>
                </div>

                <MessageAlert />

                {/* شريط البحث */}
                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="البحث عن سنة دراسية..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* جدول السنوات الدراسية */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                            <p className="mt-2">جاري تحميل البيانات...</p>
                        </div>
                    ) : academicYears.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="mt-2">لا توجد سنوات دراسية مسجلة</p>
                        </div>
                    ) : filteredAcademicYears.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <p className="mt-2">لا توجد نتائج مطابقة للبحث</p>
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        السنة الدراسية
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredAcademicYears.map((year, index) => (
                                    <tr key={year.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                            {year.year}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(year)}
                                                className="text-indigo-600 hover:text-indigo-900 ml-4 transition duration-150 ease-in-out flex items-center"
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                                تعديل
                                            </button>
                                            <button
                                                onClick={() => confirmDelete(year)}
                                                className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out flex items-center"
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                حذف
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* نافذة منبثقة لإضافة/تعديل سنة دراسية */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative animate-fade-in">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 left-3 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-xl mb-4 font-bold text-gray-800">
                            {editingYear ? 'تعديل السنة الدراسية' : 'إضافة سنة دراسية جديدة'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
                                    السنة الدراسية
                                </label>
                                <input
                                    type="text"
                                    id="year"
                                    className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.year ? 'border-red-500' : ''
                                        }`}
                                    placeholder="مثال: 2024-2025"
                                    value={newYear}
                                    onChange={(e) => setNewYear(e.target.value)}
                                    disabled={processing}
                                />
                                {errors.year && (
                                    <p className="text-red-500 text-xs mt-1">{errors.year}</p>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out ${processing ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {editingYear ? 'جارٍ التحديث...' : 'جارٍ الإضافة...'}
                                        </span>
                                    ) : (
                                        <span>{editingYear ? 'تحديث' : 'إضافة'}</span>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                                    onClick={() => setShowModal(false)}
                                    disabled={processing}
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* نافذة منبثقة لتأكيد الحذف */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative animate-fade-in">
                        <h2 className="text-xl mb-4 font-bold text-gray-800">تأكيد الحذف</h2>
                        <p className="mb-6 text-gray-600">
                            هل أنت متأكد من رغبتك في حذف السنة الدراسية "{yearToDelete?.year}"؟ هذا الإجراء لا يمكن التراجع عنه.
                        </p>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={handleDelete}
                                className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out ${processing ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                disabled={processing}
                            >
                                {processing ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        جارٍ الحذف...
                                    </span>
                                ) : (
                                    <span>نعم، احذف</span>
                                )}
                            </button>
                            <button
                                type="button"
                                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                                onClick={() => setShowDeleteModal(false)}
                                disabled={processing}
                            >
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// استخدام تنسيق CSS لتحريك العناصر
const style = document.createElement('style');
style.textContent = `
    @keyframes fade-in {
        0% { opacity: 0; transform: translateY(-10px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fade-in 0.3s ease-out forwards;
    }
`;
document.head.appendChild(style);

ManagementAcademicYears.layout = page => <DashboardLayout children={page} />;