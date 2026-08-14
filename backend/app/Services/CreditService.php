<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\Order;
use RuntimeException;

class CreditService
{
    public function assertCanOrder(Customer $customer, float $orderTotal): void
    {
        if ((float) $customer->credit_limit <= 0) {
            return;
        }

        $available = $customer->availableCredit();

        if ($orderTotal > $available) {
            throw new RuntimeException(
                "เครดิตไม่พอสำหรับ {$customer->name} (ใช้ได้ {$available} / วงเงิน {$customer->credit_limit})"
            );
        }
    }

    public function consume(Customer $customer, float $amount): void
    {
        $customer->increment('credit_used', $amount);
    }

    public function release(Customer $customer, float $amount): void
    {
        $customer->update([
            'credit_used' => max(0, (float) $customer->credit_used - $amount),
        ]);
    }

    public function consumeForOrder(Order $order): void
    {
        $order->loadMissing('customer');
        $this->assertCanOrder($order->customer, (float) $order->total);
        $this->consume($order->customer, (float) $order->total);
    }

    public function releaseForOrder(Order $order): void
    {
        $order->loadMissing('customer');
        $this->release($order->customer, (float) $order->total);
    }
}
