import { supabase } from "@/app/lib/supabaseClient";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/app/components/ProductDetailClient";
import { Metadata } from "next";
import { Product as DBProduct } from "@/app/interfaces/product";
import { products as staticProducts } from "@/app/lib/products";

// Revalidate every 10 minutes to keep it relatively fresh
export const revalidate = 600;

export async function generateStaticParams() {
    // Fallback to static products for build time params
    return staticProducts.map((product) => ({
        id: product.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('slug', id)
        .single();

    if (!product) return {};

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            images: [{ url: product.image_url || '/logo.png' }],
        },
    };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    // Attempt to get product from DB
    const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('slug', id)
        .single();

    if (!product) {
        notFound();
    }

    // Convert DBProduct to the interface ProductDetailClient expects (Legacy compatibility)
    // In a full transition, ProductDetailClient should also be refactored to use DBProduct
    const adaptedProduct = {
        id: product.id,
        name: product.name,
        description: product.description,
        categoryId: product.category,
        image: product.image_url || "/logo.png",
        tiers: [
            {
                type: "Base",
                price: `₡${product.price.toLocaleString('es-CR')}`,
                ingredients: []
            }
        ]
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.image_url,
        description: product.description,
        offers: {
            "@type": "Offer",
            price: product.price,
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
