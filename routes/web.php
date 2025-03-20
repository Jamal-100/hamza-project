<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\YearController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/', fn() => Inertia::render('Home'));
Route::get('/CategoryAndCourse', fn() => Inertia::render('CategoryAndCourse'));
Route::get('/StudentCourses', fn() => Inertia::render('StudentCourses'));
Route::get('/TeachersCourses', fn() => Inertia::render('TeachersCourses'));
Route::get('/DetailsTeachersCourses', fn() => Inertia::render('DetailsTeachersCourses'));
Route::get('/FromHamza', fn() => Inertia::render('FromHamza'));






Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/ManagementAcademicYears', function () {
    return Inertia::render('Dashboard/ManagementAcademicYears');
})->middleware(['auth', 'verified'])->name('ManagementAcademicYears');

Route::middleware(['auth'])->group(function () {
    Route::get('/academic-years', [YearController::class, 'index'])->name('academic-years.index');
    Route::get('/api/academic-years', [YearController::class, 'getAcademicYears']);
    Route::post('/api/academic-years', [YearController::class, 'store']);
    Route::put('/api/academic-years/{id}', [YearController::class, 'update']);
    Route::delete('/api/academic-years/{id}', [YearController::class, 'destroy']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
