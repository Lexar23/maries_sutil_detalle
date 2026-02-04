import { products } from "@/app/lib/products";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/app/components/ProductDetailClient";
import { Metadata } from "next";

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) return {};

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            images: [{ url: product.image }],
        },
    };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.image,
        description: product.description,
        offers: {
            "@type": "Offer",
            price: product.price.replace("₡", "").replace(".", ""),
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
            <ProductDetailClient product={product} />
        </>
    );
}
