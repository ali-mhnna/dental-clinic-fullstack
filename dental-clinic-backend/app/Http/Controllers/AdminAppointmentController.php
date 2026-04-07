<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateAppointmentRequest;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use App\Models\Notification;
use Illuminate\Http\JsonResponse;

class AdminAppointmentController extends Controller
{
    // عرض جميع المواعيد
    public function index(): JsonResponse
    {
        $appointments = Appointment::with('user')->latest()->get();

        return response()->json([
            'success' => true,
            'data' => AppointmentResource::collection($appointments),
        ]);
    }

    // عرض موعد محدد
    public function show($id): JsonResponse
    {
        $appointment = Appointment::with('user')->find($id);

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

    // تحديث الموعد
    public function update(UpdateAppointmentRequest $request, $id): JsonResponse
    {
        $appointment = Appointment::find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'الموعد غير موجود',
            ], 404);
        }

        $appointment->update($request->validated());

        // إنشاء إشعار إذا تم تحديد موعد
        if ($request->appointment_date && $request->appointment_time) {
            Notification::create([
                'user_id' => $appointment->user_id,
                'appointment_id' => $appointment->id,
                'message' => "تم تحديد موعدك ليوم {$appointment->appointment_date->format('Y-m-d')} الساعة {$appointment->appointment_time}",
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'تم تحديث الموعد بنجاح',
            'data' => new AppointmentResource($appointment->fresh()),
        ]);
    }

    // حذف موعد
    public function destroy($id): JsonResponse
    {
        $appointment = Appointment::find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'الموعد غير موجود',
            ], 404);
        }

        $appointment->delete();

        return response()->json([
            'success' => true,
            'message' => 'تم حذف الموعد بنجاح',
        ]);
    }
}