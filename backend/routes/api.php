<?php

use App\Http\Controllers\Api\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Api\Auth\ForgotPasswordController;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\LogoutController;
use App\Http\Controllers\Api\Auth\PhoneVerificationController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\Auth\ResetPasswordController;
use App\Http\Controllers\Api\Auth\UserController;
use App\Http\Controllers\Api\Auth\VerifyEmailController;
use App\Http\Controllers\Api\ProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', RegisterController::class)
        ->middleware('throttle:auth-register');

    Route::post('/login', LoginController::class)
        ->middleware('throttle:auth-login');

    Route::post('/forgot-password', ForgotPasswordController::class)
        ->middleware('throttle:auth-forgot');

    Route::post('/reset-password', ResetPasswordController::class)
        ->middleware('throttle:auth-forgot');

    Route::get('/email/verify/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', LogoutController::class);
        Route::get('/user', UserController::class);

        Route::post('/email/verification-notification', EmailVerificationNotificationController::class)
            ->middleware('throttle:6,1');

        Route::post('/phone/send-code', [PhoneVerificationController::class, 'send'])
            ->middleware('throttle:otp-send');

        Route::post('/phone/verify', [PhoneVerificationController::class, 'verify'])
            ->middleware('throttle:otp-verify');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);
});
