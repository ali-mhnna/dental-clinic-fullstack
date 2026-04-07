<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'user_name' => $this->user->name,
            'user_email' => $this->user->email,
            'name' => $this->name,
            'phone' => $this->phone,
            'service_type' => $this->service_type,
            'message' => $this->message,
            'status' => $this->status,
            'appointment_date' => $this->appointment_date?->format('Y-m-d'),
            'appointment_time' => $this->appointment_time?->format('H:i'),
            'admin_notes' => $this->admin_notes,
            'created_at' => $this->created_at->format('Y-m-d H:i'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i'),
        ];
    }
}