<?php

namespace App\Filament\Pages;

use App\Models\SiteSetting;
use App\Support\Media;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class ManageSiteBranding extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-paint-brush';

    protected static ?string $navigationGroup = 'Website';

    protected static ?string $navigationLabel = 'Logo / Branding';

    protected static ?string $title = 'โลโก้และแบรนด์';

    protected static ?int $navigationSort = 1;

    protected static string $view = 'filament.pages.manage-site-branding';

    public ?array $data = [];

    public function mount(): void
    {
        $branding = SiteSetting::branding();

        $this->form->fill([
            'logo' => $branding['logo'],
            'brand_name' => $branding['brandName'],
            'brand_accent' => $branding['brandAccent'],
            'brand_tagline' => $branding['tagline'],
            'show_brand_text' => $branding['showText'],
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('โลโก้ Header')
                    ->description('อัปโหลดรูปโลโก้ และ/หรือแสดงชื่อแบรนด์เป็นข้อความ — ใช้ได้ทั้งคู่พร้อมกัน')
                    ->schema([
                        Forms\Components\FileUpload::make('logo')
                            ->label('รูปโลโก้')
                            ->image()
                            ->disk(\App\Support\Media::diskName())
                            ->directory('branding')
                            ->visibility('public')
                            ->imagePreviewHeight('120')
                            ->panelLayout('integrated')
                            ->openable()
                            ->downloadable()
                            ->helperText('แนะนำ PNG โปร่งใส ความสูงประมาณ 80–120px')
                            ->columnSpanFull(),
                        Forms\Components\Toggle::make('show_brand_text')
                            ->label('แสดงข้อความชื่อแบรนด์')
                            ->default(true)
                            ->helperText('ปิดได้ถ้าต้องการแสดงเฉพาะรูปโลโก้'),
                        Forms\Components\TextInput::make('brand_name')
                            ->label('ชื่อแบรนด์')
                            ->required()
                            ->maxLength(80)
                            ->default('FabricFlow')
                            ->helperText('เช่น FabricFlow'),
                        Forms\Components\TextInput::make('brand_accent')
                            ->label('ส่วนสีเน้น (accent)')
                            ->maxLength(40)
                            ->default('Flow')
                            ->helperText('ถ้าชื่อลงท้ายด้วยคำนี้ จะถูกเน้นด้วยสี primary เช่น Flow ใน FabricFlow'),
                        Forms\Components\TextInput::make('brand_tagline')
                            ->label('แท็กไลน์ใต้โลโก้ (ไม่บังคับ)')
                            ->maxLength(120)
                            ->placeholder('Premium Textile'),
                    ])
                    ->columns(2),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $state = $this->form->getState();
        $logo = $state['logo'] ?? null;
        if (is_array($logo)) {
            $logo = array_values($logo)[0] ?? null;
        }

        SiteSetting::setMany([
            'logo' => $logo,
            'brand_name' => $state['brand_name'] ?? 'FabricFlow',
            'brand_accent' => $state['brand_accent'] ?? '',
            'brand_tagline' => $state['brand_tagline'] ?? '',
            'show_brand_text' => ! empty($state['show_brand_text']),
        ]);

        Notification::make()
            ->title('บันทึกโลโก้ / แบรนด์เรียบร้อย')
            ->success()
            ->send();
    }

    public function getPreviewLogoUrl(): ?string
    {
        $logo = $this->data['logo'] ?? null;

        if (is_array($logo)) {
            $logo = array_values($logo)[0] ?? null;
        }

        return Media::url(is_string($logo) ? $logo : null);
    }
}
