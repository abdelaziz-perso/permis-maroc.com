<?php

namespace App\Services\Sms;

use App\Contracts\SmsProviderInterface;
use Illuminate\Support\Facades\Log;

/**
 * Development SMS provider — logs messages locally.
 * Never enable as the production provider.
 */
class LogSmsProvider implements SmsProviderInterface
{
    public function send(string $phone, string $message): void
    {
        Log::channel(config('sms.log_channel', 'stack'))->info('SMS (dev)', [
            'phone' => $phone,
            'message' => $message,
        ]);
    }
}
