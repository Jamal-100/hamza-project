<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\YearController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// صفحات Inertia
Route::get('/', fn() => Inertia::render('Home'));
Route::get('/CategoryAndCourse', fn() => Inertia::render('CategoryAndCourse'));
Route::get('/StudentCourses', fn() => Inertia::render('StudentCourses'));
Route::get('/TeachersCourses', fn() => Inertia::render('TeachersCourses'));
Route::get('/DetailsTeachersCourses', fn() => Inertia::render('DetailsTeachersCourses'));
Route::get('/FromHamza', fn() => Inertia::render('FromHamza'));

// لوحة التحكم
Route::get('/dashboard', fn() => Inertia::render('Dashboard/Dashboard'))
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// المجموعات المحمية بالمصادقة
Route::middleware(['auth'])->group(function () {
    // إدارة السنوات الأكاديمية
    Route::get('/ManagementAcademicYears', [YearController::class, 'index'])
        ->name('ManagementAcademicYears');

    Route::prefix('/api/academic-years')->group(function () {
        Route::get('/', [YearController::class, 'getAcademicYears']);
        Route::post('/', [YearController::class, 'store']);
        Route::put('/{id}', [YearController::class, 'update']);
        Route::delete('/{id}', [YearController::class, 'destroy']);
    });

    // الملف الشخصي
    Route::prefix('/profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

require __DIR__ . '/auth.php';
