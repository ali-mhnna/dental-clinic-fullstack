<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('phone');
            $table->enum('service_type', [
                'طب اسنان طارئ',
                'تنظيف وتبيض',
                'زراعة اسنان',
                'تقويم اسنان'
            ]);
            $table->text('message')->nullable();
            $table->enum('status', [
                'new',
                'reviewing', 
                'scheduled',
                'completed',
                'cancelled'
            ])->default('new');
            $table->date('appointment_date')->nullable();
            $table->time('appointment_time')->nullable();
            $table->text('admin_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};