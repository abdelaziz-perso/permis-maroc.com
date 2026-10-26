<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\UpdatePasswordRequest;
use App\Http\Requests\Profile\UpdateProfileRequest;
use App\Services\Phone\MoroccanPhoneNormalizer;
use Illuminate\Http\JsonResponse;

class ProfileController extends Controller
{
    public function update(UpdateProfileRequest $request, MoroccanPhoneNormalizer $phones): JsonResponse
    {
        $user = $request->user();
        $data = $request->validated();

        if (array_key_exists('phone', $data) && filled($data['phone'])) {
            $normalized = $phones->normalize($data['phone']);

            if ($user->phone !== $normalized) {
                $data['phone'] = $normalized;
                $data['phone_verified_at'] = null;
            } else {
                unset($data['phone']);
            }
        }

        if (array_key_exists('email', $data) && $data['email'] !== $user->email) {
            $data['email_verified_at'] = null;
        }

        $user->fill($data);

        // phone_verified_at / email_verified_at may be set above but are not fillable.
        if (array_key_exists('phone_verified_at', $data)) {
            $user->phone_verified_at = $data['phone_verified_at'];
        }
        if (array_key_exists('email_verified_at', $data)) {
            $user->email_verified_at = $data['email_verified_at'];
        }

        $user->save();

        return response()->json([
            'message' => 'Profil mis à jour.',
            'user' => $user->fresh()->toAuthArray(),
        ]);
    }

    public function updatePassword(UpdatePasswordRequest $request): JsonResponse
    {
        // password cast is 'hashed' — pass the plain password once.
        $request->user()->forceFill([
            'password' => $request->string('password')->toString(),
        ])->save();

        return response()->json([
            'message' => 'Mot de passe mis à jour.',
        ]);
    }
}
