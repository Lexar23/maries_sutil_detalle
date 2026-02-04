export interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
    category: "Luxury" | "Silver" | "Sweet" | "Heart";
    image: string;
    colors?: {
        name: string;
        image: string;
    }[];
}

export const products: Product[] = [
    {
        id: "luxury-love",
        name: "Luxury Love",
        price: "₡6.500",
        description: "Nuestra caja más exclusiva con los detalles más dulces para regalar.",
        category: "Luxury",
        image: "/luxury.jpg"
    },
    {
        id: "luxury-blossom",
        name: "Luxury Blossom",
        price: "₡3.500",
        description: "Elegancia y sofisticación en cada chocolate. Disponible en varios colores para adaptarse a tu estilo.",
        category: "Luxury",
        image: "/silverPack.jpg",
        colors: [
            { name: "Rosa", image: "/silverBlossomRosa.jpg" },
            { name: "Rojo", image: "/silverBlossomRoja.jpg" },
            { name: "Vino", image: "/silverBlossomVino.jpg" }
        ]
    },
    {
        id: "silver-blossom",
        name: "Silver Blossom",
        price: "₡2.500",
        description: "Detalle delicado con dulces notas. Un regalo ideal para cualquier ocasión especial.",
        category: "Silver",
        image: "/silverPack.jpg",
        colors: [
            { name: "Rosa", image: "/silverBlossomRosa.jpg" },
            { name: "Rojo", image: "/silverBlossomRoja.jpg" },
            { name: "Vino", image: "/silverBlossomVino.jpg" }
        ]
    },
    {
        id: "love",
        name: "Love",
        price: "₡2.100",
        description: "Sencillez y dulzura en cada bocado, ideal para un presente especial y sincero.",
        category: "Sweet",
        image: "/love.jpg"
    },
    {
        id: "sweet",
        name: "Sweet",
        price: "₡1.200",
        description: "Un tierno gesto de amor con nuestros mejores chocolates en un formato pequeño pero encantador.",
        category: "Sweet",
        image: "/sweet.jpg",
        colors: [
            { name: "Rosa", image: "/heartRosa.jpg" },
            { name: "Rojo", image: "/heartRoja.jpg" }
        ]
    },
    {
        id: "heart-box",
        name: "Heart Box",
        price: "₡1.200",
        description: "La icónica caja en forma de corazón rellena de pura felicidad y los mejores chocolates.",
        category: "Heart",
        image: "/heart.jpg"
    }
];
