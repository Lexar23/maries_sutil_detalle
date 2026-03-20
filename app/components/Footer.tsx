"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, MessageCircle, MapPin, Phone, Star } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 bg-white border-t border-accent/10 pt-16 pb-8 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50" />

            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block group">
                            <div className="relative h-14 w-28 transition-transform group-hover:scale-105">
                                <Image
                                    src="/logo.png"
                                    alt="Marie's Sutil Detalle"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                        <p className="text-foreground/50 text-xs leading-relaxed max-w-[240px]">
                            Detalles que cautivan y chocolates que deleitan los sentidos.
                        </p>
                        <div className="flex gap-2">
                            <a
                                href="https://www.instagram.com/maries_sutil_detalle?igsh=OXd1bGU4YW5rYXI3"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300"
                            >
                                <Instagram size={14} />
                            </a>
                            <a href="https://wa.me/50670682440" target="_blank" className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300">
                                <MessageCircle size={14} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-[10px] uppercase font-bold tracking-widest text-foreground/40">Navegación</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-foreground/60 hover:text-accent transition-colors text-xs font-bold">Inicio</Link></li>
                            <li><Link href="/#catalog" className="text-foreground/60 hover:text-accent transition-colors text-xs font-bold">Catálogo</Link></li>
                            <li><Link href="/about" className="text-foreground/60 hover:text-accent transition-colors text-xs font-bold">Nosotros</Link></li>
                            <li><Link href="/faq" className="text-foreground/60 hover:text-accent transition-colors text-xs font-bold">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h3 className="text-[10px] uppercase font-bold tracking-widest text-foreground/40">Soporte</h3>
                        <ul className="space-y-2">
                            <li><Link href="/contact" className="text-foreground/60 hover:text-accent transition-colors text-xs font-bold">Contacto</Link></li>
                            <li><Link href="/contact" className="text-foreground/60 hover:text-accent transition-colors text-xs font-bold">Pedidos Especiales</Link></li>
                            <li><Link href="/faq" className="text-foreground/60 hover:text-accent transition-colors text-xs font-bold">Envíos</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-[10px] uppercase font-bold tracking-widest text-foreground/40">Contacto</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <MapPin size={14} className="text-accent shrink-0" />
                                <span className="text-foreground/60 text-xs font-bold">San José, Costa Rica</span>
                            </li>
<<<<<<< HEAD
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-romantic shrink-0" />
                                <Link href="https://wa.me/50670682440" target="_blank"><span className="text-foreground/60 text-sm">+506 7068 2440</span></Link>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-romantic shrink-0" />
                                <span className="text-foreground/60 text-sm">mariessutildetalle@gmail.com</span>
=======
                            <li className="flex items-center gap-2">
                                <Phone size={14} className="text-accent shrink-0" />
                                <span className="text-foreground/60 text-xs font-bold">+506 7068 2440</span>
>>>>>>> 5082b54 (feat: Implement full e-commerce functionality including an admin panel for product and order management, a shopping cart with a drawer, and integrate Supabase for data persistence.)
                            </li>
                        </ul>
                    </div>
                </div>


                {/* Bottom Bar */}
                <div className="pt-8 border-t border-accent/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-foreground/40 text-xs font-medium text-center md:text-left">
                        © {currentYear} Marie&apos;s Sutil Detalle. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center gap-2 text-foreground/40 text-xs font-medium">
                        <span>Hecho con</span>
                        <Star size={14} className="text-accent fill-accent" />
                        <span>para momentos especiales</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
