<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Services\Phone\MoroccanPhoneNormalizer;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function __invoke(LoginRequest $request, MoroccanPhoneNormalizer $phones): JsonResponse
    {
        $this->ensureIsNotRateLimited($request);

        $login = trim($request->string('login')->toString());
        $user = $this->resolveUser($login, $phones);

        if (! $user || ! Hash::check($request->string('password')->toString(), $user->password)) {
            RateLimiter::hit($this->throttleKey($request), 60);

            throw ValidationException::withMessages([
                'login' => ['Email/téléphone ou mot de passe incorrect.'],
            ]);
        }

        RateLimiter::clear($this->throttleKey($request));

        Auth::login($user, $request->boolean('remember'));
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Connexion réussie.',
            'user' => $user->toAuthArray(),
        ]);
    }

    protected function resolveUser(string $login, MoroccanPhoneNormalizer $phones): ?User
    {
        if ($phones->looksLikePhone($login)) {
            $normalized = $phones->tryNormalize($login);

            if (! $normalized) {
                return null;
            }

            return User::query()->where('phone', $normalized)->first();
        }

        return User::query()->where('email', strtolower($login))->first();
    }

    protected function ensureIsNotRateLimited(LoginRequest $request): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey($request), 5)) {
            return;
        }

        $seconds = RateLimiter::availableIn($this->throttleKey($request));

        throw ValidationException::withMessages([
            'login' => [
                'Trop de tentatives. Réessayez dans '.$seconds.' secondes.',
            ],
        ]);
    }

    protected function throttleKey(LoginRequest $request): string
    {
        return Str::transliterate(Str::lower($request->string('login')->toString()).'|'.$request->ip());
    }
}
