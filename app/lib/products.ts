import { CategoryId } from "./categories";

export type TierType = "Diamante" | "Oro" | "Plata";

export interface Ingredient {
    name: string;
    quantity: number;
    image: string;
}

export interface ProductTier {
    type: TierType;
    price: string;
    ingredients: Ingredient[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    categoryId: CategoryId;
    image: string;
    tiers: ProductTier[];
    colors?: {
        name: string;
        image: string;
    }[];
    designs?: {
        name: string;
        image: string;
    }[];
    images?: string[];
}

const ingredientImages = {
    "Ferrero Rocher": "/chocolates/ferrero.png",
    "Raffaello": "/chocolates/raffaello.png",
    "Copper Kettle (Oscuro)": "/chocolates/copper.png",
    "Nugget Hershey's": "/chocolates/nugget.jpg",
    "Mini Hershey's": "/chocolates/mini1.png",
    "Kiss": "/chocolates/kiss1.png",
    "Guayabitas": "/chocolates/guayabita.png",
    "Tutto": "/chocolates/Tutto.webp",
    "Trufa Oscura": "/chocolates/trufa.png"
};

export const products: Product[] = [
    // ── Amor Collection ─────────────────────────────────────────────────────
    {
        id: "luxury",
        name: "Luxury",
        description: "Nuestra caja más exclusiva con los detalles más dulces para regalar.",
        categoryId: "amor",
        image: "/amor/luxury.jpg",
        tiers: [
            {
                type: "Diamante",
                price: "₡6.500",
                ingredients: [
                    { name: "Ferrero Rocher", quantity: 4, image: ingredientImages["Ferrero Rocher"] },
                    { name: "Raffaello", quantity: 4, image: ingredientImages["Raffaello"] },
                    { name: "Copper Kettle (Oscuro)", quantity: 2, image: ingredientImages["Copper Kettle (Oscuro)"] }
                ]
            },
            {
                type: "Oro",
                price: "₡4.500",
                ingredients: [
                    { name: "Ferrero Rocher", quantity: 2, image: ingredientImages["Ferrero Rocher"] },
                    { name: "Tutto", quantity: 3, image: ingredientImages["Tutto"] },
                    { name: "Nugget Hershey's", quantity: 3, image: ingredientImages["Nugget Hershey's"] }
                ]
            }
        ]
    },
    {
        id: "love",
        name: "Love",
        description: "Sencillez y dulzura en cada bocado, ideal para un presente especial y sincero.",
        categoryId: "amor",
        image: "/amor/love.jpg",
        tiers: [
            {
                type: "Diamante",
                price: "₡2.100",
                ingredients: [
                    { name: "Tutto", quantity: 2, image: ingredientImages["Tutto"] },
                    { name: "Nugget Hershey's", quantity: 2, image: ingredientImages["Nugget Hershey's"] },
                    { name: "Mini Hershey's", quantity: 2, image: ingredientImages["Mini Hershey's"] },
                    { name: "Kiss", quantity: 2, image: ingredientImages["Kiss"] }
                ]
            },
            {
                type: "Oro",
                price: "₡1.500",
                ingredients: [
                    { name: "Tutto", quantity: 2, image: ingredientImages["Tutto"] },
                    { name: "Mini Hershey's", quantity: 3, image: ingredientImages["Mini Hershey's"] },
                    { name: "Kiss", quantity: 2, image: ingredientImages["Kiss"] }
                ]
            }
        ]
    },

    // ── Wedding Collection ───────────────────────────────────────────────────
    {
        id: "blossom",
        name: "Blossom Box",
        description: "Elegancia y sofisticación en cada chocolate. Disponible en varios colores para adaptarse a tu estilo.",
        categoryId: "boda",
        image: "/boda/blossom/silverPack.jpg",
        tiers: [
            {
                type: "Diamante",
                price: "₡3.500",
                ingredients: [
                    { name: "Ferrero Rocher", quantity: 2, image: ingredientImages["Ferrero Rocher"] },
                    { name: "Raffaello", quantity: 2, image: ingredientImages["Raffaello"] },
                    { name: "Copper Kettle (Oscuro)", quantity: 1, image: ingredientImages["Copper Kettle (Oscuro)"] }
                ]
            },
            {
                type: "Oro",
                price: "₡2.500",
                ingredients: [
                    { name: "Copper Kettle (Oscuro)", quantity: 1, image: ingredientImages["Copper Kettle (Oscuro)"] },
                    { name: "Tutto", quantity: 2, image: ingredientImages["Tutto"] },
                    { name: "Nugget Hershey's", quantity: 2, image: ingredientImages["Nugget Hershey's"] },
                    { name: "Mini Hershey's", quantity: 3, image: ingredientImages["Mini Hershey's"] }
                ]
            }
        ],
        colors: [
            { name: "Rosa", image: "/boda/blossom/silverBlossomRosa.jpg" },
            { name: "Rojo", image: "/boda/blossom/silverBlossomRoja.jpg" },
            { name: "Vino", image: "/boda/blossom/silverBlossomVino.jpg" }
        ]
    },
    {
        id: "sweet",
        name: "Sweet",
        description: "Un tierno gesto de amor con nuestros mejores chocolates en un formato pequeño pero encantador.",
        categoryId: "boda",
        image: "/boda/heart/sweet.jpg",
        tiers: [
            {
                type: "Diamante",
                price: "₡1.650",
                ingredients: [
                    { name: "Mini Hershey's", quantity: 2, image: ingredientImages["Mini Hershey's"] },
                    { name: "Kiss", quantity: 3, image: ingredientImages["Kiss"] },
                    { name: "Guayabitas", quantity: 2, image: ingredientImages["Guayabitas"] }
                ]
            },
            {
                type: "Oro",
                price: "₡1.200",
                ingredients: [
                    { name: "Mini Hershey's", quantity: 2, image: ingredientImages["Mini Hershey's"] },
                    { name: "Kiss", quantity: 3, image: ingredientImages["Kiss"] }
                ]
            }
        ],
        colors: [
            { name: "Rosa", image: "/boda/heart/heartRosa.jpg" },
            { name: "Rojo", image: "/boda/heart/heartRoja.jpg" }
        ]
    },
    {
        id: "heart-box",
        name: "Heart Box",
        description: "La icónica caja en forma de corazón rellena de pura felicidad y los mejores chocolates.",
        categoryId: "boda",
        image: "/boda/heart/heart.jpg",
        tiers: [
            {
                type: "Diamante",
                price: "₡1.400",
                ingredients: [
                    { name: "Kiss", quantity: 4, image: ingredientImages["Kiss"] },
                    { name: "Guayabitas", quantity: 2, image: ingredientImages["Guayabitas"] }
                ]
            },
            {
                type: "Oro",
                price: "₡1.000",
                ingredients: [
                    { name: "Kiss", quantity: 3, image: ingredientImages["Kiss"] },
                    { name: "Mini Hershey's", quantity: 2, image: ingredientImages["Mini Hershey's"] }
                ]
            }
        ]
    },
    {
        id: "aurora",
        name: "Aurora",
        description: "Una elegante decoración diseñada para iluminar ese día tan especial.",
        categoryId: "boda",
        image: "/boda/aurora/1.png",
        tiers: [
            {
                type: "Diamante",
                price: "₡5.500",
                ingredients: [
                    { name: "Ferrero Rocher", quantity: 3, image: ingredientImages["Ferrero Rocher"] },
                    { name: "Raffaello", quantity: 3, image: ingredientImages["Raffaello"] }
                ]
            },
            {
                type: "Oro",
                price: "₡4.000",
                ingredients: [
                    { name: "Copper Kettle (Oscuro)", quantity: 2, image: ingredientImages["Copper Kettle (Oscuro)"] },
                    { name: "Tutto", quantity: 3, image: ingredientImages["Tutto"] }
                ]
            }
        ],
        images: [
            "/boda/aurora/1.png",
            "/boda/aurora/2.png",
            "/boda/aurora/3.png"
        ]
    },
    {
        id: "floralia",
        name: "Floralia",
        description: "Detalles naturales y románticos para celebrar el amor en su máxima expresión.",
        categoryId: "boda",
        image: "/boda/floralia/1.png",
        tiers: [
            {
                type: "Diamante",
                price: "₡6.000",
                ingredients: [
                    { name: "Ferrero Rocher", quantity: 4, image: ingredientImages["Ferrero Rocher"] },
                    { name: "Copper Kettle (Oscuro)", quantity: 2, image: ingredientImages["Copper Kettle (Oscuro)"] }
                ]
            },
            {
                type: "Oro",
                price: "₡4.500",
                ingredients: [
                    { name: "Raffaello", quantity: 3, image: ingredientImages["Raffaello"] },
                    { name: "Nugget Hershey's", quantity: 3, image: ingredientImages["Nugget Hershey's"] }
                ]
            }
        ]
    },

    // ── Baby Shower Collection ───────────────────────────────────────────────
    {
        id: "safari-baby",
        name: "Safari Baby",
        description: "Una caja mágica llena de dulzura para celebrar la llegada del nuevo bebé.",
        categoryId: "babyshower",
        image: "/babyshower/babyZafari/complete.jpg",
        tiers: [
            {
                type: "Diamante",
                price: "₡3.800",
                ingredients: [
                    { name: "Ferrero Rocher", quantity: 2, image: ingredientImages["Ferrero Rocher"] },
                    { name: "Raffaello", quantity: 2, image: ingredientImages["Raffaello"] }
                ]
            },
            {
                type: "Oro",
                price: "₡2.800",
                ingredients: [
                    { name: "Tutto", quantity: 3, image: ingredientImages["Tutto"] },
                    { name: "Mini Hershey's", quantity: 3, image: ingredientImages["Mini Hershey's"] }
                ]
            }
        ],
        designs: [
            { name: "Diseño 1", image: "/babyshower/babyZafari/1.png" },
            { name: "Diseño 2", image: "/babyshower/babyZafari/2.png" },
            { name: "Diseño 3", image: "/babyshower/babyZafari/3.png" },
            { name: "Diseño 4", image: "/babyshower/babyZafari/4.png" },
            { name: "Diseño 5", image: "/babyshower/babyZafari/5.png" },
            { name: "Diseño 6", image: "/babyshower/babyZafari/6.png" },
            { name: "Diseño 7", image: "/babyshower/babyZafari/7.png" }
        ]
    },
    {
        id: "baby-bear-love",
        name: "Baby Bear Love",
        description: "Un detalle tierno con el osito más adorable y los chocolates más deliciosos.",
        categoryId: "babyshower",
        image: "/babyshower/babyBearLove/bear.jpg",
        tiers: [
            {
                type: "Diamante",
                price: "₡3.500",
                ingredients: [
                    { name: "Ferrero Rocher", quantity: 2, image: ingredientImages["Ferrero Rocher"] },
                    { name: "Kiss", quantity: 3, image: ingredientImages["Kiss"] }
                ]
            },
            {
                type: "Oro",
                price: "₡2.500",
                ingredients: [
                    { name: "Mini Hershey's", quantity: 3, image: ingredientImages["Mini Hershey's"] },
                    { name: "Guayabitas", quantity: 3, image: ingredientImages["Guayabitas"] }
                ]
            }
        ]
    },
    {
        id: "prince-elephant",
        name: "Prince Elephant",
        description: "Una dulce celebración con temática de elefantito rey para el pequeño príncipe.",
        categoryId: "babyshower",
        image: "/babyshower/babyPrinceElephant/complete.png",
        tiers: [
            {
                type: "Diamante",
                price: "₡3.200",
                ingredients: [
                    { name: "Raffaello", quantity: 2, image: ingredientImages["Raffaello"] },
                    { name: "Tutto", quantity: 2, image: ingredientImages["Tutto"] }
                ]
            },
            {
                type: "Oro",
                price: "₡2.200",
                ingredients: [
                    { name: "Nugget Hershey's", quantity: 3, image: ingredientImages["Nugget Hershey's"] },
                    { name: "Kiss", quantity: 2, image: ingredientImages["Kiss"] }
                ]
            }
        ],
        designs: [
            { name: "Diseño 1", image: "/babyshower/babyPrinceElephant/1.png" },
            { name: "Diseño 2", image: "/babyshower/babyPrinceElephant/2.png" },
            { name: "Diseño 3", image: "/babyshower/babyPrinceElephant/3.png" }
        ]
    },
    {
        id: "princess-elephant",
        name: "Princess Elephant",
        description: "Dulzura y encanto con temática de elefantita reina para la pequeña princesa.",
        categoryId: "babyshower",
        image: "/babyshower/babyPrincessElephant/complete.png",
        tiers: [
            {
                type: "Diamante",
                price: "₡3.200",
                ingredients: [
                    { name: "Raffaello", quantity: 2, image: ingredientImages["Raffaello"] },
                    { name: "Tutto", quantity: 2, image: ingredientImages["Tutto"] }
                ]
            },
            {
                type: "Oro",
                price: "₡2.200",
                ingredients: [
                    { name: "Nugget Hershey's", quantity: 3, image: ingredientImages["Nugget Hershey's"] },
                    { name: "Kiss", quantity: 2, image: ingredientImages["Kiss"] }
                ]
            }
        ],
        designs: [
            { name: "Diseño 1", image: "/babyshower/babyPrincessElephant/1.png" },
            { name: "Diseño 2", image: "/babyshower/babyPrincessElephant/2.png" },
            { name: "Diseño 3", image: "/babyshower/babyPrincessElephant/3.png" }
        ]
    }
];
