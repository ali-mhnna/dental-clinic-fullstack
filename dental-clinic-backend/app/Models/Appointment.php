<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'phone',
        'service_type',
        'message',
        'status',
        'appointment_date',
        'appointment_time',
        'admin_notes',
    ];

    protected $casts = [
        'appointment_date' => 'date',
        'appointment_time' => 'datetime:H:i',
    ];

    // العلاقة مع المستخدم
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // العلاقة مع الإشعارات
    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    // أنواع الخدمات المتاحة
    public static function serviceTypes(): array
    {
        return [
            'طب اسنان طارئ',
            'تنظيف وتبيض',
            'زراعة اسنان',
            'تقويم اسنان'
        ];
    }
}