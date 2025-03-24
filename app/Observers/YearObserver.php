<?php

namespace App\Observers;

use App\Models\Year;
use App\Models\Semester;
use App\Models\Unit;

class YearObserver
{
    /**
     * Handle the Year "created" event.
     */
    public function created(Year $year)
{
    $firstSemester = Semester::create([
        'year_id' => $year->id,
        'semester' => 'First Semester', 
    ]);

    $secondSemester = Semester::create([
        'year_id' => $year->id,
        'semester' => 'Second Semester', 
    ]);

    for ($i = 1; $i <= 5; $i++) {
        Unit::create([
            'semester_id' => $firstSemester->id,
            'title' => "Unit $i - First Semester of {$year->year}",
            'description' => "This is unit $i for the First Semester of {$year->year}",
        ]);
    }
    for ($i = 1; $i <= 5; $i++) {
        Unit::create([
            'semester_id' => $secondSemester->id,
            'title' => "Unit $i - Second Semester of {$year->year}",
            'description' => "This is unit $i for the Second Semester of {$year->year}",
        ]);
    }
}

    /**
     * Handle the Year "updated" event.
     */
    public function updated(Year $year): void
    {
        //
    }

    /**
     * Handle the Year "deleted" event.
     */
    public function deleted(Year $year): void
    {
        //
    }

    /**
     * Handle the Year "restored" event.
     */
    public function restored(Year $year): void
    {
        //
    }

    /**
     * Handle the Year "force deleted" event.
     */
    public function forceDeleted(Year $year): void
    {
        //
    }
}
