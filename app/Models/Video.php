<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $fillable = [
        'title',
        'url',
        'unit_id',
        'description',
        'file_path'
    ];

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }
}
