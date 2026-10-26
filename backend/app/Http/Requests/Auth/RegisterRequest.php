<?php

namespace App\Http\Requests\Auth;

use App\Rules\MoroccanPhone;
use App\Services\Phone\MoroccanPhoneNormalizer;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Validator;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'string', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:30', new MoroccanPhone],
            'password' => ['required', 'confirmed', Password::defaults()],
            'preferred_language' => ['nullable', 'string', 'in:fr,ar,darija'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Le nom est requis.',
            'email.email' => 'Adresse e-mail invalide.',
            'email.unique' => 'Cette adresse e-mail est déjà utilisée.',
            'password.required' => 'Le mot de passe est requis.',
            'password.confirmed' => 'La confirmation du mot de passe ne correspond pas.',
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            $email = $this->input('email');
            $phone = $this->input('phone');

            if (blank($email) && blank($phone)) {
                $validator->errors()->add('email', 'Fournissez une adresse e-mail ou un numéro de téléphone.');
                $validator->errors()->add('phone', 'Fournissez une adresse e-mail ou un numéro de téléphone.');
            }

            if (filled($phone) && ! $validator->errors()->has('phone')) {
                $normalized = app(MoroccanPhoneNormalizer::class)->normalize($phone);

                if (\App\Models\User::query()->where('phone', $normalized)->exists()) {
                    $validator->errors()->add('phone', 'Ce numéro de téléphone est déjà utilisé.');
                }
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
