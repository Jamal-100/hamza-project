import React, { useState, useEffect } from 'react';

export default function MessageAlert({ message, type, onClose }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    
    useEffect(() => {
        // تأخير قصير قبل الظهور لتحسين تأثير الانتقال
        setTimeout(() => {
            setIsVisible(true);
        }, 100);
        
        // إغلاق تلقائي اختياري بعد 5 ثوانٍ
        const timer = setTimeout(() => {
            handleClose();
        }, 5000);
        
        return () => clearTimeout(timer);
    }, []);
    
    const handleClose = () => {
        // تفعيل حالة الخروج لبدء تأثير التلاشي
        setIsExiting(true);
        
        // تأخير أطول لإكمال تأثير الاختفاء الهادئ
        setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                onClose();
            }, 100);
        }, 500);
    };
    
    // تحديد الألوان والأيقونات حسب نوع الرسالة
    const styles = {
        success: {
            bg: 'bg-green-100',
            border: 'border-l-4 border-green-500',
            text: 'text-green-700',
            shadow: 'shadow-lg shadow-green-100',
            icon: (
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            )
        },
        error: {
            bg: 'bg-red-100',
            border: 'border-l-4 border-red-500',
            text: 'text-red-700',
            shadow: 'shadow-lg shadow-red-100',
            icon: (
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            )
        }
    };
    
    const currentStyle = type === 'success' ? styles.success : styles.error;
    
    return (
        <div 
            className={`p-4 mb-4 rounded-lg flex items-center justify-between ${currentStyle.bg} ${currentStyle.border} ${currentStyle.text} ${currentStyle.shadow} 
                transition-all duration-700 ease-in-out transform 
                ${isVisible ? 'translate-y-0 opacity-100 max-h-24' : '-translate-y-2 opacity-0 max-h-0'} 
                ${isExiting ? 'opacity-0 scale-98' : ''}`}
        >
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    {currentStyle.icon}
                </div>
                <span className="font-medium">{message}</span>
            </div>
            <button 
                onClick={handleClose} 
                className="ml-4 flex-shrink-0 text-gray-500 hover:text-gray-700 transition-colors duration-300 focus:outline-none"
            >
                <svg className="w-4 h-4 hover:rotate-90 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
}