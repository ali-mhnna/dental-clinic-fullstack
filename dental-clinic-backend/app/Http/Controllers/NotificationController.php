<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use Illuminate\Http\JsonResponse;

class NotificationController extends Controller
{
    // عرض إشعارات المستخدم
    public function index(): JsonResponse
    {
        $notifications = auth()->user()->notifications()->latest()->get();

        return response()->json([
            'success' => true,
            'data' => NotificationResource::collection($notifications),
            'unread_count' => $notifications->where('is_read', false)->count(),
        ]);
    }

    // تعليم الإشعار كمقروء
    public function markAsRead($id): JsonResponse
    {
        $notification = auth()->user()->notifications()->find($id);

        if (!$notification) {
            return response()->json([
                'success' => false,
                'message' => 'الإشعار غير موجود',
            ], 404);
        }

        $notification->update(['is_read' => true]);

        return response()->json([
            'success' => true,
            'message' => 'تم تعليم الإشعار كمقروء',
        ]);
    }

    // تعليم جميع الإشعارات كمقروءة
    public function markAllAsRead(): JsonResponse
    {
        auth()->user()->notifications()->update(['is_read' => true]);

        return response()->json([
            'success' => true,
            'message' => 'تم تعليم جميع الإشعارات كمقروءة',
        ]);
    }
}