<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => null,
            'email_verified_at' => now(),
            'phone_verified_at' => null,
            'password' => static::$password ??= Hash::make('password'),
            'preferred_language' => 'fr',
            'audio_mode' => false,
            'avatar' => null,
            'remember_token' => Str::random(10),
        ];
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    public function withPhone(string $phone = '+212612345678'): static
    {
        return $this->state(fn (array $attributes) => [
            'email' => null,
            'phone' => $phone,
            'email_verified_at' => null,
            'phone_verified_at' => now(),
        ]);
    }

    public function phoneUnverified(string $phone = '+212612345678'): static
    {
        return $this->state(fn (array $attributes) => [
            'email' => null,
            'phone' => $phone,
            'email_verified_at' => null,
            'phone_verified_at' => null,
        ]);
    }
}
