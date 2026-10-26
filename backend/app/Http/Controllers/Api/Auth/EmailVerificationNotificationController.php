<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user->email) {
            return response()->json([
                'message' => 'Aucun e-mail associé à ce compte.',
            ], 422);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Adresse e-mail déjà vérifiée.',
            ]);
        }

        $user->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Lien de vérification envoyé.',
        ]);
    }
}
