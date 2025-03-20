<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Models\Year;


class YearController extends Controller
{
   // جلب جميع السنوات الدراسية
   public function getAcademicYears()
   {
       return response()->json(Year::all());
   }



   // إضافة سنة دراسية جديدة
   public function store(Request $request)
   {
       $validated = $request->validate([
           'year' => 'required|unique:years,year|max:255',
       ]);

       Year::create($validated);

       return response()->json(['message' => 'تمت إضافة السنة الدراسية بنجاح']);
   }

   // تعديل سنة دراسية
   public function update(Request $request, $id)
   {
       $academicYear = Year::findOrFail($id);

       $validated = $request->validate([
           'year' => 'required|unique:years,year,' . $id . '|max:255',
       ]);

       $academicYear->update($validated);

       return response()->json(['message' => 'تم تحديث السنة الدراسية بنجاح']);
   }

   // حذف سنة دراسية
   public function destroy($id)
   {
       $academicYear = Year::findOrFail($id);
       $academicYear->delete();

       return response()->json(['message' => 'تم حذف السنة الدراسية بنجاح']);
   }
}
