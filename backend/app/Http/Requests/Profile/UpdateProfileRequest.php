<?php

namespace App\Http\Requests\Profile;

use App\Rules\MoroccanPhone;
use App\Services\Phone\MoroccanPhoneNormalizer;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->user()->id;

        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => [
                'sometimes',
                'nullable',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'phone' => ['sometimes', 'nullable', 'string', 'max:30', new MoroccanPhone],
            'preferred_language' => ['sometimes', 'string', 'in:fr,ar,darija'],
            'audio_mode' => ['sometimes', 'boolean'],
            'avatar' => ['sometimes', 'nullable', 'string', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.unique' => 'Cette adresse e-mail est déjà utilisée.',
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            if (! $this->filled('phone') || $validator->errors()->has('phone')) {
                return;
            }

            $normalized = app(MoroccanPhoneNormalizer::class)->normalize($this->input('phone'));

            $exists = \App\Models\User::query()
                ->where('phone', $normalized)
                ->where('id', '!=', $this->user()->id)
                ->exists();

            if ($exists) {
                $validator->errors()->add('phone', 'Ce numéro de téléphone est déjà utilisé.');
            }
        });
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('email') && is_string($this->email)) {
            $this->merge([
                'email' => strtolower(trim($this->email)) ?: null,
            ]);
        }
    }
}
