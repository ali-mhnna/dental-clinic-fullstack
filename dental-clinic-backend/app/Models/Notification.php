<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'appointment_id',
        'message',
        'is_read',
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];

    // العلاقة مع المستخدم
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // العلاقة مع الموعد
    public function appointment(): BelongsTo
    {
        return $this->belongsTo(Appointment::class);
    }
}