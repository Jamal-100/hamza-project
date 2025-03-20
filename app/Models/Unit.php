<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    protected $fillable = [
        'title',
        'description',
        'semester_id',
    ];

    protected $with = ['semester'];

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }

    public function videos()
    {
        return $this->hasMany(Video::class);
    }
}
