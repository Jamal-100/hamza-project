<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'category_id',
        // 'year_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // public function year()
    // {
    //     return $this->belongsTo(Year::class);
    // }

    public function users()
    {
        return $this->belongsToMany(User::class, 'course_user')->withPivot('is_active');
    }

    public function videos()
    {
        return $this->hasMany(CourseVideo::class);
    }
}
