<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPrivateInfo extends Model
{
    use HasFactory;
    protected $table = 'user_private_infos';
    protected $fillable = [
        'date_of_birth',
        'status',
        'gender',
        'phone_number',
        'address',
        'city',
        'state',
        'zip_code',
    ];
}
