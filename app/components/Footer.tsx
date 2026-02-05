"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Instagram, Facebook, MessageCircle, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 bg-white border-t border-romantic/10 pt-24 pb-12 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-romantic/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50" />

            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block group">
                            <div className="relative h-20 w-40 transition-transform group-hover:scale-105">
                                <Image
                                    src="/logo.png"
                                    alt="Marie's Sutil Detalle"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                        <p className="text-foreground/60 text-sm leading-relaxed max-w-sm">
                            Creamos detalles que cautivan y chocolates que enamoran.
                            Especialistas en hacer de cada ocasión un momento inolvidable.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-romantic hover:bg-romantic hover:text-white transition-all duration-300">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-romantic hover:bg-romantic hover:text-white transition-all duration-300">
                                <Facebook size={18} />
                            </a>
                            <a href="https://wa.me/50687880937" target="_blank" className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-romantic hover:bg-romantic hover:text-white transition-all duration-300">
                                <MessageCircle size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold font-playfair text-foreground">Navegación</h3>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-foreground/60 hover:text-romantic transition-colors text-sm">Inicio</Link></li>
                            <li><Link href="/#catalog" className="text-foreground/60 hover:text-romantic transition-colors text-sm">Catálogo</Link></li>
                            <li><Link href="/about" className="text-foreground/60 hover:text-romantic transition-colors text-sm">Sobre Nosotros</Link></li>
                            <li><Link href="/faq" className="text-foreground/60 hover:text-romantic transition-colors text-sm">Preguntas Frecuentes</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold font-playfair text-foreground">Soporte</h3>
                        <ul className="space-y-4">
                            <li><Link href="/contact" className="text-foreground/60 hover:text-romantic transition-colors text-sm">Contacto</Link></li>
                            <li><Link href="/contact" className="text-foreground/60 hover:text-romantic transition-colors text-sm">Pedidos Especiales</Link></li>
                            <li><Link href="/faq" className="text-foreground/60 hover:text-romantic transition-colors text-sm">Envíos y Entregas</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold font-playfair text-foreground">Contacto</h3>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-romantic shrink-0" />
                                <span className="text-foreground/60 text-sm">San José, Costa Rica</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-romantic shrink-0" />
                                <span className="text-foreground/60 text-sm">+506 8788 0937</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-romantic shrink-0" />
                                <span className="text-foreground/60 text-sm">hola@mariesutil.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-romantic/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-foreground/40 text-xs font-medium">
                        © {currentYear} Marie&apos;s Sutil Detalle. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center gap-2 text-foreground/40 text-xs font-medium">
                        <span>Hecho con</span>
                        <Heart size={14} className="text-romantic fill-romantic" />
                        <span>para San Valentín</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
