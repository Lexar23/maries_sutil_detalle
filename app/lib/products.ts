export interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
    category: "Luxury" | "Silver" | "Sweet" | "Heart";
    image: string;
    ingredients: {
        name: string;
        quantity: number;
        image: string;
    }[];
    colors?: {
        name: string;
        image: string;
    }[];
}

const ingredientImages = {
    "Ferrero Rocher": "/chocolates/ferrero.png",
    "Raffaello": "/chocolates/raffaello.png",
    "Copper Kettle Truffles Dark": "/chocolates/copper.png",
    "Nugget Hershey's": "/chocolates/nugget.jpg",
    "Mini Hershey's": "/chocolates/mini1.png",
    "Kiss": "/chocolates/kiss1.png",
    "Guayabitas": "/chocolates/guayabita.png"
};

export const products: Product[] = [
    {
        id: "luxury-love",
        name: "Luxury Love",
        price: "₡6.500",
        description: "Nuestra caja más exclusiva con los detalles más dulces para regalar.",
        category: "Luxury",
        image: "/luxury.jpg",
        ingredients: [
            { name: "Ferrero Rocher", quantity: 4, image: ingredientImages["Ferrero Rocher"] },
            { name: "Raffaello", quantity: 4, image: ingredientImages["Raffaello"] },
            { name: "Copper Kettle Truffles Dark", quantity: 2, image: ingredientImages["Copper Kettle Truffles Dark"] }
        ]
    },
    {
        id: "luxury-blossom",
        name: "Luxury Blossom",
        price: "₡3.500",
        description: "Elegancia y sofisticación en cada chocolate. Disponible en varios colores para adaptarse a tu estilo.",
        category: "Luxury",
        image: "/silverPack.jpg",
        ingredients: [
            { name: "Ferrero Rocher", quantity: 2, image: ingredientImages["Ferrero Rocher"] },
            { name: "Raffaello", quantity: 2, image: ingredientImages["Raffaello"] },
            { name: "Copper Kettle Truffles Dark", quantity: 1, image: ingredientImages["Copper Kettle Truffles Dark"] }
        ],
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
        ingredients: [
            { name: " Copper Kettle Truffles Dark", quantity: 1, image: ingredientImages["Copper Kettle Truffles Dark"] },
            { name: "Nugget Hershey's", quantity: 2, image: ingredientImages["Nugget Hershey's"] },
            { name: "Mini Hershey's", quantity: 2, image: ingredientImages["Mini Hershey's"] },
            { name: "Kiss", quantity: 3, image: ingredientImages["Kiss"] }
        ],
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
        image: "/love.jpg",
        ingredients: [
            { name: "Copper Kettle Truffles Dark", quantity: 1, image: ingredientImages["Copper Kettle Truffles Dark"] },
            { name: "Nugget Hershey's", quantity: 2, image: ingredientImages["Nugget Hershey's"] },
            { name: "Mini Hershey's", quantity: 2, image: ingredientImages["Mini Hershey's"] },
            { name: "Kiss", quantity: 2, image: ingredientImages["Kiss"] },
            { name: "Guayabitas", quantity: 2, image: ingredientImages["Guayabitas"] }
        ]
    },
    {
        id: "sweet",
        name: "Sweet",
        price: "₡1.600",
        description: "Un tierno gesto de amor con nuestros mejores chocolates en un formato pequeño pero encantador.",
        category: "Sweet",
        image: "/sweet.jpg",
        ingredients: [
            { name: "Kiss", quantity: 3, image: ingredientImages["Kiss"] },
            { name: "Guayabitas", quantity: 3, image: ingredientImages["Guayabitas"] }
        ],
        colors: [
            { name: "Rosa", image: "/heartRosa.jpg" },
            { name: "Rojo", image: "/heartRoja.jpg" }
        ]
    },
    {
        id: "heart-box",
        name: "Heart Box",
        price: "₡1.400",
        description: "La icónica caja en forma de corazón rellena de pura felicidad y los mejores chocolates.",
        category: "Heart",
        image: "/heart.jpg",
        ingredients: [
            { name: "Kiss", quantity: 4, image: ingredientImages["Kiss"] },
            { name: "Guayabitas", quantity: 1, image: ingredientImages["Guayabitas"] }
        ]
    }
];
