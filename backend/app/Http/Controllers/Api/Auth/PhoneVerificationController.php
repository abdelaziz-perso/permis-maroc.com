<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\PhoneSendCodeRequest;
use App\Http\Requests\Auth\PhoneVerifyRequest;
use App\Services\Otp\PhoneOtpService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PhoneVerificationController extends Controller
{
    public function send(PhoneSendCodeRequest $request, PhoneOtpService $otp): JsonResponse
    {
        $user = $request->user();

        $otp->send($user, $request->input('phone'));

        return response()->json([
            'message' => 'Code de vérification envoyé.',
        ]);
    }

    public function verify(PhoneVerifyRequest $request, PhoneOtpService $otp): JsonResponse
    {
        $user = $request->user();

        $otp->verify($user, $request->string('code')->toString());

        return response()->json([
            'message' => 'Numéro de téléphone vérifié.',
            'user' => $user->fresh()->toAuthArray(),
        ]);
    }
}
