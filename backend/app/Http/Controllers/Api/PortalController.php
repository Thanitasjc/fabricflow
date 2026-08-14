<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Order;
use App\Models\Quotation;
use Illuminate\Http\Request;

class PortalController extends Controller
{
    public function dashboard(Request $request)
    {
        $customerId = $request->user()->customer_id;

        if (! $customerId) {
            return response()->json([
                'stats' => [
                    'orders' => 0,
                    'quotations' => 0,
                    'invoices' => 0,
                    'openOrders' => 0,
                ],
                'recentOrders' => [],
                'recentQuotations' => [],
            ]);
        }

        return response()->json([
            'stats' => [
                'orders' => Order::query()->where('customer_id', $customerId)->count(),
                'quotations' => Quotation::query()->where('customer_id', $customerId)->count(),
                'invoices' => Invoice::query()->where('customer_id', $customerId)->count(),
                'openOrders' => Order::query()
                    ->where('customer_id', $customerId)
                    ->whereIn('status', ['draft', 'confirmed', 'shipped'])
                    ->count(),
            ],
            'recentOrders' => Order::query()
                ->where('customer_id', $customerId)
                ->latest()
                ->limit(5)
                ->get(['id', 'number', 'status', 'total', 'order_date', 'created_at']),
            'recentQuotations' => Quotation::query()
                ->where('customer_id', $customerId)
                ->latest()
                ->limit(5)
                ->get(['id', 'number', 'status', 'total', 'valid_until', 'created_at']),
        ]);
    }

    public function orders(Request $request)
    {
        $customerId = $request->user()->customer_id;

        return Order::query()
            ->where('customer_id', $customerId)
            ->with('items.product:id,sku,name')
            ->latest()
            ->get();
    }

    public function quotations(Request $request)
    {
        $customerId = $request->user()->customer_id;

        return Quotation::query()
            ->where('customer_id', $customerId)
            ->with('items.product:id,sku,name')
            ->latest()
            ->get();
    }

    public function invoices(Request $request)
    {
        $customerId = $request->user()->customer_id;

        return Invoice::query()
            ->where('customer_id', $customerId)
            ->latest()
            ->get();
    }
}
