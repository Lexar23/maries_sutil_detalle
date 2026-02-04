import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contacto",
    description: "Ponte en contacto con Marie's Sutil Detalle para pedidos personalizados, dudas o comentarios sobre nuestras cajas de chocolate.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
