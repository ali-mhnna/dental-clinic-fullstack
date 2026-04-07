<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAppointmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'status' => 'sometimes|in:new,reviewing,scheduled,completed,cancelled',
            'appointment_date' => 'nullable|date|after_or_equal:today',
            'appointment_time' => 'nullable|date_format:H:i',
            'admin_notes' => 'nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'status.in' => 'حالة الموعد غير صحيحة',
            'appointment_date.date' => 'تاريخ الموعد غير صحيح',
            'appointment_date.after_or_equal' => 'تاريخ الموعد يجب أن يكون اليوم أو بعده',
            'appointment_time.date_format' => 'وقت الموعد غير صحيح (مثال: 10:30)',
            'admin_notes.max' => 'الملاحظات طويلة جداً',
        ];
    }
}