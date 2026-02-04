import { MetadataRoute } from 'next'
import { products } from './lib/products'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://mariesutil.com'

    // Páginas estáticas
    const routes = ['', '/about', '/contact', '/faq'].map(
        (route) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: route === '' ? 1 : 0.8,
        })
    )

    // Páginas de productos dinámicas
    const productRoutes = products.map((product) => ({
        url: `${baseUrl}/product/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...routes, ...productRoutes]
}
