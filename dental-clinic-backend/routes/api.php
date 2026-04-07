<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AdminAppointmentController;
use App\Http\Controllers\NotificationController;


// المسارات العامة (بدون مصادقة)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/services', function () {
    return response()->json([
        'success' => true,
        'data' => \App\Models\Appointment::serviceTypes()
    ]);
});
Route::get('/statuses', function () {
    return response()->json([
        'success' => true,
        'data' => [
            ['value' => 'new', 'label' => 'جديد'],
            ['value' => 'reviewing', 'label' => 'قيد المراجعة'],
            ['value' => 'scheduled', 'label' => 'تم تحديد موعد'],
            ['value' => 'completed', 'label' => 'مكتمل'],
            ['value' => 'cancelled', 'label' => 'ملغي'],
        ]
    ]);
});
// المسارات المحمية (تحتاج تسجيل دخول)
Route::middleware('auth:sanctum')->group(function () {
    
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Appointments (User)
    Route::get('/appointments', [AppointmentController::class, 'index']);
    Route::post('/appointments', [AppointmentController::class, 'store']);
    Route::get('/appointments/{id}', [AppointmentController::class, 'show']);
    
    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    
    // Admin Routes
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('/appointments', [AdminAppointmentController::class, 'index']);
        Route::get('/appointments/{id}', [AdminAppointmentController::class, 'show']);
        Route::put('/appointments/{id}', [AdminAppointmentController::class, 'update']);
        Route::delete('/appointments/{id}', [AdminAppointmentController::class, 'destroy']);
    });
});