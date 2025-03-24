<?php
namespace App\Http\Controllers;

use App\Http\Requests\AcademicYear\StoreAcademicYearRequest;
use App\Http\Requests\AcademicYear\UpdateAcademicYearRequest;
use App\Http\Resources\AcademicYearCollection;
use App\Http\Resources\AcademicYearResource;
use App\Models\Year;
use Inertia\Inertia;
use Illuminate\Http\JsonResponse;

class YearController extends Controller
{
    /**
     * عرض صفحة إدارة السنوات الدراسية
     */
    public function index()
    {
        return Inertia::render('Dashboard/ManagementAcademicYears');
    }

    /**
     * الحصول على جميع السنوات الدراسية
     */
    public function getAcademicYears(): JsonResponse
    {
        $academicYears = Year::all();
        
        return response()->json(new AcademicYearCollection($academicYears));
    }

    /**
     * إضافة سنة دراسية جديدة
     */
    public function store(StoreAcademicYearRequest $request): JsonResponse
    {
        $validated = $request->validated();
        
        $year = Year::create($validated);
        
        return response()->json([
            'message' => 'تمت إضافة السنة الدراسية بنجاح',
            'data' => new AcademicYearResource($year)
        ], 201);
    }

    /**
     * تحديث سنة دراسية محددة
     */
    public function update(UpdateAcademicYearRequest $request, $id): JsonResponse
    {
        // جلب السنة الدراسية أو إرجاع خطأ 404 إذا لم تكن موجودة
        $academicYear = Year::findOrFail($id);
        
        // تحديث البيانات باستخدام القيم القادمة من الفورم ريكويست
        $academicYear->update($request->validated());
    
        // إرجاع استجابة JSON مع البيانات الجديدة
        return response()->json([
            'message' => 'تم تحديث السنة الدراسية بنجاح',
            'data' => new AcademicYearResource($academicYear)
        ]);
    }

    /**
     * حذف سنة دراسية محددة
     */
    public function destroy($id)
   {
       $academicYear = Year::findOrFail($id);
       $academicYear->delete();

       return response()->json(['message' => 'تم حذف السنة الدراسية بنجاح']);
   }
}