<?php

namespace App\Services\Phone;

use InvalidArgumentException;

class MoroccanPhoneNormalizer
{
    /**
     * Normalize a Moroccan mobile number to canonical +212XXXXXXXXX form.
     *
     * Accepted inputs include:
     * - 0612345678 / 0712345678
     * - +212612345678 / +212712345678
     * - 00212612345678
     * - 212612345678
     *
     * @throws InvalidArgumentException
     */
    public function normalize(string $raw): string
    {
        $trimmed = trim($raw);

        if ($trimmed === '') {
            throw new InvalidArgumentException('Le numéro de téléphone est requis.');
        }

        // Keep leading + if present, strip other non-digits.
        $hasPlus = str_starts_with($trimmed, '+');
        $digits = preg_replace('/\D+/', '', $trimmed) ?? '';

        if ($digits === '') {
            throw new InvalidArgumentException('Numéro de téléphone marocain invalide.');
        }

        // 00212... → 212...
        if (str_starts_with($digits, '00')) {
            $digits = substr($digits, 2);
        }

        // Local 0XXXXXXXXX → 212XXXXXXXXX
        if (preg_match('/^0([67]\d{8})$/', $digits, $matches) === 1) {
            $digits = '212'.$matches[1];
        }

        // Already national without leading 0: 6/7 + 8 digits → prefix 212
        if (preg_match('/^([67]\d{8})$/', $digits, $matches) === 1) {
            $digits = '212'.$matches[1];
        }

        // Must be 212 + Moroccan mobile (6 or 7) + 8 more digits = 12 digits
        if (preg_match('/^212([67]\d{8})$/', $digits) !== 1) {
            throw new InvalidArgumentException('Numéro de téléphone marocain invalide.');
        }

        return '+'.$digits;
    }

    public function tryNormalize(?string $raw): ?string
    {
        if ($raw === null || trim($raw) === '') {
            return null;
        }

        try {
            return $this->normalize($raw);
        } catch (InvalidArgumentException) {
            return null;
        }
    }

    public function isValid(string $raw): bool
    {
        return $this->tryNormalize($raw) !== null;
    }

    /**
     * Heuristic: treat as phone when it looks like digits / Moroccan formats,
     * otherwise email.
     */
    public function looksLikePhone(string $login): bool
    {
        $value = trim($login);

        if ($value === '' || str_contains($value, '@')) {
            return false;
        }

        return (bool) preg_match('/^[\s\d+().\-]+$/', $value);
    }
}
