<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'reference_token'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public static function generateReferenceToken(): string
    {
        $characters = array_merge(range('A', 'Z'), range('0', '9'));

        do {
            $id = collect(range(1, 8))
                ->map(fn() => $characters[array_rand($characters)])
                ->implode('');

            $exists = DB::table('users')->where('reference_token', $id)->exists();
        } while ($exists);

        return $id;
    }

    public function getIsAgentAttribute(): bool
    {
        return !empty($this->reference_token);
    }

    public function getReferalLinkAttribute(): string
    {
        return url('client-register') . '?ref=' . $this->reference_token;
    }
}
