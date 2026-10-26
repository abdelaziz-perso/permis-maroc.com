<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_with_email(): void
    {
        User::factory()->create([
            'email' => 'user@example.com',
            'password' => 'password',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'login' => 'user@example.com',
            'password' => 'password',
        ]);

        $response->assertOk()
            ->assertJsonPath('user.email', 'user@example.com');

        $this->assertAuthenticated();
    }

    public function test_login_with_phone(): void
    {
        User::factory()->withPhone('+212612345678')->create([
            'password' => 'password',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'login' => '0612345678',
            'password' => 'password',
        ]);

        $response->assertOk()
            ->assertJsonPath('user.phone', '+212612345678');

        $this->assertAuthenticated();
    }

    public function test_wrong_password_returns_generic_message(): void
    {
        User::factory()->create([
            'email' => 'user@example.com',
            'password' => 'password',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'login' => 'user@example.com',
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['login']);

        $this->assertStringContainsString(
            'Email/téléphone ou mot de passe incorrect',
            $response->json('errors.login.0')
        );

        $this->assertGuest();
    }

    public function test_unknown_account_returns_generic_message(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'login' => 'nobody@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['login']);

        $this->assertGuest();
    }
}
