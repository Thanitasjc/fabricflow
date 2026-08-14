<x-filament-panels::page>
    <form wire:submit="save" class="space-y-6">
        {{ $this->form }}

        <div class="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <p class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-200">ตัวอย่าง Header</p>
            <div class="inline-flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
                @if ($this->getPreviewLogoUrl())
                    <img
                        src="{{ $this->getPreviewLogoUrl() }}"
                        alt="Logo preview"
                        class="h-10 w-auto object-contain"
                    />
                @endif
                @if ($data['show_brand_text'] ?? true)
                    <div class="flex flex-col leading-tight">
                        <span class="text-xl font-bold tracking-tight text-[#031F3D]">
                            @php
                                $name = $data['brand_name'] ?? 'FabricFlow';
                                $accent = $data['brand_accent'] ?? '';
                                $base = $accent !== '' && str_ends_with($name, $accent)
                                    ? substr($name, 0, -strlen($accent))
                                    : $name;
                                $accentPart = $accent !== '' && str_ends_with($name, $accent) ? $accent : '';
                            @endphp
                            {{ $base }}@if($accentPart)<span class="text-[#073B73]">{{ $accentPart }}</span>@endif
                        </span>
                        @if (!empty($data['brand_tagline']))
                            <span class="mt-0.5 text-xs text-gray-500">{{ $data['brand_tagline'] }}</span>
                        @endif
                    </div>
                @endif
            </div>
        </div>

        <x-filament::button type="submit">
            บันทึก
        </x-filament::button>
    </form>
</x-filament-panels::page>
