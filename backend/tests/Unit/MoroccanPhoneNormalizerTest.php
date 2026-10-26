<?php

namespace Tests\Unit;

use App\Services\Phone\MoroccanPhoneNormalizer;
use InvalidArgumentException;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class MoroccanPhoneNormalizerTest extends TestCase
{
    #[DataProvider('validNumbers')]
    public function test_normalizes_valid_numbers(string $input, string $expected): void
    {
        $normalizer = new MoroccanPhoneNormalizer;

        $this->assertSame($expected, $normalizer->normalize($input));
    }

    public static function validNumbers(): array
    {
        return [
            ['0612345678', '+212612345678'],
            ['0712345678', '+212712345678'],
            ['+212612345678', '+212612345678'],
            ['+212712345678', '+212712345678'],
            ['00212612345678', '+212612345678'],
            ['212612345678', '+212612345678'],
            ['06 12 34 56 78', '+212612345678'],
            ['+212 6 12 34 56 78', '+212612345678'],
        ];
    }

    #[DataProvider('invalidNumbers')]
    public function test_rejects_invalid_numbers(string $input): void
    {
        $this->expectException(InvalidArgumentException::class);

        (new MoroccanPhoneNormalizer)->normalize($input);
    }

    public static function invalidNumbers(): array
    {
        return [
            ['0512345678'],
            ['061234567'],
            ['+33123456789'],
            ['not-a-phone'],
            [''],
            ['12345'],
        ];
    }
}
