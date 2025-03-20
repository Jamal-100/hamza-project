// ManagementAcademicYears.jsx
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';

// مكونات
import AcademicYearForm from '@/components/AcademicYearForm';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import MessageAlert from '@/components/MessageAlert';
import LoadingState from '@/components/LoadingState';
import EmptyState from '@/components/EmptyState';
import SearchBar from '@/components/SearchBar';

export default function ManagementAcademicYears() {
    // حالة البيانات
    const [academicYears, setAcademicYears] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    // حالة النماذج
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingYear, setEditingYear] = useState(null);
    const [yearToDelete, setYearToDelete] = useState(null);
    const [newYear, setNewYear] = useState('');
    
    // حالة الرسائل والأخطاء
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState({ text: '', type: '' });

    // استدعاء البيانات عند تحميل الصفحة
    useEffect(() => {
        fetchAcademicYears();
    }, []);

    // إخفاء رسالة النجاح أو الفشل بعد فترة
    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => {
                setMessage({ text: '', type: '' });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    // الوظائف الرئيسية للتعامل مع البيانات
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

    // وظائف المساعدة
    const handleEdit = (year) => {
        setEditingYear(year);
        setNewYear(year.year);
        setErrors({});
        setShowModal(true);
    };

    const confirmDelete = (year) => {
        setYearToDelete(year);
        setShowDeleteModal(true);
    };

    const openAddModal = () => {
        setEditingYear(null);
        setNewYear('');
        setErrors({});
        setShowModal(true);
    };

    // تصفية البيانات
    const filteredAcademicYears = academicYears.filter(year => {
        if (typeof year.year === 'string') {
            return year.year.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (year.year !== null && year.year !== undefined) {
            return String(year.year).toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
    });

    return (
        <div className="container mx-auto px-4" dir="rtl">
            <div className="py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">إدارة السنوات الدراسية</h1>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center"
                        onClick={openAddModal}
                    >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        إضافة سنة دراسية
                    </button>
                </div>

                {message.text && (
                    <MessageAlert 
                        message={message.text} 
                        type={message.type} 
                        onClose={() => setMessage({ text: '', type: '' })} 
                    />
                )}

                <SearchBar 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                    placeholder="البحث عن سنة دراسية..." 
                />

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {loading ? (
                        <LoadingState message="جاري تحميل البيانات..." />
                    ) : academicYears.length === 0 ? (
                        <EmptyState icon="document" message="لا توجد سنوات دراسية مسجلة" />
                    ) : filteredAcademicYears.length === 0 ? (
                        <EmptyState icon="search" message="لا توجد نتائج مطابقة للبحث" />
                    ) : (
                        <AcademicYearsTable 
                            years={filteredAcademicYears} 
                            onEdit={handleEdit} 
                            onDelete={confirmDelete} 
                        />
                    )}
                </div>
            </div>

            {showModal && (
                <AcademicYearForm
                    isOpen={showModal}
                    isEditing={!!editingYear}
                    yearValue={newYear}
                    onYearChange={(value) => setNewYear(value)}
                    onSubmit={handleSubmit}
                    onClose={() => setShowModal(false)}
                    errors={errors}
                    processing={processing}
                />
            )}

            {showDeleteModal && (
                <ConfirmDeleteModal
                    isOpen={showDeleteModal}
                    title="تأكيد الحذف"
                    message={`هل أنت متأكد من رغبتك في حذف السنة الدراسية "${yearToDelete?.year}"؟ هذا الإجراء لا يمكن التراجع عنه.`}
                    confirmLabel="نعم، احذف"
                    cancelLabel="إلغاء"
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeleteModal(false)}
                    processing={processing}
                />
            )}
        </div>
    );
}

// كمبوننت جدول السنوات الدراسية
const AcademicYearsTable = ({ years, onEdit, onDelete }) => {
    return (
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
                {years.map((year, index) => (
                    <tr key={year.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {year.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                                onClick={() => onEdit(year)}
                                className="text-indigo-600 hover:text-indigo-900 ml-4 transition duration-150 ease-in-out flex items-center"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                تعديل
                            </button>
                            <button
                                onClick={() => onDelete(year)}
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
    );
};
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