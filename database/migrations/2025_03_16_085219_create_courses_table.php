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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('image')->nullable();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            // $table->foreignId('year_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('course_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // 🔹 المستخدم المسجل في الكورس
            $table->foreignId('course_id')->constrained()->onDelete('cascade'); // 🔹 الكورس الذي سجّل فيه المستخدم
            $table->boolean('is_active')->default(false); // 🔹 الافتراضي غير مفعل
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
