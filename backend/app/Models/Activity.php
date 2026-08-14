<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Activity extends Model
{
    public const TYPES = [
        'call' => 'โทร',
        'meeting' => 'นัดหมาย',
        'note' => 'โน้ต',
        'follow_up' => 'Follow-up',
        'email' => 'อีเมล',
        'task' => 'งาน',
    ];

    protected $fillable = [
        'type', 'subject', 'body', 'status', 'due_at', 'done_at',
        'owner_user_id', 'related_type', 'related_id',
    ];

    protected $casts = [
        'due_at' => 'datetime',
        'done_at' => 'datetime',
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_user_id');
    }

    public function related(): MorphTo
    {
        return $this->morphTo();
    }
}
