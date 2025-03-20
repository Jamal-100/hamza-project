<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseVideo extends Model
{
    protected $fillable = ['course_id', 'title', 'description', 'video_url'];
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
