<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\YearController;
use App\Enums\RolesEnum;

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/ManagementAcademicYears', [YearController::class, 'index'])
        ->name('ManagementAcademicYears');

    Route::prefix('/api/academic-years')->group(function () {
        Route::get('/', [YearController::class, 'getAcademicYears']);
        Route::post('/', [YearController::class, 'store']);
        Route::put('/{id}', [YearController::class, 'update']);
        Route::delete('/{id}', [YearController::class, 'destroy']);
    });
});