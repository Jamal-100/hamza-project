<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('course_videos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->onDelete('cascade'); // 🔹 ربط الفيديو بالكورس
            $table->string('title'); // 🔹 عنوان الفيديو
            $table->text('description')->nullable(); // 🔹 وصف الفيديو
            $table->string('video_url'); // 🔹 رابط الفيديو
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_videos');
    }
};
