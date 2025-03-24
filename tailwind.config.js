import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        "./node_modules/flyonui/dist/js/*.js",
        "./node_modules/flyonui/dist/js/accordion.js"
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            animation: {
                floating: "floating 3s infinite ease-in-out",
            },
            keyframes: {
                floating: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
        },
    },

    plugins: [
        forms,
        require('tailwindcss-motion'),
        require('flyonui'), // إضافة FlyonUI
        require("flyonui/plugin"), // Require only if you want to use FlyonUI JS component
        require('tailwind-scrollbar')
    ],

    flyonui: {
        themes: [
            {
                mytheme: {  // إنشاء ثيم جديد باسم "mytheme"
                    primary: "#16A34A",  // أخضر أساسي
                    secondary: "#22C55E", // أخضر فاتح
                    accent: "#15803D",    // أخضر داكن
                    neutral: "#1E293B",   // لون محايد داكن
                    "base-100": "#F0FDF4" // خلفية فاتحة
                }
            },
            "dark",  // ثيم الوضع الليلي
            "gourmet"  // ثيم آخر جاهز
        ]
    }
};
