import Hero from "./components/Hero";
import Products from "./components/Products";
import WhatsAppButton from "./components/WhatsAppButton";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Star } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Products Section */}
      <Products />

      {/* Features Section - Inline for simplicity */}
      <section id="features" className="py-24 px-6 md:px-20 bg-background relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12">¿Por qué elegir Maries?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="text-accent fill-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Selección Especial</h3>
              <p className="text-foreground/60">Seleccionamos los mejores chocolates para crear el regalo perfecto.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="text-accent fill-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Envío Especial</h3>
              <p className="text-foreground/60">Llegamos a tiempo para que tu sorpresa sea perfecta.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="text-accent fill-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Empaque Élite</h3>
              <p className="text-foreground/60">Cada caja es una obra de arte lista para regalar.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating Elements */}
      <WhatsAppButton />
    </main>
  );
}


