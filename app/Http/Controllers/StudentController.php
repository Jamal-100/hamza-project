<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Unit;
use App\Models\Year;
use App\Models\Semester;
use App\Models\Video;



class StudentController extends Controller
{
    public function courses()
    {
        $units = Unit::with(['semester', 'videos'])->get();
        
        return Inertia::render('Dashboard/StudentCourses', [
            'units' => $units
        ]);
    }

    public function getYears()
    {
        $years = Year::orderBy('year', 'desc')->get();
        return response()->json($years);
    }

    /**
     * الحصول على الفصول الدراسية لسنة معينة
     */
    public function getSemestersByYear($yearId)
    {
        $semesters = Semester::where('year_id', $yearId)
            ->orderBy('semester', 'asc')
            ->get();
        
        return response()->json($semesters);
    }

    /**
     * الحصول على الوحدات لفصل دراسي معين
     */
    public function getUnitsBySemester($semesterId)
    {
        $units = Unit::where('semester_id', $semesterId)
            ->orderBy('title', 'asc')
            ->get();
        
        return response()->json($units);
    }

    /**
     * الحصول على الفيديوهات لوحدة معينة
     */
    public function getVideosByUnit($unitId)
    {
        $videos = Video::where('unit_id', $unitId)
            ->orderBy('title', 'asc')
            ->get();
        
        return response()->json($videos);
    }

    
}
