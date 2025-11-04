import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const heroImages = [
  "src/img/886d530e-c884-43de-99c4-800518a5ac7a.jpg",
  "src/img/WhatsApp Image 2025-11-03 at 01.03.11 (2).jpeg",
  "src/img/WhatsApp Image 2025-11-03 at 01.03.11 (1).jpeg",
];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000); // Trocar imagem a cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById("produtos");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-[500px] sm:h-[600px] overflow-hidden bg-gray-900">
      {/* Carrossel de Imagens */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentImageIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Outlet Machado - Moda de qualidade ${index + 1}`}
              className="w-full h-full object-cover"
              style={{ opacity: 0.2 }}
            />
          </div>
        ))}
      </div>

      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Marcas Famosas com até <span className="text-blue-400">70% OFF</span>
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-gray-200">
            As melhores ofertas em roupas, calçados, acessórios e muito mais!
          </p>
          <button
            onClick={scrollToProducts}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-lg hover:shadow-xl transition-all"
          >
            Ver Produtos
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Indicadores do Carrossel */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 rounded-full transition-all ${
              currentImageIndex === index ? "bg-white w-8" : "bg-white/50 w-2"
            }`}
            aria-label={`Ir para imagem ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}
