<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    public function test_forgot_password_sends_reset_link_for_email_accounts(): void
    {
        Notification::fake();

        $user = User::factory()->create([
            'email' => 'user@example.com',
        ]);

        $this->postJson('/api/auth/forgot-password', [
            'login' => 'user@example.com',
        ])->assertOk();

        Notification::assertSentTo($user, ResetPassword::class);
    }

    public function test_forgot_password_does_not_reveal_missing_accounts(): void
    {
        $this->postJson('/api/auth/forgot-password', [
            'login' => 'missing@example.com',
        ])->assertOk();
    }

    public function test_password_can_be_reset(): void
    {
        $user = User::factory()->create([
            'email' => 'user@example.com',
        ]);

        $token = Password::broker()->createToken($user);

        $this->postJson('/api/auth/reset-password', [
            'token' => $token,
            'email' => 'user@example.com',
            'password' => 'NewStrongPassword',
            'password_confirmation' => 'NewStrongPassword',
        ])->assertOk();

        $this->postJson('/api/auth/login', [
            'login' => 'user@example.com',
            'password' => 'NewStrongPassword',
        ])->assertOk();
    }
}
