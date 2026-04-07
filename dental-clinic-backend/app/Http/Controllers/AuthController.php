<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // تسجيل مستخدم جديد
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'تم التسجيل بنجاح',
            'user' => new UserResource($user),
            'token' => $token,
        ], 201);
    }

    // تسجيل الدخول
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'تم تسجيل الدخول بنجاح',
            'user' => new UserResource($user),
            'token' => $token,
        ]);
    }

    // تسجيل الخروج
    public function logout(): JsonResponse
    {
        
        auth()->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'تم تسجيل الخروج بنجاح',
        ]);
    }

    // معلومات المستخدم الحالي
    public function user(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'user' => new UserResource(auth()->user()),
        ]);
    }
}