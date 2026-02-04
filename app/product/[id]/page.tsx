import { products } from "@/app/lib/products";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/app/components/ProductDetailClient";

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    return <ProductDetailClient product={product} />;
}
