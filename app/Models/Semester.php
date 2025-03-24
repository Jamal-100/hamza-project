<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    protected $fillable = [
        'year_id',
        'semester',
    ];

    protected $with = ['year'];

    public function year()
    {
        return $this->belongsTo(Year::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'semester_user');
    }

    public function units()
    {
        return $this->hasMany(Unit::class);
    }
}
