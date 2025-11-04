import { useState, useEffect, useMemo } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProductGrid } from "./components/ProductGrid";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { fuzzyMatch } from "./utils/searchUtils";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner"; // <-- IMPORTAÇÃO CORRIGIDA


// IMPORTAÇÕES DE API
import { fetchProducts, fetchCategories, fetchBrands, Category, Brand, Product } from "./services/apiService"; 

const PRODUCTS_PER_PAGE = 12;
const RATINGS_STORAGE_KEY = "outlet-machado-ratings";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | number>("todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [userRatings, setUserRatings] = useState<Record<number, number>>({});
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);

        const categoriesData = await fetchCategories();
        setCategories([{ id: 'todas', name: 'Todas as categorias' }, ...categoriesData]);

        const brandsData = await fetchBrands();
        setBrands(brandsData);
        
      } catch (error) {
        console.error("Falha ao carregar dados iniciais:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadInitialData();
  }, []);

  useEffect(() => {
    try {
      const savedRatings = localStorage.getItem(RATINGS_STORAGE_KEY);
      if (savedRatings) {
        setUserRatings(JSON.parse(savedRatings));
      }
    } catch (error) {
      console.error("Erro ao carregar avaliações:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(userRatings));
    } catch (error) {
      console.error("Erro ao salvar avaliações:", error);
    }
  }, [userRatings]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (currentCategory !== "todas") {
        const categoryId = typeof currentCategory === 'string' ? parseInt(currentCategory) : currentCategory;
        filtered = filtered.filter((p) => p.category_id === categoryId);
    }

    if (selectedBrands.length > 0) {
        const selectedBrandIds = brands
            .filter(b => selectedBrands.includes(b.name))
            .map(b => b.id);
        
        filtered = filtered.filter((p) => selectedBrandIds.includes(p.brand_id));
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((p) => {
        const searchableText = `${p.name} ${p.description}`;
        return fuzzyMatch(searchTerm, searchableText);
      });
    }

    return filtered;
  }, [products, currentCategory, searchTerm, selectedBrands, brands]);

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentCategory, searchTerm, selectedBrands]);


  const handleCategoryChange = (category: string | number) => {
    setCurrentCategory(category);
    setSearchTerm("");
    setSelectedBrands([]);
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    setCurrentCategory("todas");
  };

  const handleBrandsChange = (brands: string[]) => {
    setSelectedBrands(brands);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const productsSection = document.getElementById("produtos");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleRatingChange = (productId: number, rating: number) => {
    setUserRatings((prev) => ({
      ...prev,
      [productId]: rating,
    }));
    toast.success("Avaliação salva com sucesso!", {
      description: `Você avaliou este produto com ${rating} estrela${rating > 1 ? "s" : ""}.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-blue-600">Carregando dados da API...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        onBrandsChange={handleBrandsChange}
        currentCategory={currentCategory} 
        selectedBrands={selectedBrands}
        categories={categories}
        brands={brands}
      />

      <Hero />

      <main>
        <section id="produtos" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {/* Busca o nome da categoria usando o ID */}
                {currentCategory === "todas"
                  ? "Todos os Produtos"
                  : categories.find(c => c.id.toString() === currentCategory.toString())?.name || "Produtos"}
              </h2>
              <p className="text-gray-600">
                {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""} encontrado
                {filteredProducts.length !== 1 ? "s" : ""}
                {searchTerm && ` para "${searchTerm}"`}
                {selectedBrands.length > 0 && ` - Marcas: ${selectedBrands.join(", ")}`}
              </p>
            </div>

            <ProductGrid
              products={paginatedProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              userRatings={userRatings}
              onRatingChange={handleRatingChange}
            />
          </div>
        </section>

        <AboutSection />
        <ContactSection />
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Outlet Machado. Todos os direitos reservados.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Marcas famosas com os melhores preços do Brasil
            </p>
          </div>
        </div>
      </footer>

      <Toaster position="bottom-right" richColors />
    </div>
  );
}