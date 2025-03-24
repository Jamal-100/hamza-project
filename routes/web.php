<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\YearController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UnitController;
use Illuminate\Support\Facades\Route;
use App\Enum\RolesEnum;
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


// API Routes for Student Courses
Route::prefix('api')->group(function () {
    // Get all years
    Route::get('/years', [StudentController::class, 'getYears']);
    
    // Get semesters by year
    Route::get('/years/{year}/semesters', [StudentController::class, 'getSemestersByYear']);
    
    // Get units by semester
    Route::get('/semesters/{semester}/units', [StudentController::class, 'getUnitsBySemester']);
    
    // Get videos by unit
    Route::get('/units/{unit}/videos', [StudentController::class, 'getVideosByUnit']);
});

// Web route للوصول إلى صفحة المقررات الدراسية للطلاب
Route::middleware(['auth'])->group(function () {
    Route::get('/student/courses', [StudentController::class, 'courses'])->name('student-courses');
});
    

    // Route::middleware(['auth'])->group(function () {
    //     Route::get('/student-courses', [StudentController::class, 'index'])->name('studentcourses');
    
    // });
    

    Route::middleware(['auth'])->group(function () {
        Route::get('/videos', [VideoController::class, 'index'])->name('videos.index');
        Route::get('/videos/create', [VideoController::class, 'create'])->name('videos.create');
        Route::post('/videos', [VideoController::class, 'store'])->name('videos.store');
        Route::get('/videos/{video}/edit', [VideoController::class, 'edit'])->name('videos.edit');
        Route::put('/videos/{video}', [VideoController::class, 'update'])->name('videos.update');
        Route::delete('/videos/{video}', [VideoController::class, 'destroy'])->name('videos.destroy');
        Route::get('/videos/{video}/play', [VideoController::class, 'play'])->name('videos.play');
                // Route::resource('videos', VideoController::class);
    });

    Route::get('videos/{video}/play', [VideoController::class, 'play'])->name('videos.play');


    // Route::middleware(['auth', 'role:admin'])->group(function () {
    //     Route::get('/VideoManagement', [VideoController::class, 'index'])
    //     ->name('VideoManagement');
        
    //     Route::prefix('/api/VideoManagement')->group(function () {
    //         Route::get('/', [VideoController::class, 'getAcademicYears']);
    //         Route::get('/create', [VideoController::class, 'create'])->name('video.create');
    //         Route::post('/', [VideoController::class, 'store']);
    //         Route::put('/{id}', [VideoController::class, 'update']);
    //         Route::delete('/{id}', [VideoController::class, 'destroy']);
    //     });
    // });



Route::middleware(['auth'])->group(function () {
    Route::prefix('/profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
    
});


require __DIR__ . '/auth.php';
require __DIR__ . '/years.php';
