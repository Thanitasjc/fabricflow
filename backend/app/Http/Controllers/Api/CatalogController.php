<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Brand;
use App\Models\Category;
use App\Models\ContactMessage;
use App\Models\HeroSlide;
use App\Models\Industry;
use App\Models\Product;
use App\Models\Service;
use App\Models\MenuItem;
use App\Models\SiteSetting;
use App\Support\Media;
use Illuminate\Http\Request;

class CatalogController extends Controller
{
    public function categories()
    {
        return Category::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Category $c) => [
                'id' => $c->slug,
                'slug' => $c->slug,
                'nameTh' => $c->name_th,
                'nameEn' => $c->name_en,
                'image' => Media::url($c->image),
            ]);
    }

    public function products(Request $request)
    {
        $query = Product::query()
            ->with(['category', 'colors', 'industries'])
            ->where('is_active', true);

        if ($request->filled('category')) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $request->string('category')));
        }

        if ($request->filled('industry')) {
            $query->whereHas('industries', fn ($q) => $q->where('slug', $request->string('industry')));
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        if ($search = $request->string('q')->toString()) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%");
            });
        }

        return $query->latest('id')->get()->map(fn (Product $p) => $this->productPayload($p));
    }

    public function product(string $slug)
    {
        $product = Product::query()
            ->with(['category', 'colors', 'industries'])
            ->where('is_active', true)
            ->where(fn ($q) => $q->where('slug', $slug)->orWhere('sku', $slug))
            ->firstOrFail();

        return $this->productPayload($product);
    }

    public function industries()
    {
        return Industry::query()
            ->where('is_active', true)
            ->with('collections')
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Industry $i) => $this->industryPayload($i));
    }

    public function industry(string $slug)
    {
        $industry = Industry::query()
            ->where('is_active', true)
            ->with('collections')
            ->where('slug', $slug)
            ->firstOrFail();

        return $this->industryPayload($industry);
    }

    public function articles()
    {
        return Article::query()
            ->where('is_published', true)
            ->latest('published_at')
            ->get()
            ->map(fn (Article $a) => $this->articlePayload($a));
    }

    public function article(string $slug)
    {
        $article = Article::query()
            ->where('is_published', true)
            ->where('slug', $slug)
            ->firstOrFail();

        return $this->articlePayload($article);
    }

    public function services()
    {
        return Service::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Service $s) => $this->servicePayload($s));
    }

    public function service(string $slug)
    {
        $service = Service::query()
            ->where('is_active', true)
            ->where('slug', $slug)
            ->firstOrFail();

        return $this->servicePayload($service);
    }

    public function brands()
    {
        return Brand::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Brand $b) => $this->brandPayload($b));
    }

    public function brand(string $slug)
    {
        $brand = Brand::query()
            ->where('is_active', true)
            ->where('slug', $slug)
            ->firstOrFail();

        return $this->brandPayload($brand);
    }

    public function heroSlides()
    {
        return HeroSlide::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn (HeroSlide $s) => [
                'id' => $s->id,
                'eyebrow' => $s->eyebrow,
                'titleLine1' => $s->title_line_1,
                'titleLine2' => $s->title_line_2,
                'description' => $s->description,
                'image' => Media::url($s->image),
                'primaryCta' => [
                    'label' => $s->primary_cta_label,
                    'url' => $s->primary_cta_url,
                ],
                'secondaryCta' => [
                    'label' => $s->secondary_cta_label,
                    'url' => $s->secondary_cta_url,
                ],
            ]);
    }

    public function storeContact(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'phone' => ['nullable', 'string', 'max:40'],
            'email' => ['nullable', 'email', 'max:120'],
            'topic' => ['nullable', 'string', 'max:120'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $message = ContactMessage::create($data);

        return response()->json([
            'ok' => true,
            'id' => $message->id,
        ], 201);
    }

    private function productPayload(Product $p): array
    {
        return [
            'id' => $p->slug,
            'sku' => $p->sku,
            'name' => $p->name,
            'slug' => $p->slug,
            'material' => $p->material,
            'width' => $p->width,
            'color' => $p->color,
            'retailPrice' => (float) $p->retail_price,
            'wholesalePrice' => (float) $p->wholesale_price,
            'inStock' => $p->in_stock,
            'stockMeters' => $p->stock_meters,
            'badge' => $p->badge,
            'image' => Media::url($p->image),
            'description' => $p->description,
            'isFeatured' => $p->is_featured,
            'categoryId' => $p->category?->slug,
            'industryIds' => $p->industries->pluck('slug')->values(),
            'colors' => $p->colors->map(fn ($c) => [
                'id' => $c->id,
                'name' => $c->name,
                'code' => $c->code,
                'image' => Media::url($c->image),
                'inStock' => $c->in_stock,
                'retailPrice' => $c->retail_price !== null ? (float) $c->retail_price : null,
                'wholesalePrice' => $c->wholesale_price !== null ? (float) $c->wholesale_price : null,
            ]),
        ];
    }

    private function industryPayload(Industry $i): array
    {
        return [
            'id' => $i->slug,
            'slug' => $i->slug,
            'nameTh' => $i->name_th,
            'nameEn' => $i->name_en,
            'description' => $i->description,
            'intro' => $i->intro,
            'guideTitle' => $i->guide_title,
            'guideBody' => $i->guide_body ?? [],
            'image' => Media::url($i->image),
            'collections' => $i->collections->map(fn ($c) => [
                'id' => $c->id,
                'name' => $c->name,
                'description' => $c->description,
                'image' => Media::url($c->image),
            ]),
        ];
    }

    private function brandPayload(Brand $b): array
    {
        return [
            'id' => $b->slug,
            'slug' => $b->slug,
            'name' => $b->name,
            'nameTh' => $b->name_th,
            'tagline' => $b->tagline,
            'description' => $b->description,
            'image' => Media::url($b->image),
            'logo' => Media::url($b->logo),
            'websiteUrl' => $b->website_url,
            'country' => $b->country,
            'isFeatured' => (bool) $b->is_featured,
        ];
    }

    public function branding()
    {
        $branding = SiteSetting::branding();

        return [
            'logo' => Media::url($branding['logo']),
            'brandName' => $branding['brandName'],
            'brandAccent' => $branding['brandAccent'],
            'tagline' => $branding['tagline'] ?: null,
            'showText' => (bool) $branding['showText'],
        ];
    }

    public function menus(Request $request)
    {
        $location = $request->string('location', 'header')->toString();

        return MenuItem::query()
            ->whereNull('parent_id')
            ->where('location', $location)
            ->where('is_active', true)
            ->with(['activeChildren' => fn ($q) => $q->orderBy('sort_order')])
            ->orderBy('sort_order')
            ->get()
            ->map(fn (MenuItem $item) => $this->menuPayload($item))
            ->values();
    }

    private function menuPayload(MenuItem $item): array
    {
        return [
            'id' => $item->id,
            'label' => $item->label,
            'href' => $item->href,
            'type' => $item->type,
            'openInNewTab' => (bool) $item->open_in_new_tab,
            'children' => $item->activeChildren
                ->map(fn (MenuItem $child) => [
                    'id' => $child->id,
                    'label' => $child->label,
                    'href' => $child->href,
                    'type' => $child->type,
                    'openInNewTab' => (bool) $child->open_in_new_tab,
                    'children' => [],
                ])
                ->values()
                ->all(),
        ];
    }

    private function articlePayload(Article $a): array
    {
        return [
            'id' => $a->slug,
            'slug' => $a->slug,
            'title' => $a->title,
            'category' => $a->category,
            'author' => $a->author,
            'readTime' => $a->read_time,
            'publishedAt' => optional($a->published_at)?->toDateString(),
            'excerpt' => $a->excerpt,
            'content' => $a->content,
            'image' => Media::url($a->image),
        ];
    }

    private function servicePayload(Service $s): array
    {
        return [
            'id' => $s->slug,
            'slug' => $s->slug,
            'eyebrow' => $s->eyebrow,
            'title' => $s->title,
            'shortLabel' => $s->short_label,
            'subtitle' => $s->subtitle,
            'image' => Media::url($s->image),
            'highlights' => $s->highlights ?? [],
            'body' => $s->body ?? [],
        ];
    }
}
