<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Models\User;
use App\Services\Phone\MoroccanPhoneNormalizer;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    public function __invoke(ForgotPasswordRequest $request, MoroccanPhoneNormalizer $phones): JsonResponse
    {
        $login = trim($request->string('login')->toString());

        $user = $this->resolveUser($login, $phones);

        // Always return a generic success message (no account enumeration).
        if ($user && filled($user->email)) {
            Password::broker()->sendResetLink(['email' => $user->email]);
        }

        return response()->json([
            'message' => 'Si un compte correspondant existe avec une adresse e-mail, un lien de réinitialisation a été envoyé.',
        ]);
    }

    protected function resolveUser(string $login, MoroccanPhoneNormalizer $phones): ?User
    {
        if ($phones->looksLikePhone($login)) {
            $normalized = $phones->tryNormalize($login);

            return $normalized
                ? User::query()->where('phone', $normalized)->first()
                : null;
        }

        return User::query()->where('email', strtolower($login))->first();
    }
}
