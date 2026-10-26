<?php

use Illuminate\Database\Migrations\Migration;

/**
 * Auth fields are defined in the base users migration.
 * This migration is retained as a no-op for upgrade paths that already ran
 * the stock Laravel users schema; extend it when migrating legacy databases.
 */
return new class extends Migration
{
    public function up(): void
    {
        //
    }

    public function down(): void
    {
        //
    }
};
