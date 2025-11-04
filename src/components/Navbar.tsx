import { useState, useEffect, useMemo } from "react";
import { Menu, Search, X, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

interface Category { id: number | string; name: string; }
interface Brand { id: number; name: string; }

interface NavbarProps {

  onCategoryChange: (category: string | number) => void;
  onSearchChange: (search: string) => void;
  onBrandsChange: (brands: string[]) => void;
  currentCategory: string | number; 
  selectedBrands: string[];
  
  categories: Category[]; 
  brands: Brand[];     
}

export function Navbar({
  onCategoryChange,
  onSearchChange,
  onBrandsChange,
  currentCategory,
  selectedBrands,
  categories, 
  brands,     
}: NavbarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [localSelectedBrands, setLocalSelectedBrands] = useState<string[]>(selectedBrands);

  // Usa as marcas passadas via props
  const availableBrands = useMemo(() => {
    return brands.map(b => b.name).filter(name => name);
  }, [brands]);

  useEffect(() => {
    setLocalSelectedBrands(selectedBrands);
  }, [selectedBrands]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearchChange("");
  };

  const handleCategoryClick = (categoryId: string | number) => {
    onCategoryChange(categoryId);
    setLocalSelectedBrands([]);
    setIsOpen(false);
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = localSelectedBrands.includes(brand)
      ? localSelectedBrands.filter((b) => b !== brand)
      : [...localSelectedBrands, brand];
    setLocalSelectedBrands(newBrands);
    onBrandsChange(newBrands);
  };

  const clearBrands = () => {
    setLocalSelectedBrands([]);
    onBrandsChange([]);
  };
  
  const currentCategoryStr = currentCategory.toString();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo e Menu */}
          <div className="flex items-center gap-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <div className="space-y-6 mt-6">
                  {/* Categorias - Mobile (Usa PROPS categories) */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Categorias</h3>
                    <div className="flex flex-col gap-1">
                      {categories.map((cat) => ( // USANDO PROPS DA API
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryClick(cat.id)}
                          className={`px-3 py-2 rounded-md text-left transition-colors ${
                            currentCategoryStr === cat.id.toString()
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filtro de Marcas - Mobile */}
                  {availableBrands.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Marcas</h3>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {availableBrands.map((brand) => (
                          <label
                            key={brand}
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
                          >
                            <input
                              type="checkbox"
                              value={brand}
                              checked={localSelectedBrands.includes(brand)}
                              onChange={() => handleBrandToggle(brand)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{brand}</span>
                          </label>
                        ))}
                      </div>
                      {localSelectedBrands.length > 0 && (
                        <button
                          onClick={clearBrands}
                          className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                        >
                          Limpar filtros de marca
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-gray-900">Outlet Machado</span>
                <span className="text-xs text-gray-500 hidden sm:block">Marcas famosas com descontos imperdíveis</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {categories.map((cat) => ( 
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  currentCategoryStr === cat.id.toString()
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 w-64">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchInput}
                placeholder="Buscar produtos..."
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInput}
              placeholder="Buscar produtos..."
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {(currentCategoryStr !== "todas" || localSelectedBrands.length > 0) && availableBrands.length > 0 && (
          <div className="border-t py-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-gray-600 font-medium">Filtrar por marca:</span>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm transition-colors">
                  <span>
                    {localSelectedBrands.length > 0
                      ? `${localSelectedBrands.length} marca${localSelectedBrands.length > 1 ? "s" : ""} selecionada${localSelectedBrands.length > 1 ? "s" : ""}`
                      : "Selecione marcas"}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 max-h-80 overflow-y-auto">
                  {availableBrands.map((brand) => (
                    <DropdownMenuCheckboxItem
                      key={brand}
                      checked={localSelectedBrands.includes(brand)}
                      onCheckedChange={() => handleBrandToggle(brand)}
                    >
                      {brand}
                    </DropdownMenuCheckboxItem>
                  ))}
                  {localSelectedBrands.length > 0 && (
                    <>
                      <DropdownMenuSeparator />
                      <button
                        onClick={clearBrands}
                        className="w-full px-2 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-gray-50 text-left"
                      >
                        Limpar filtros
                      </button>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex md:hidden gap-2 flex-wrap">
                {availableBrands.slice(0, 5).map((brand) => (
                  <button
                    key={brand}
                    onClick={() => handleBrandToggle(brand)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      localSelectedBrands.includes(brand)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
                {availableBrands.length > 5 && (
                  <span className="px-3 py-1 text-sm text-gray-500">
                    +{availableBrands.length - 5} mais
                  </span>
                )}
              </div>

              <div className="hidden md:flex gap-2 flex-wrap">
                {localSelectedBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => handleBrandToggle(brand)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors"
                  >
                    {brand}
                    <X className="h-3 w-3" />
                  </button>
                ))}
              </div>

              {localSelectedBrands.length > 0 && (
                <button
                  onClick={clearBrands}
                  className="md:hidden text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  Limpar ({localSelectedBrands.length})
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}