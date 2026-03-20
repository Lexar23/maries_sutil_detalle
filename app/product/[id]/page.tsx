import { supabase } from "@/app/lib/supabaseClient";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/app/components/ProductDetailClient";
import { Metadata } from "next";
import { Product as DBProduct } from "@/app/interfaces/product";
import { products as staticProducts } from "@/app/lib/products";

// Revalidate every 10 minutes to keep it relatively fresh
export const revalidate = 600;

export async function generateStaticParams() {
    // from DB (preferred) + fallback to static local list
    const { data: dbProducts, error } = await supabase
        .from('products')
        .select('slug');

    const dbParam = Array.isArray(dbProducts)
        ? dbProducts.map((p) => ({ id: p.slug || '' })).filter((p) => p.id)
        : [];

    const staticParam = staticProducts.map((product) => ({ id: product.id }));

    const combined = [...dbParam, ...staticParam];
    const unique = Array.from(new Map(combined.map((p) => [p.id, p])).values());

    if (unique.length === 0) {
        // very fallback for safety
        return staticParam;
    }

    return unique;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { id } = params;

    const { data: productFromDb } = await supabase
        .from('products')
        .select('*')
        .eq('slug', id)
        .single();

    const product = productFromDb || staticProducts.find((p) => p.id === id);

    if (!product) return {};

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            images: [{ url: 'image_url' in product && product.image_url ? product.image_url : '/logo.png' }],
        },
    };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const { id } = params;

    const { data: productFromDb } = await supabase
        .from('products')
        .select('*')
        .eq('slug', id)
        .single();

    const product = productFromDb || staticProducts.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    // Convert DBProduct or fallback staticProduct to a product shape for ProductDetailClient.
    const isDbProduct = 'price' in product && typeof product.price === 'number';
    const priceNumber = isDbProduct
        ? product.price
        : parseInt(product.tiers?.[0]?.price.replace(/[^0-9]/g, '') || '0', 10);

    const adaptedProduct = {
        id: product.id,
        name: product.name,
        description: product.description,
        categoryId: 'category' in product ? product.category : product.categoryId,
        image: 'image_url' in product ? product.image_url || "/logo.png" : product.image || "/logo.png",
        tiers: 'tiers' in product ? product.tiers : [
            {
                type: "Base",
                price: `₡${priceNumber.toLocaleString('es-CR')}`,
                ingredients: []
            }
        ]
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: 'image_url' in product ? product.image_url : product.image,
        description: product.description,
        offers: {
            "@type": "Offer",
            price: priceNumber,
            priceCurrency: "CRC",
            availability: "https://schema.org/InStock",
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductDetailClient key={product.id} product={adaptedProduct as any} />
        </>
    );
}
