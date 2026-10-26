<?php

namespace Tests\Feature\Auth;

use App\Contracts\SmsProviderInterface;
use App\Models\PhoneOtp;
use App\Models\User;
use App\Services\Otp\PhoneOtpService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Mockery;
use Tests\TestCase;

class PhoneOtpTest extends TestCase
{
    use RefreshDatabase;

    public function test_send_and_verify_otp(): void
    {
        $sms = Mockery::mock(SmsProviderInterface::class);
        $sms->shouldReceive('send')->once();
        $this->app->instance(SmsProviderInterface::class, $sms);

        $user = User::factory()->phoneUnverified('+212612345678')->create();

        $this->actingAs($user)
            ->postJson('/api/auth/phone/send-code')
            ->assertOk();

        $otp = PhoneOtp::query()->where('user_id', $user->id)->latest('id')->first();
        $this->assertNotNull($otp);
        $this->assertNull($otp->consumed_at);

        // Recover plain code via service by creating a known hash for verify test
        $plain = '123456';
        $otp->forceFill(['code_hash' => Hash::make($plain)])->save();

        $this->actingAs($user)
            ->postJson('/api/auth/phone/verify', ['code' => $plain])
            ->assertOk()
            ->assertJsonPath('user.phone_verified_at', fn ($v) => ! is_null($v));

        $this->assertTrue($user->fresh()->hasVerifiedPhone());
        $this->assertNotNull($otp->fresh()->consumed_at);
    }

    public function test_otp_expiration(): void
    {
        $user = User::factory()->phoneUnverified('+212612345678')->create();

        $otp = PhoneOtp::query()->create([
            'user_id' => $user->id,
            'phone' => '+212612345678',
            'code_hash' => Hash::make('123456'),
            'attempts' => 0,
            'expires_at' => now()->subMinute(),
        ]);

        $this->actingAs($user)
            ->postJson('/api/auth/phone/verify', ['code' => '123456'])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['code']);

        $this->assertNotNull($otp->fresh()->consumed_at);
        $this->assertFalse($user->fresh()->hasVerifiedPhone());
    }

    public function test_otp_attempt_throttling(): void
    {
        config(['sms.otp.max_attempts' => 3]);

        $user = User::factory()->phoneUnverified('+212612345678')->create();

        PhoneOtp::query()->create([
            'user_id' => $user->id,
            'phone' => '+212612345678',
            'code_hash' => Hash::make('123456'),
            'attempts' => 0,
            'expires_at' => now()->addMinutes(10),
        ]);

        for ($i = 0; $i < 3; $i++) {
            $this->actingAs($user)
                ->postJson('/api/auth/phone/verify', ['code' => '000000'])
                ->assertStatus(422);
        }

        $this->actingAs($user)
            ->postJson('/api/auth/phone/verify', ['code' => '123456'])
            ->assertStatus(422);

        $this->assertFalse($user->fresh()->hasVerifiedPhone());
    }

    public function test_new_otp_invalidates_old(): void
    {
        $sms = Mockery::mock(SmsProviderInterface::class);
        $sms->shouldReceive('send')->twice();
        $this->app->instance(SmsProviderInterface::class, $sms);

        $user = User::factory()->phoneUnverified('+212612345678')->create();
        $service = app(PhoneOtpService::class);

        $service->send($user);
        $first = PhoneOtp::query()->where('user_id', $user->id)->latest('id')->first();

        // bypass per-minute throttle by calling service directly
        $service->send($user);
        $first->refresh();

        $this->assertNotNull($first->consumed_at);
        $this->assertSame(1, PhoneOtp::query()->where('user_id', $user->id)->whereNull('consumed_at')->count());
    }
}
