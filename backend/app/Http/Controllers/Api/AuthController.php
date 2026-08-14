<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\User;
use App\Support\DocumentNumber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:120', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:40'],
            'password' => ['required', 'confirmed', Password::defaults()],
            'account_type' => ['nullable', 'in:retail,wholesale'],
        ]);

        $accountType = $data['account_type'] ?? 'retail';

        $result = DB::transaction(function () use ($data, $accountType) {
            $customer = Customer::query()->create([
                'code' => DocumentNumber::customer(),
                'name' => $data['name'],
                'type' => $accountType,
                'price_tier' => $accountType === 'wholesale' ? 'wholesale' : 'retail',
                'phone' => $data['phone'] ?? null,
                'email' => $data['email'],
                'credit_limit' => $accountType === 'wholesale' ? 100000 : 0,
                'payment_terms_days' => $accountType === 'wholesale' ? 30 : 0,
                'is_active' => true,
            ]);

            $user = User::query()->create([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
                'account_type' => $accountType,
                'customer_id' => $customer->id,
                'password' => $data['password'],
            ]);

            return $user;
        });

        $token = $result->createToken('portal')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $this->userPayload($result->fresh('customer')),
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::query()->where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['อีเมลหรือรหัสผ่านไม่ถูกต้อง'],
            ]);
        }

        $token = $user->createToken('portal')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $this->userPayload($user->load('customer')),
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'user' => $this->userPayload($request->user()->load('customer')),
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json(['ok' => true]);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'phone' => ['nullable', 'string', 'max:40'],
        ]);

        $user->update($data);

        if ($user->customer) {
            $user->customer->update([
                'name' => $data['name'],
                'phone' => $data['phone'] ?? $user->customer->phone,
            ]);
        }

        return response()->json([
            'user' => $this->userPayload($user->fresh('customer')),
        ]);
    }

    private function userPayload(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'accountType' => $user->account_type,
            'customer' => $user->customer ? [
                'id' => $user->customer->id,
                'code' => $user->customer->code,
                'name' => $user->customer->name,
                'type' => $user->customer->type,
                'priceTier' => $user->customer->price_tier,
                'creditLimit' => (float) $user->customer->credit_limit,
                'creditUsed' => (float) $user->customer->credit_used,
                'availableCredit' => $user->customer->availableCredit(),
                'paymentTermsDays' => $user->customer->payment_terms_days,
            ] : null,
        ];
    }
}
