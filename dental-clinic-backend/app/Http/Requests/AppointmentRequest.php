<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Appointment;

class AppointmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|min:3|max:255',
            'phone' => 'required|string|min:10|max:20',
            'service_type' => 'required|in:' . implode(',', Appointment::serviceTypes()),
            'message' => 'nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'الاسم مطلوب',
            'name.min' => 'الاسم يجب أن يكون 3 أحرف على الأقل',
            'phone.required' => 'رقم الهاتف مطلوب',
            'phone.min' => 'رقم الهاتف يجب أن يكون 10 أرقام على الأقل',
            'service_type.required' => 'نوع الخدمة مطلوب',
            'service_type.in' => 'نوع الخدمة غير صحيح',
            'message.max' => 'الرسالة طويلة جداً',
        ];
    }
}