<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Year extends Model
{
    protected $fillable = [
        'year',
    ];

    // protected static function boot() {
    //     parent::boot();
    //     static::created(function ($year) {
    //         foreach (['First semester', 'Second Semester'] as $semesterName) {
    //             $semester = $year->semesters()->create(['name' => $semesterName]);

    //             for ($i = 1; $i <= 5; $i++) {
    //                 $semester->units()->create(['name' => "unit $i"]);
    //             }
    //         }
    //     });
    // }

    // public function courses()
    // {
    //     return $this->hasMany(Course::class);
    // }

    public function semesters()
    {
        return $this->hasMany(Semester::class);
    }
}
