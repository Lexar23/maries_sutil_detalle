"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
    const phoneNumber = "123456789"; // Replace with real number
    const message = "Hola! Quisiera más información sobre los chocolates de San Valentín ❤️";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center"
        >
            <MessageCircle className="w-8 h-8 fill-current" />
            <span className="absolute -top-2 -right-2 bg-romantic text-white text-[10px] px-2 py-0.5 rounded-full animate-bounce">
                1
            </span>
        </motion.a>
    );
};

export default WhatsAppButton;
