<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Unit;
use App\Models\Semester;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $units = Unit::with(['semester', 'videos'])->get();
        
        return Inertia::render('Units/UnitManagement', [
            'units' => $units
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $semesters = Semester::all();
        
        return Inertia::render('Units/CreateUnit', [
            'semesters' => $semesters
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'semester_id' => 'required|exists:semesters,id',
            'description' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        Unit::create($request->all());

        return redirect()->route('units.index')->with('success', 'تم إضافة الوحدة بنجاح');
    }

    /**
     * Display the specified resource.
     */


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Unit $unit)
    {
        $semesters = Semester::all();
        
        return Inertia::render('Units/EditUnit', [
            'unit' => $unit,
            'semesters' => $semesters
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Unit $unit)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'semester_id' => 'required|exists:semesters,id',
            'description' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $unit->update($request->all());

        return redirect()->route('units.index')->with('success', 'تم تحديث الوحدة بنجاح');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Unit $unit)
    {
        // You might want to check if the unit has videos before deleting
        if ($unit->videos()->count() > 0) {
            return back()->with('error', 'لا يمكن حذف الوحدة لأنها تحتوي على فيديوهات');
        }
        
        $unit->delete();

        return redirect()->route('units.index')->with('success', 'تم حذف الوحدة بنجاح');
    }

}
