import React from 'react';

export default function AcademicYearForm({ 
    isOpen, 
    isEditing, 
    yearValue, 
    onYearChange, 
    onSubmit, 
    onClose, 
    errors, 
    processing 
}) {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative animate-fade-in">
                <button
                    onClick={onClose}
                    className="absolute top-3 left-3 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
                    disabled={processing}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-xl mb-4 font-bold text-gray-800">
                    {isEditing ? 'تعديل السنة الدراسية' : 'إضافة سنة دراسية جديدة'}
                </h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
                            السنة الدراسية
                        </label>
                        <input
                            type="text"
                            id="year"
                            className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.year ? 'border-red-500' : ''
                            }`}
                            placeholder="مثال: 2024-2025"
                            value={yearValue}
                            onChange={(e) => onYearChange(e.target.value)}
                            disabled={processing}
                        />
                        {errors.year && (
                            <p className="text-red-500 text-xs mt-1">{errors.year}</p>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out ${
                                processing ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {isEditing ? 'جارٍ التحديث...' : 'جارٍ الإضافة...'}
                                </span>
                            ) : (
                                <span>{isEditing ? 'تحديث' : 'إضافة'}</span>
                            )}
                        </button>
                        <button
                            type="button"
                            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                            onClick={onClose}
                            disabled={processing}
                        >
                            إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}