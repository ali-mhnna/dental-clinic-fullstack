<?php

namespace App\Http\Controllers;

use App\Http\Requests\AppointmentRequest;
use App\Http\Requests\UpdateAppointmentRequest;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class AppointmentController extends Controller
{
    // عرض مواعيد المستخدم
    public function index(): JsonResponse
    {
        $appointments = auth()->user()->appointments()->latest()->get();

        return response()->json([
            'success' => true,
            'data' => AppointmentResource::collection($appointments),
        ]);
    }

    // إنشاء موعد جديد
public function store(AppointmentRequest $request): JsonResponse
{
    $appointment = Appointment::create([
        'user_id' => auth()->id(),
        'name' => $request->name,
        'phone' => $request->phone,
        'service_type' => $request->service_type,
        'message' => $request->message,
        'status' => 'new',
    ]);

    // إرسال إشعار للأدمن
    $admins = User::where('role', 'admin')->get();
    foreach ($admins as $admin) {
        Notification::create([
            'user_id' => $admin->id,
            'appointment_id' => $appointment->id,
            'message' => "طلب جديد من {$appointment->name} - {$appointment->service_type}",
        ]);
    }

    return response()->json([
        'success' => true,
        'message' => 'تم إرسال طلبك بنجاح',
        'data' => new AppointmentResource($appointment),
    ], 201);
}

    // عرض موعد محدد
    public function show($id): JsonResponse
    {
        $appointment = auth()->user()->appointments()->find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'الموعد غير موجود',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => new AppointmentResource($appointment),
        ]);
    }
}