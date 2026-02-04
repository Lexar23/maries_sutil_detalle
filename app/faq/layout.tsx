import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Preguntas Frecuentes",
    description: "Encuentra respuestas a las preguntas más comunes sobre nuestros productos, envíos y formas de pago en Marie's Sutil Detalle.",
};

export default function FAQLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
