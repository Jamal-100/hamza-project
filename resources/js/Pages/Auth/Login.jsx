import { useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [validationErrors, setValidationErrors] = useState({});

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            setValidationErrors(prev => ({ ...prev, email: 'يرجى إدخال بريد إلكتروني صحيح' }));
            return false;
        }
        setValidationErrors(prev => ({ ...prev, email: null }));
        return true;
    };

    const validatePassword = () => {
        if (data.password.trim() === '') {
            setValidationErrors(prev => ({ ...prev, password: 'يرجى إدخال كلمة المرور' }));
            return false;
        }
        setValidationErrors(prev => ({ ...prev, password: null }));
        return true;
    };

    const submit = (e) => {
        e.preventDefault();
        
        if (!validateEmail() || !validatePassword()) {
            return;
        }

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    // Subtle animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.4 }
        }
    };

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
            <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')" }}></div>

            <div className="relative min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
                <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            {/* Logo can go here */}
                        </div>
                        <Link href="/" >
                            <div className="ml-3 text-2xl font-bold text-green-600"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link href={route('register')} className="text-sm text-gray-600 hover:text-green-600 transition duration-150">
                            تسجيل حساب جديد
                        </Link>
                    </div>
                </div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="sm:mx-auto sm:w-full sm:max-w-md md:max-w-lg"
                >
                    <Head title="تسجيل الدخول" />

                    <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border border-gray-100">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">تسجيل الدخول</h1>
                            <p className="text-gray-600">أدخل بيانات حسابك للوصول إلى لوحة التحكم</p>
                        </div>

                        {status && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <motion.form 
                            onSubmit={submit} 
                            variants={formVariants}
                            className="space-y-6"
                        >
                            <div>
                                <InputLabel htmlFor="email" value="البريد الإلكتروني" className="text-gray-700" />
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="pl-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                        onBlur={validateEmail}
                                    />
                                </div>
                                <InputError message={errors.email || validationErrors.email} className="mt-2" />
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <InputLabel htmlFor="password" value="كلمة المرور" className="text-gray-700" />
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm font-medium text-green-600 hover:text-green-500"
                                        >
                                            نسيت كلمة المرور؟
                                        </Link>
                                    )}
                                </div>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="pl-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        onBlur={validatePassword}
                                    />
                                </div>
                                <InputError message={errors.password || validationErrors.password} className="mt-2" />
                            </div>

                            <div className="flex items-center">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        تذكرني
                                    </span>
                                </label>
                            </div>

                            <div>
                                <motion.button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    تسجيل الدخول
                                    <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </motion.button>
                            </div>
                        </motion.form>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            ليس لديك حساب؟{' '}
                            <Link href={route('register')} className="font-medium text-green-600 hover:text-green-500">
                                إنشاء حساب جديد
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg className="w-full h-16 text-green-100" viewBox="0 0 1440 120" fill="currentColor" preserveAspectRatio="none">
                        <path d="M0 0l48 8.9c48 8.6 144 26.6 240 31.1 96 4 192 -5 288 -9 96 -4.7 192 -4.7 288 0 96 4 192 13 288 13 96 0 192 -9 240 -13l48 -4v93H0V0z" />
                    </svg>
                </div>

                <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/3 -left-12 transform -translate-y-1/2 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/4 transform -translate-y-1/2 w-56 h-56 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

                <div className="absolute bottom-6 w-full text-center text-sm text-gray-600">
                    <p>© 2025 تطبيقك. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </div>
    );
}