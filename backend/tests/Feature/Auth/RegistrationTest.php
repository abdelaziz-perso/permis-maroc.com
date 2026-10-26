<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_register_with_email(): void
    {
        Notification::fake();

        $response = $this->postJson('/api/auth/register', [
            'name' => 'Yassine',
            'email' => 'user@example.com',
            'password' => 'StrongPassword',
            'password_confirmation' => 'StrongPassword',
        ]);

        $response->assertCreated()
            ->assertJsonPath('user.email', 'user@example.com')
            ->assertJsonPath('user.phone', null);

        $this->assertDatabaseHas('users', [
            'email' => 'user@example.com',
            'name' => 'Yassine',
        ]);

        $this->assertAuthenticated();

        Notification::assertSentTo(User::first(), VerifyEmail::class);
    }

    public function test_register_with_moroccan_phone(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Yassine',
            'phone' => '0612345678',
            'password' => 'StrongPassword',
            'password_confirmation' => 'StrongPassword',
        ]);

        $response->assertCreated()
            ->assertJsonPath('user.phone', '+212612345678')
            ->assertJsonPath('user.email', null);

        $this->assertDatabaseHas('users', [
            'phone' => '+212612345678',
        ]);
    }

    public function test_duplicate_email_rejected(): void
    {
        User::factory()->create(['email' => 'user@example.com']);

        $response = $this->postJson('/api/auth/register', [
            'name' => 'Yassine',
            'email' => 'user@example.com',
            'password' => 'StrongPassword',
            'password_confirmation' => 'StrongPassword',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_duplicate_phone_rejected(): void
    {
        User::factory()->withPhone('+212612345678')->create();

        $response = $this->postJson('/api/auth/register', [
            'name' => 'Yassine',
            'phone' => '0612345678',
            'password' => 'StrongPassword',
            'password_confirmation' => 'StrongPassword',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['phone']);
    }

    public function test_requires_email_or_phone(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Yassine',
            'password' => 'StrongPassword',
            'password_confirmation' => 'StrongPassword',
        ]);

        $response->assertStatus(422);
    }

    public function test_invalid_moroccan_phone_rejected(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Yassine',
            'phone' => '0512345678',
            'password' => 'StrongPassword',
            'password_confirmation' => 'StrongPassword',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['phone']);
    }
}
