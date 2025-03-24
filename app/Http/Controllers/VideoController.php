<?php

namespace App\Http\Controllers;

use App\Models\Video;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;


class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $units = Unit::with(['semester', 'videos'])->get();
        
        return Inertia::render('Videos/VideoManagement', [
            'units' => $units
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $unitId = $request->query('unit_id');
        $unit = null;
        
        if ($unitId) {
            $unit = Unit::with('semester')->find($unitId);
        }
        
        $units = Unit::with('semester')->get();
        
        return Inertia::render('Videos/CreateVideo', [
            'units' => $units,
            'selectedUnit' => $unit
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'video_file' => 'required|file|mimes:mp4,mov,avi,wmv', 
            'unit_id' => 'required|exists:units,id',
            'description' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // تخزين ملف الفيديو
        $videoPath = $request->file('video_file')->store('videos', 'public');
        
        // إنشاء سجل الفيديو مع مسار الملف
        Video::create([
            'title' => $request->title,
            'url' => Storage::url($videoPath),
            'unit_id' => $request->unit_id,
            'description' => $request->description,
            'file_path' => $videoPath,
        ]);

        return redirect()->route('videos.index')->with('success', 'تم إضافة الفيديو بنجاح');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Video $video)
    {
        $units = Unit::with('semester')->get();
        
        return Inertia::render('Videos/EditVideo', [
            'video' => $video,
            'units' => $units
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Video $video)
    {
        $rules = [
            'title' => 'required|string|max:255',
            'unit_id' => 'required|exists:units,id',
            'description' => 'nullable|string'
        ];
        
        // إذا تم تقديم ملف فيديو جديد
        if ($request->hasFile('video_file')) {
            $rules['video_file'] = 'file|mimes:mp4,mov,avi,wmv|max:102400'; // 100MB max
        }
        
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $data = [
            'title' => $request->title,
            'unit_id' => $request->unit_id,
            'description' => $request->description,
        ];
        
        // إذا تم تقديم ملف فيديو جديد
        if ($request->hasFile('video_file')) {
            // حذف الملف القديم إذا كان موجودًا
            if ($video->file_path) {
                Storage::disk('public')->delete($video->file_path);
            }
            
            // تخزين الملف الجديد
            $videoPath = $request->file('video_file')->store('videos', 'public');
            $data['url'] = Storage::url($videoPath);
            $data['file_path'] = $videoPath;
        }

        $video->update($data);

        return redirect()->route('videos.index')->with('success', 'تم تحديث الفيديو بنجاح');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Video $video)
    {
        // حذف ملف الفيديو من التخزين
        if ($video->file_path) {
            Storage::disk('public')->delete($video->file_path);
        }
        
        $video->delete();

        return redirect()->route('videos.index')->with('success', 'تم حذف الفيديو بنجاح');
    }

      public function play(Video $video)
      {
          return Inertia::render('Videos/PlayVideo', [
              'video' => $video
          ]);
      }


}
