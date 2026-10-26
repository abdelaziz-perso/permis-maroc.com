<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticatedUserTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_endpoint_is_protected(): void
    {
        $this->getJson('/api/auth/user')->assertUnauthorized();
    }

    public function test_authenticated_user_can_fetch_profile(): void
    {
        $user = User::factory()->create([
            'email' => 'user@example.com',
        ]);

        $response = $this->actingAs($user)->getJson('/api/auth/user');

        $response->assertOk()
            ->assertJsonPath('user.email', 'user@example.com')
            ->assertJsonPath('user.id', $user->id);
    }

    public function test_logout(): void
    {
        User::factory()->create([
            'email' => 'user@example.com',
            'password' => 'password',
        ]);

        $this->postJson('/api/auth/login', [
            'login' => 'user@example.com',
            'password' => 'password',
        ])->assertOk();

        $this->assertAuthenticated();

        $this->postJson('/api/auth/logout')
            ->assertOk()
            ->assertJsonPath('message', 'Déconnexion réussie.');

        // Clear resolved guards between HTTP calls in the test harness.
        $this->app['auth']->forgetGuards();

        $this->getJson('/api/auth/user')->assertUnauthorized();
    }

    public function test_profile_update_requires_auth(): void
    {
        $this->putJson('/api/profile', ['name' => 'New'])->assertUnauthorized();
    }
}
