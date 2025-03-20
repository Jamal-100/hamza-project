import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function DashboardLayout({ children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Check if the screen size is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);


    // Sidebar items with beautiful icons
    const sidebarItems = [
        { name: 'لوحة التحكم', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', href: route('dashboard') },
        { name: 'المستخدمين', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', href: '#' },
        { name: 'التقارير', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', href: '#' },
        { name: 'الإعدادات', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', href: '#' },
        { name: 'المساعدة', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', href: '#' },
        { name: 'اضافة سنة دراسية', icon: 'M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z', href: route('ManagementAcademicYears') },
    ];

    // Function to close sidebar when a link is clicked on mobile
    const handleSidebarLinkClick = () => {
        if (isMobile) {
            setSidebarOpen(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans" dir="rtl">
            {/* Overlay for mobile when sidebar is open */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`${
                    sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                } fixed inset-y-0 right-0 z-30 w-64 transform overflow-y-auto bg-gradient-to-br from-green-700 to-green-900 transition duration-300 ease-in-out lg:static lg:translate-x-0 shadow-xl`}
            >
                {/* Sidebar header with beautiful logo area */}
                <div className="flex h-16 items-center justify-between border-b border-green-600/30 px-4">
                    <div className="flex items-center">
                        <ApplicationLogo className="h-9 w-9 text-white filter drop-shadow-md" />
                        <span className="mx-3 text-lg font-bold text-white">لوحة التحكم</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-green-200 hover:text-white transition duration-150 lg:hidden focus:outline-none"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Sidebar links with hover effects and active states */}
                <nav className="mt-6 px-3">
                    {sidebarItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            onClick={handleSidebarLinkClick}
                            className={`mb-2 flex items-center rounded-lg p-3 text-sm font-medium transition-all duration-200 
                                ${route().current('dashboard') && item.name === 'لوحة التحكم' 
                                    ? 'bg-green-600/80 text-white shadow-md' 
                                    : 'text-green-100 hover:bg-green-600/50 hover:text-white'}`}
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                            </svg>
                            <span className="mx-3">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                {/* User profile with enhanced styling */}
                <div className="absolute bottom-0 w-full border-t border-green-600/30 bg-green-800/30 p-4">
                    <Link href={route('profile.edit')} className="flex items-center rounded-lg p-2 transition-colors duration-200 hover:bg-green-700/50">
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-green-600 ring-2 ring-white/30 flex items-center justify-center shadow-lg">
                            <span className="text-white font-medium">{user.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="mx-3">
                            <p className="text-sm font-medium text-white">{user.name}</p>
                            <p className="text-xs text-green-200 truncate max-w-32">{user.email}</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Right side container */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top Navigation with glass effect */}
                <header className="z-10 bg-white/90 backdrop-blur-sm shadow-sm">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-6">
                        {/* Hamburger menu for mobile */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="text-gray-500 hover:text-green-600 transition-colors duration-150 focus:outline-none lg:hidden"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        {/* Search bar with enhanced styling */}
                        <div className="mx-4 hidden md:block lg:w-96">
                            <div className="relative">
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </span>
                                <input
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pr-10 pl-4 text-sm text-gray-700 placeholder-gray-400 focus:border-green-500 focus:bg-white focus:ring focus:ring-green-200 focus:ring-opacity-50 transition duration-150"
                                    type="text"
                                    placeholder="البحث..."
                                />
                            </div>
                        </div>

                        {/* User dropdown and notifications with badges */}
                        <div className="relative flex items-center space-x-3 space-x-reverse">
                            {/* Notification icon with badge */}
                            <button className="relative text-gray-500 hover:text-green-600 transition-colors duration-150">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">3</span>
                            </button>

                            {/* User dropdown with enhanced styling */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-lg border border-transparent bg-white/90 px-3 py-2 text-sm font-medium leading-4 text-gray-700 transition duration-150 ease-in-out hover:text-green-700 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-green-200"
                                        >
                                            {user.name}

                                            <svg
                                                className="mr-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link
                                        href={route('profile.edit')}
                                    >
                                        الملف الشخصي
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        تسجيل الخروج
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                {/* Main content with better spacing */}
                <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
                    <div className="container mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}