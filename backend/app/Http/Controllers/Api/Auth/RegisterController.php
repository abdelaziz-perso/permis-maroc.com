<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Services\Phone\MoroccanPhoneNormalizer;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    public function __invoke(RegisterRequest $request, MoroccanPhoneNormalizer $phones): JsonResponse
    {
        $data = $request->validated();

        $email = filled($data['email'] ?? null)
            ? strtolower(trim($data['email']))
            : null;

        $phone = filled($data['phone'] ?? null)
            ? $phones->normalize($data['phone'])
            : null;

        $user = User::query()->create([
            'name' => $data['name'],
            'email' => $email,
            'phone' => $phone,
            'password' => $data['password'],
            'preferred_language' => $data['preferred_language'] ?? 'fr',
            'email_verified_at' => null,
            'phone_verified_at' => null,
        ]);

        event(new Registered($user));

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Compte créé avec succès.',
            'user' => $user->fresh()->toAuthArray(),
        ], 201);
    }
}
