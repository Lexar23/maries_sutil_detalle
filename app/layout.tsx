import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mariesutil.com"),
  title: {
    default: "Marie's Sutil Detalle | Chocolates y Regalos de San Valentín",
    template: "%s | Marie's Sutil Detalle"
  },
  description: "Cajas con los mejores chocolates para regalar en San Valentín. El detalle más dulce para esa persona especial en Costa Rica.",
  keywords: ["chocolates", "San Valentín", "regalos", "Costa Rica", "detalles personalizados", "caja de regalo", "maries sutil detalle"],
  openGraph: {
    title: "Marie's Sutil Detalle | Chocolates y Regalos de San Valentín",
    description: "Cajas con los mejores chocolates para regalar en San Valentín.",
    url: "https://mariesutil.com",
    siteName: "Marie's Sutil Detalle",
    locale: "es_CR",
    type: "website",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://mariesutil.com",
  },
};

import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-sans`}
      >
        <ProductProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}

