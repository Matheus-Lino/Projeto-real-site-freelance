
import { Star } from "lucide-react";
// Importa a interface Product do seu novo serviço de API
import type { Product } from "../services/apiService"; 

interface ProductCardProps {
  product: Product;
  userRating?: number;
  onRatingChange: (productId: number, rating: number) => void;
}

export function ProductCard({ product, userRating, onRatingChange }: ProductCardProps) {
  
  // O campo 'rating' vem da API (MySQL) e já foi ajustado no App.tsx/apiService.ts para ser 'number'
  // Mas, como segurança, usamos a propriedade já ajustada 'avaliacao' que criamos
  const displayRating = userRating !== undefined ? userRating : product.avaliacao;
  
  // MUDANÇA AQUI: Garante que o desconto seja um número válido e positivo, caso contrário, é 0.
  const discountPercentage = typeof product.discount_percent === 'number' && product.discount_percent > 0
    ? product.discount_percent
    : 0;

  // O preço foi convertido para number no apiService.ts, mas o tipo pode ser string/number.
  // Usamos uma verificação simples:
  const numericPrice = typeof product.price === 'string' ? parseFloat(product.price) : product.price;

  // Lógica do Preço Antigo (Original Price)
  // Se houver desconto, calcula o preço original
  const originalPrice = discountPercentage > 0 
    ? numericPrice / (1 - discountPercentage / 100) 
    : numericPrice;

  const formatPrice = (price: number): string => {
    // Formatação de R$ 99.90 para R$ 99,90
    return price.toFixed(2).replace(".", ",");
  };

  const handleStarClick = (rating: number) => {
    onRatingChange(product.id, rating);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Fallback para imagem
    e.currentTarget.src = "https://via.placeholder.com/400x400?text=Imagem+Indisponível";
  };

  return (
    // Adiciona 'h-full' e 'flex flex-col' para uniformizar a altura
    <div className="group overflow-hidden hover:shadow-lg transition-all duration-300 bg-white rounded-lg border border-gray-200 h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image_url} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={handleImageError}
        />
        {/* Usamos o campo do banco de dados (discount_percent) */}
        {discountPercentage > 0 && (
            <span className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded">
                {discountPercentage}% OFF
            </span>
        )}

        {/* Badge de Estoque Zero */}
        {product.stock <= 0 && ( 
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <p className="text-white font-bold text-xl">ESGOTADO</p>
          </div>
        )}
      </div>

      {/* Adiciona 'grow' para que este bloco ocupe todo o espaço restante */}
      <div className="p-4 grow"> 
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 min-h-[3rem]">
          {product.name} 
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description} 
        </p>

        {/* Informação de Estoque */}
        <div className="mb-3">
          {product.stock > 0 ? ( 
            <span
              className={`text-xs px-2 py-1 rounded ${
                product.stock <= 5 
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {product.stock <= 5 
                ? `Últimas ${product.stock} unidades!` 
                : `${product.stock} em estoque`} 
            </span>
          ) : (
            <span className="text-xs text-red-600 font-semibold">Sem estoque</span>
          )}
        </div>

        {/* Exibição do preço antigo e novo */}
        <div className="flex flex-col gap-1 mb-3">
          {/* Preço Antigo (apenas se houver desconto) */}
          {discountPercentage > 0 && (
            <span className="text-sm text-gray-400 line-through">
              R$ {formatPrice(originalPrice)}
            </span>
          )}
          {/* Preço Novo (Preço principal) */}
          <span className="text-2xl font-bold text-blue-600"> 
            R$ {formatPrice(numericPrice)} 
          </span>
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              className="hover:scale-110 transition-transform"
              aria-label={`Avaliar com ${star} estrela${star > 1 ? "s" : ""}`}
            >
              <Star
                className={`h-5 w-5 ${
                  star <= displayRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-none text-gray-300"
                }`}
              />
            </button>
          ))}
          <span className="text-sm text-gray-500 ml-1">
            ({displayRating.toFixed(1)})
          </span>
        </div>
      </div>
    </div>
  );
}