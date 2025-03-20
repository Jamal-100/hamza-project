<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Year extends Model
{
    protected $fillable = [
        'year',
    ];

    public function semesters()
    {
        return $this->hasMany(Semester::class);
    }
}
