<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'crm.view', 'crm.manage',
            'sales.view', 'sales.manage', 'sales.approve',
            'inventory.view', 'inventory.manage',
            'purchasing.view', 'purchasing.manage', 'purchasing.approve',
            'finance.view', 'finance.manage',
            'catalog.manage', 'website.manage',
            'reports.view', 'admin.full',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

        $map = [
            'super_admin' => $permissions,
            'ceo' => ['crm.view', 'sales.view', 'inventory.view', 'purchasing.view', 'finance.view', 'reports.view'],
            'sales_manager' => ['crm.view', 'crm.manage', 'sales.view', 'sales.manage', 'sales.approve', 'reports.view'],
            'sales_staff' => ['crm.view', 'crm.manage', 'sales.view', 'sales.manage'],
            'crm_staff' => ['crm.view', 'crm.manage'],
            'warehouse_manager' => ['inventory.view', 'inventory.manage', 'purchasing.view'],
            'warehouse_staff' => ['inventory.view', 'inventory.manage'],
            'purchasing_manager' => ['purchasing.view', 'purchasing.manage', 'purchasing.approve', 'inventory.view'],
            'purchasing_staff' => ['purchasing.view', 'purchasing.manage'],
            'finance_manager' => ['finance.view', 'finance.manage', 'sales.view', 'reports.view'],
            'accountant' => ['finance.view', 'finance.manage'],
        ];

        foreach ($map as $roleName => $perms) {
            $role = Role::findOrCreate($roleName);
            $role->syncPermissions($perms);
        }

        $admin = User::query()->where('email', 'admin@fabricflow.test')->first();
        if ($admin) {
            $admin->assignRole('super_admin');
        }
    }
}
