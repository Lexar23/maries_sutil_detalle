import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sobre Nosotros",
    description: "Conoce la historia de Marie's Sutil Detalle, nuestra pasión por los chocolates y el arte de regalar momentos inolvidables.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
