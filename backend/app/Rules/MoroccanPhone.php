<?php

namespace App\Rules;

use App\Services\Phone\MoroccanPhoneNormalizer;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class MoroccanPhone implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value) || $value === '') {
            $fail('Le numéro de téléphone marocain est invalide.');

            return;
        }

        $normalizer = app(MoroccanPhoneNormalizer::class);

        if (! $normalizer->isValid($value)) {
            $fail('Le numéro de téléphone marocain est invalide.');
        }
    }
}
