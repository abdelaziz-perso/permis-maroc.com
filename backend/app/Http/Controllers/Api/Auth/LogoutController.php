<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $user = $request->user();

        Auth::guard('web')->logout();

        if ($request->hasSession()) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        if ($user && method_exists($user, 'tokens')) {
            // Revoke personal access tokens if the client used token auth.
            $user->tokens()->delete();
        }

        return response()->json([
            'message' => 'Déconnexion réussie.',
        ]);
    }
}
