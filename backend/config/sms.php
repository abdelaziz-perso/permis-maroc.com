<?php

return [

    /*
    |--------------------------------------------------------------------------
    | SMS Driver
    |--------------------------------------------------------------------------
    |
    | Supported: "log"
    | Replace the binding in AppServiceProvider when a production SMS
    | provider is configured. Do not hard-code API credentials here.
    |
    */

    'driver' => env('SMS_DRIVER', 'log'),

    'log_channel' => env('SMS_LOG_CHANNEL', 'stack'),

    /*
    |--------------------------------------------------------------------------
    | OTP settings
    |--------------------------------------------------------------------------
    */

    'otp' => [
        'length' => 6,
        'expires_minutes' => (int) env('OTP_EXPIRES_MINUTES', 10),
        'max_attempts' => (int) env('OTP_MAX_ATTEMPTS', 5),
        // In non-local environments, never log the raw OTP.
        'log_raw_in_local' => env('APP_ENV') === 'local',
    ],

];
