<?php

namespace App\Filament\Resources\StockLotResource\Pages;

use App\Filament\Resources\StockLotResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditStockLot extends EditRecord
{
    protected static string $resource = StockLotResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\DeleteAction::make()];
    }
}