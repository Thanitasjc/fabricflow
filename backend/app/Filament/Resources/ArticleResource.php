<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ArticleResource\Pages;
use App\Models\Article;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ArticleResource extends Resource
{
    protected static ?string $model = Article::class;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';

    protected static ?string $navigationGroup = 'Website';

    protected static ?string $modelLabel = 'บทความ';

    protected static ?string $pluralModelLabel = 'บทความ';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('title')->label('หัวข้อ')->required()
                ->live(onBlur: true)
                ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state ?? ''))),
            Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true),
            Forms\Components\TextInput::make('category')->label('หมวดบทความ'),
            Forms\Components\TextInput::make('author')->label('ผู้เขียน'),
            Forms\Components\TextInput::make('read_time')->label('เวลาอ่าน'),
            Forms\Components\TextInput::make('excerpt')->label('สรุปสั้น')->columnSpanFull(),
            Forms\Components\RichEditor::make('content')->label('เนื้อหา')->columnSpanFull(),
            Forms\Components\FileUpload::make('image')
                ->label('รูปปก')
                ->image()
                ->disk(\App\Support\Media::diskName())
                ->directory('articles')
                ->visibility('public')
                ->imagePreviewHeight('200')
                ->openable()
                ->downloadable()
                ->helperText('กดเพื่อเลือกไฟล์รูปจากเครื่อง'),
            Forms\Components\DatePicker::make('published_at')->label('เผยแพร่เมื่อ'),
            Forms\Components\Toggle::make('is_published')->label('เผยแพร่')->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('รูป')
                    ->getStateUsing(fn (Article $record) => \App\Support\Media::url($record->image)),
                Tables\Columns\TextColumn::make('title')->label('หัวข้อ')->searchable(),
                Tables\Columns\IconColumn::make('is_published')->boolean()->label('เผยแพร่'),
                Tables\Columns\TextColumn::make('published_at')->dateTime('d/m/Y')->label('วันที่'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListArticles::route('/'),
            'create' => Pages\CreateArticle::route('/create'),
            'edit' => Pages\EditArticle::route('/{record}/edit'),
        ];
    }
}
