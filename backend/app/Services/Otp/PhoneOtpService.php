<?php

namespace App\Services\Otp;

use App\Contracts\SmsProviderInterface;
use App\Models\PhoneOtp;
use App\Models\User;
use App\Services\Phone\MoroccanPhoneNormalizer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use RuntimeException;

class PhoneOtpService
{
    public function __construct(
        protected MoroccanPhoneNormalizer $phoneNormalizer,
        protected SmsProviderInterface $sms,
    ) {}

    public function send(User $user, ?string $rawPhone = null): void
    {
        $phone = $this->phoneNormalizer->normalize(
            $rawPhone ?? (string) $user->phone
        );

        if ($user->phone && $user->phone !== $phone) {
            throw ValidationException::withMessages([
                'phone' => ['Ce numéro ne correspond pas à votre compte.'],
            ]);
        }

        $plain = $this->generateCode();

        DB::transaction(function () use ($user, $phone, $plain) {
            PhoneOtp::query()
                ->where('user_id', $user->id)
                ->whereNull('consumed_at')
                ->update(['consumed_at' => now()]);

            PhoneOtp::query()->create([
                'user_id' => $user->id,
                'phone' => $phone,
                'code_hash' => Hash::make($plain),
                'attempts' => 0,
                'expires_at' => now()->addMinutes((int) config('sms.otp.expires_minutes', 10)),
            ]);
        });

        if (! $user->phone) {
            $user->forceFill(['phone' => $phone])->save();
        }

        $message = "Permis Maroc : votre code de vérification est {$plain}. Valable "
            .(int) config('sms.otp.expires_minutes', 10)
            .' minutes.';

        $this->sms->send($phone, $message);

        if (config('sms.otp.log_raw_in_local') && app()->environment('local')) {
            Log::debug('Phone OTP issued (local only)', [
                'user_id' => $user->id,
                'phone' => $phone,
            ]);
        }
    }

    public function verify(User $user, string $code): void
    {
        $code = trim($code);

        if (! preg_match('/^\d{6}$/', $code)) {
            throw ValidationException::withMessages([
                'code' => ['Le code de vérification est invalide.'],
            ]);
        }

        /** @var PhoneOtp|null $otp */
        $otp = PhoneOtp::query()
            ->where('user_id', $user->id)
            ->whereNull('consumed_at')
            ->latest('id')
            ->first();

        if (! $otp) {
            throw ValidationException::withMessages([
                'code' => ['Aucun code actif. Demandez un nouveau code.'],
            ]);
        }

        if ($otp->isExpired()) {
            $otp->forceFill(['consumed_at' => now()])->save();

            throw ValidationException::withMessages([
                'code' => ['Le code a expiré. Demandez un nouveau code.'],
            ]);
        }

        $maxAttempts = (int) config('sms.otp.max_attempts', 5);

        if ($otp->attempts >= $maxAttempts) {
            $otp->forceFill(['consumed_at' => now()])->save();

            throw ValidationException::withMessages([
                'code' => ['Trop de tentatives. Demandez un nouveau code.'],
            ]);
        }

        if (! Hash::check($code, $otp->code_hash)) {
            $otp->increment('attempts');

            if ($otp->fresh()->attempts >= $maxAttempts) {
                $otp->forceFill(['consumed_at' => now()])->save();
            }

            throw ValidationException::withMessages([
                'code' => ['Code incorrect.'],
            ]);
        }

        DB::transaction(function () use ($user, $otp) {
            $otp->forceFill(['consumed_at' => now()])->save();

            $user->forceFill([
                'phone' => $otp->phone,
                'phone_verified_at' => now(),
            ])->save();
        });
    }

    protected function generateCode(): string
    {
        $length = (int) config('sms.otp.length', 6);
        $max = (10 ** $length) - 1;

        try {
            return str_pad((string) random_int(0, $max), $length, '0', STR_PAD_LEFT);
        } catch (\Exception $e) {
            throw new RuntimeException('Unable to generate OTP.', 0, $e);
        }
    }
}
