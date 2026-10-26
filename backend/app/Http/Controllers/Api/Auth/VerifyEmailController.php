<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VerifyEmailController extends Controller
{
    public function __invoke(Request $request, int $id, string $hash): JsonResponse
    {
        $user = User::query()->findOrFail($id);

        if (! hash_equals(sha1((string) $user->getEmailForVerification()), $hash)) {
            return response()->json([
                'message' => 'Lien de vérification invalide.',
            ], 403);
        }

        if (! $request->hasValidSignature()) {
            return response()->json([
                'message' => 'Lien de vérification expiré ou invalide.',
            ], 403);
        }

        if (! $user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            event(new Verified($user));
        }

        return response()->json([
            'message' => 'Adresse e-mail vérifiée avec succès.',
            'user' => $user->fresh()->toAuthArray(),
        ]);
    }
}
