export type CategoryId = "amor" | "boda" | "babyshower";

export interface Category {
    id: CategoryId;
    name: string;
    description: string;
    icon: string;
}

export const categories: Category[] = [
    {
        id: "amor",
        name: "Amor",
        description: "Detalles románticos para esa persona especial",
        icon: "Heart"
    },
    {
        id: "boda",
        name: "Boda",
        description: "Elegancia y dulzura para el gran día",
        icon: "Gift"
    },
    {
        id: "babyshower",
        name: "Babyshower",
        description: "Celebrando la llegada de un nuevo integrante",
        icon: "Baby"
    }
];
