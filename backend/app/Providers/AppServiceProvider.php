<?php

namespace App\Providers;

use App\Contracts\SmsProviderInterface;
use App\Services\Sms\LogSmsProvider;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(SmsProviderInterface::class, function () {
            return match (config('sms.driver', 'log')) {
                default => new LogSmsProvider,
            };
        });
    }

    public function boot(): void
    {
        Password::defaults(fn () => Password::min(8));

        $this->configureRateLimiting();
        $this->configureAuthNotificationUrls();
    }

    protected function configureRateLimiting(): void
    {
        RateLimiter::for('auth-login', function (Request $request) {
            return Limit::perMinute(10)->by($request->ip());
        });

        RateLimiter::for('auth-register', function (Request $request) {
            return Limit::perMinute(5)->by($request->ip());
        });

        RateLimiter::for('auth-forgot', function (Request $request) {
            return Limit::perMinute(5)->by($request->ip());
        });

        RateLimiter::for('otp-send', function (Request $request) {
            return [
                Limit::perMinute(1)->by('otp-send|'.$request->user()?->id.'|'.$request->ip()),
                Limit::perHour(5)->by('otp-send-hour|'.$request->user()?->id),
            ];
        });

        RateLimiter::for('otp-verify', function (Request $request) {
            return Limit::perMinute(10)->by('otp-verify|'.$request->user()?->id.'|'.$request->ip());
        });
    }

    protected function configureAuthNotificationUrls(): void
    {
        $frontend = rtrim((string) config('app.frontend_url', env('FRONTEND_URL', 'http://localhost:3000')), '/');

        ResetPassword::createUrlUsing(function (object $notifiable, string $token) use ($frontend) {
            $email = urlencode($notifiable->getEmailForPasswordReset());

            return "{$frontend}/reinitialiser-mot-de-passe?token={$token}&email={$email}";
        });

        VerifyEmail::createUrlUsing(function (object $notifiable) use ($frontend) {
            $apiVerify = URL::temporarySignedRoute(
                'verification.verify',
                now()->addMinutes(60),
                [
                    'id' => $notifiable->getKey(),
                    'hash' => sha1($notifiable->getEmailForVerification()),
                ]
            );

            // Point the user to the frontend verification page which will call the signed API URL.
            return "{$frontend}/verification?url=".urlencode($apiVerify);
        });
    }
}
