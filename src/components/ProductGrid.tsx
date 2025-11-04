import { ProductCard } from "./ProductCard";
import type { Product } from "../data/products";

interface ProductGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  userRatings: Record<number, number>;
  onRatingChange: (productId: number, rating: number) => void;
}

export function ProductGrid({
  products,
  currentPage,
  totalPages,
  onPageChange,
  userRatings,
  onRatingChange,
}: ProductGridProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="space-y-8">
      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            Nenhum produto encontrado. Tente outra busca ou categoria.
          </p>
        </div>
      ) : (
        // **********************************************
        // * ALTERAÇÃO AQUI: De 'xl:grid-cols-4' para 'lg:grid-cols-3' *
        // **********************************************
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              userRating={userRatings[product.id]}
              onRatingChange={onRatingChange}
            />
          ))}
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <nav className="inline-flex items-center gap-1" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-md text-sm ${
                currentPage === 1
                  ? "pointer-events-none opacity-50 text-gray-400"
                  : "text-gray-700 hover:bg-gray-100 cursor-pointer"
              }`}
            >
              Anterior
            </button>

            {pageNumbers.map((page, index) => (
              <button
                key={typeof page === "number" ? page : `ellipsis-${index}`}
                onClick={() => typeof page === "number" && onPageChange(page)}
                disabled={typeof page !== "number"}
                className={`px-3 py-2 rounded-md text-sm ${
                  typeof page === "number" && currentPage === page
                    ? "bg-blue-600 text-white"
                    : typeof page === "number"
                    ? "text-gray-700 hover:bg-gray-100 cursor-pointer"
                    : "text-gray-400 cursor-default"
                }`}
              >
                {typeof page === "number" ? page : "..."}
              </button>
            ))}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-md text-sm ${
                currentPage === totalPages
                  ? "pointer-events-none opacity-50 text-gray-400"
                  : "text-gray-700 hover:bg-gray-100 cursor-pointer"
              }`}
            >
              Próxima
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}