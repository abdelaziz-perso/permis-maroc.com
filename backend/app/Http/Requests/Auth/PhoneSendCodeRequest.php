<?php

namespace App\Http\Requests\Auth;

use App\Rules\MoroccanPhone;
use Illuminate\Foundation\Http\FormRequest;

class PhoneSendCodeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'phone' => ['nullable', 'string', 'max:30', new MoroccanPhone],
        ];
    }
}
