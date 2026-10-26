<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;

class EmailVerificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_resend_verification_email(): void
    {
        Notification::fake();

        $user = User::factory()->unverified()->create([
            'email' => 'user@example.com',
        ]);

        $this->actingAs($user)
            ->postJson('/api/auth/email/verification-notification')
            ->assertOk();

        Notification::assertSentTo($user, VerifyEmail::class);
    }

    public function test_can_verify_email_via_signed_link(): void
    {
        $user = User::factory()->unverified()->create([
            'email' => 'user@example.com',
        ]);

        $url = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            [
                'id' => $user->id,
                'hash' => sha1($user->email),
            ]
        );

        $this->getJson($url)
            ->assertOk()
            ->assertJsonPath('message', 'Adresse e-mail vérifiée avec succès.');

        $this->assertTrue($user->fresh()->hasVerifiedEmail());
    }
}
