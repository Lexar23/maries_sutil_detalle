"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
    return (
        <nav className="absolute top-0 left-0 right-0 z-50 flex justify-center pt-8 md:pt-12 px-6">
            <Link href="/" className="group transition-transform hover:scale-105 duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/logo.png"
                    alt="Marie's Sutil Detalle"
                    className="h-20 md:h-28 w-auto object-contain drop-shadow-md"
                />
            </Link>
        </nav>
    );
};

export default Navbar;
