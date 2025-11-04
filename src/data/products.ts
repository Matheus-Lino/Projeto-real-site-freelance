export interface Product {
  id: number;
  nome: string;
  categoria: string;
  marca: string;
  imagem: string;
  preco: number;
  avaliacao: number;
  descricao: string;
  estoque: number;
}

export const products: Product[] = [
  // Camisetas
  { id: 1, nome: "Camiseta Básica Premium", categoria: "camisetas", marca: "Nike", imagem: "https://images.unsplash.com/photo-1760126130239-92ccdd1f6d32?w=400", preco: 89.90, avaliacao: 4.5, descricao: "Camiseta básica de algodão premium, perfeita para o dia a dia.", estoque: 15 },
  { id: 2, nome: "Camiseta Estampada Fashion", categoria: "camisetas", marca: "Adidas", imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", preco: 99.90, avaliacao: 4.8, descricao: "Camiseta com estampa moderna e exclusiva.", estoque: 8 },
  { id: 3, nome: "Camiseta Polo Classic", categoria: "camisetas", marca: "Lacoste", imagem: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400", preco: 179.90, avaliacao: 4.9, descricao: "Polo clássica com bordado da marca.", estoque: 0 },
  { id: 4, nome: "Camiseta Oversized", categoria: "camisetas", marca: "Zara", imagem: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400", preco: 79.90, avaliacao: 4.3, descricao: "Estilo oversized confortável e moderno.", estoque: 12 },
  { id: 5, nome: "Camiseta Listrada", categoria: "camisetas", marca: "Tommy Hilfiger", imagem: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400", preco: 119.90, avaliacao: 4.6, descricao: "Camiseta listrada clássica e elegante.", estoque: 5 },
  { id: 6, nome: "Camiseta Esportiva Dry-Fit", categoria: "camisetas", marca: "Puma", imagem: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400", preco: 109.90, avaliacao: 4.7, descricao: "Tecnologia dry-fit para máximo conforto.", estoque: 20 },

  // Calças
  { id: 7, nome: "Calça Jeans Skinny", categoria: "calcas", marca: "Levi's", imagem: "https://images.unsplash.com/photo-1715865871451-e9c1c36201b0?w=400", preco: 249.90, avaliacao: 4.8, descricao: "Jeans skinny de alta qualidade com elastano.", estoque: 10 },
  { id: 8, nome: "Calça Jeans Reta", categoria: "calcas", marca: "Diesel", imagem: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", preco: 299.90, avaliacao: 4.9, descricao: "Corte reto clássico e atemporal.", estoque: 7 },
  { id: 9, nome: "Calça Cargo", categoria: "calcas", marca: "Carhartt", imagem: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400", preco: 189.90, avaliacao: 4.5, descricao: "Estilo cargo com múltiplos bolsos.", estoque: 0 },
  { id: 10, nome: "Calça Alfaiataria", categoria: "calcas", marca: "Hugo Boss", imagem: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400", preco: 349.90, avaliacao: 4.9, descricao: "Elegância e sofisticação para ocasiões especiais.", estoque: 3 },
  { id: 11, nome: "Calça Moletom", categoria: "calcas", marca: "Nike", imagem: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400", preco: 159.90, avaliacao: 4.6, descricao: "Conforto máximo para o dia a dia.", estoque: 18 },
  { id: 12, nome: "Calça Chino", categoria: "calcas", marca: "Gap", imagem: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400", preco: 169.90, avaliacao: 4.4, descricao: "Versatilidade e estilo casual elegante.", estoque: 14 },

  // Tênis
  { id: 13, nome: "Tênis Air Max Classic", categoria: "tenis", marca: "Nike", imagem: "https://images.unsplash.com/photo-1656944227480-98180d2a5155?w=400", preco: 599.90, avaliacao: 5.0, descricao: "Ícone do street style com tecnologia Air.", estoque: 6 },
  { id: 14, nome: "Tênis Ultraboost", categoria: "tenis", marca: "Adidas", imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", preco: 699.90, avaliacao: 4.9, descricao: "Máximo conforto e performance.", estoque: 4 },
  { id: 15, nome: "Tênis Chuck Taylor", categoria: "tenis", marca: "Converse", imagem: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400", preco: 249.90, avaliacao: 4.7, descricao: "Clássico atemporal da cultura urbana.", estoque: 22 },
  { id: 16, nome: "Tênis Old Skool", categoria: "tenis", marca: "Vans", imagem: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400", preco: 329.90, avaliacao: 4.8, descricao: "Estilo skate autêntico e versátil.", estoque: 11 },
  { id: 17, nome: "Tênis Running Pro", categoria: "tenis", marca: "Asics", imagem: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400", preco: 549.90, avaliacao: 4.8, descricao: "Performance superior para corrida.", estoque: 0 },
  { id: 18, nome: "Tênis Casual Leather", categoria: "tenis", marca: "Puma", imagem: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400", preco: 399.90, avaliacao: 4.6, descricao: "Couro premium para um look sofisticado.", estoque: 9 },

  // Acessórios
  { id: 19, nome: "Relógio Smartwatch Elite", categoria: "acessorios", marca: "Apple", imagem: "https://images.unsplash.com/photo-1761284976242-d55d1e339805?w=400", preco: 2499.90, avaliacao: 5.0, descricao: "Tecnologia de ponta no seu pulso.", estoque: 2 },
  { id: 20, nome: "Carteira de Couro Premium", categoria: "acessorios", marca: "Mont Blanc", imagem: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400", preco: 449.90, avaliacao: 4.9, descricao: "Sofisticação em couro legítimo.", estoque: 15 },
  { id: 21, nome: "Cinto de Couro Clássico", categoria: "acessorios", marca: "Gucci", imagem: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400", preco: 899.90, avaliacao: 4.8, descricao: "Elegância italiana em cada detalhe.", estoque: 5 },
  { id: 22, nome: "Mochila Urban Style", categoria: "acessorios", marca: "Herschel", imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", preco: 349.90, avaliacao: 4.7, descricao: "Funcionalidade e estilo urbano.", estoque: 13 },
  { id: 23, nome: "Boné Snapback", categoria: "acessorios", marca: "New Era", imagem: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400", preco: 129.90, avaliacao: 4.5, descricao: "Proteção e estilo casual.", estoque: 25 },
  { id: 24, nome: "Lenço de Seda Premium", categoria: "acessorios", marca: "Hermès", imagem: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400", preco: 1299.90, avaliacao: 4.9, descricao: "Luxo e elegância em seda pura.", estoque: 0 },

  // Óculos
  { id: 25, nome: "Óculos de Sol Aviador", categoria: "oculos", marca: "Ray-Ban", imagem: "https://images.unsplash.com/photo-1663585703603-9be01a72a62a?w=400", preco: 549.90, avaliacao: 5.0, descricao: "Clássico aviador com proteção UV.", estoque: 8 },
  { id: 26, nome: "Óculos Wayfarer", categoria: "oculos", marca: "Ray-Ban", imagem: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400", preco: 499.90, avaliacao: 4.9, descricao: "Ícone do estilo casual elegante.", estoque: 12 },
  { id: 27, nome: "Óculos Esportivo Polarizado", categoria: "oculos", marca: "Oakley", imagem: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400", preco: 799.90, avaliacao: 4.8, descricao: "Performance e proteção máxima.", estoque: 4 },
  { id: 28, nome: "Óculos Fashion Cat Eye", categoria: "oculos", marca: "Prada", imagem: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=400", preco: 1299.90, avaliacao: 4.9, descricao: "Elegância feminina e sofisticação.", estoque: 3 },
  { id: 29, nome: "Óculos Redondo Vintage", categoria: "oculos", marca: "Persol", imagem: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400", preco: 699.90, avaliacao: 4.7, descricao: "Estilo retrô com qualidade premium.", estoque: 6 },
  { id: 30, nome: "Óculos Clubmaster", categoria: "oculos", marca: "Ray-Ban", imagem: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400", preco: 579.90, avaliacao: 4.8, descricao: "Combinação perfeita de metal e acetato.", estoque: 10 },

  // Perfumes
  { id: 31, nome: "Perfume Sauvage", categoria: "perfumes", marca: "Dior", imagem: "https://images.unsplash.com/photo-1607506740211-ff3d6b933dda?w=400", preco: 549.90, avaliacao: 5.0, descricao: "Fragrância masculina intensa e marcante.", estoque: 7 },
  { id: 32, nome: "Perfume Black Opium", categoria: "perfumes", marca: "Yves Saint Laurent", imagem: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400", preco: 599.90, avaliacao: 4.9, descricao: "Feminilidade e poder em cada gota.", estoque: 5 },
  { id: 33, nome: "Perfume One Million", categoria: "perfumes", marca: "Paco Rabanne", imagem: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400", preco: 489.90, avaliacao: 4.8, descricao: "Sofisticação e luxo masculino.", estoque: 11 },
  { id: 34, nome: "Perfume Chanel Nº 5", categoria: "perfumes", marca: "Chanel", imagem: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400", preco: 899.90, avaliacao: 5.0, descricao: "O perfume mais icônico de todos os tempos.", estoque: 0 },
  { id: 35, nome: "Perfume Acqua di Giò", categoria: "perfumes", marca: "Giorgio Armani", imagem: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400", preco: 529.90, avaliacao: 4.9, descricao: "Frescor mediterrâneo em fragrância.", estoque: 9 },
  { id: 36, nome: "Perfume La Vie Est Belle", categoria: "perfumes", marca: "Lancôme", imagem: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400", preco: 649.90, avaliacao: 4.8, descricao: "A vida é bela em cada gota.", estoque: 6 },

  // Mais Camisetas
  { id: 37, nome: "Camiseta Gola V", categoria: "camisetas", marca: "Calvin Klein", imagem: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400", preco: 99.90, avaliacao: 4.5, descricao: "Elegância minimalista com gola V.", estoque: 14 },
  { id: 38, nome: "Camiseta Manga Longa Premium", categoria: "camisetas", marca: "Ralph Lauren", imagem: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400", preco: 149.90, avaliacao: 4.7, descricao: "Conforto e estilo para todas as estações.", estoque: 8 },
  { id: 39, nome: "Camiseta Estampa Grafite", categoria: "camisetas", marca: "Supreme", imagem: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400", preco: 199.90, avaliacao: 4.8, descricao: "Arte urbana em forma de moda.", estoque: 3 },
  { id: 40, nome: "Camiseta Tech Fit", categoria: "camisetas", marca: "Under Armour", imagem: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400", preco: 129.90, avaliacao: 4.6, descricao: "Tecnologia e performance esportiva.", estoque: 16 },

  // Mais Calças
  { id: 41, nome: "Calça Jogger Premium", categoria: "calcas", marca: "Adidas", imagem: "https://images.unsplash.com/photo-1624378440070-7cc66fd98f65?w=400", preco: 199.90, avaliacao: 4.7, descricao: "Estilo urbano com máximo conforto.", estoque: 10 },
  { id: 42, nome: "Calça Sarja Slim", categoria: "calcas", marca: "Zara", imagem: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400", preco: 159.90, avaliacao: 4.4, descricao: "Versatilidade para qualquer ocasião.", estoque: 12 },
  { id: 43, nome: "Calça Jeans Destroyed", categoria: "calcas", marca: "Diesel", imagem: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=400", preco: 279.90, avaliacao: 4.6, descricao: "Atitude e estilo autêntico.", estoque: 5 },
  { id: 44, nome: "Calça de Linho", categoria: "calcas", marca: "Osklen", imagem: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400", preco: 229.90, avaliacao: 4.5, descricao: "Frescor e elegância natural.", estoque: 0 },

  // Mais Tênis
  { id: 45, nome: "Tênis Jordan Retro", categoria: "tenis", marca: "Nike", imagem: "https://images.unsplash.com/photo-1612902376107-47c2e54ed148?w=400", preco: 899.90, avaliacao: 5.0, descricao: "Lenda do basquete no seu pé.", estoque: 4 },
  { id: 46, nome: "Tênis New Balance Classic", categoria: "tenis", marca: "New Balance", imagem: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400", preco: 449.90, avaliacao: 4.7, descricao: "Conforto retrô e qualidade premium.", estoque: 13 },
  { id: 47, nome: "Tênis Reebok Classic", categoria: "tenis", marca: "Reebok", imagem: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400", preco: 349.90, avaliacao: 4.5, descricao: "Clássico dos anos 80 sempre atual.", estoque: 7 },
  { id: 48, nome: "Tênis Slip-On Casual", categoria: "tenis", marca: "Vans", imagem: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400", preco: 269.90, avaliacao: 4.6, descricao: "Praticidade e estilo sem cadarço.", estoque: 19 },

  // Mais Acessórios
  { id: 49, nome: "Pulseira de Couro Trançada", categoria: "acessorios", marca: "Fossil", imagem: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400", preco: 159.90, avaliacao: 4.4, descricao: "Estilo casual e masculino.", estoque: 20 },
  { id: 50, nome: "Anel de Prata Premium", categoria: "acessorios", marca: "Pandora", imagem: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400", preco: 299.90, avaliacao: 4.7, descricao: "Elegância em prata de lei.", estoque: 11 },
  { id: 51, nome: "Gravata de Seda Italiana", categoria: "acessorios", marca: "Ermenegildo Zegna", imagem: "https://images.unsplash.com/photo-1617110489413-8336cfc53be6?w=400", preco: 399.90, avaliacao: 4.8, descricao: "Sofisticação para o dress code.", estoque: 6 },
  { id: 52, nome: "Luvas de Couro Touch", categoria: "acessorios", marca: "Burberry", imagem: "https://images.unsplash.com/photo-1603217039863-aa3f1f7131b5?w=400", preco: 549.90, avaliacao: 4.6, descricao: "Tecnologia touch em couro premium.", estoque: 4 },

  // Mais Óculos
  { id: 53, nome: "Óculos Hexagonal Fashion", categoria: "oculos", marca: "Ray-Ban", imagem: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400", preco: 629.90, avaliacao: 4.7, descricao: "Estilo único e diferenciado.", estoque: 9 },
  { id: 54, nome: "Óculos Oversized Glam", categoria: "oculos", marca: "Gucci", imagem: "https://images.unsplash.com/photo-1509695507497-903c140c8821?w=400", preco: 1799.90, avaliacao: 4.9, descricao: "Luxo e glamour italiano.", estoque: 2 },
  { id: 55, nome: "Óculos de Grau Minimalista", categoria: "oculos", marca: "Armani", imagem: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400", preco: 899.90, avaliacao: 4.8, descricao: "Elegância discreta e sofisticada.", estoque: 5 },
  { id: 56, nome: "Óculos Espelhado Esportivo", categoria: "oculos", marca: "Oakley", imagem: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=400", preco: 849.90, avaliacao: 4.7, descricao: "Performance e proteção para atletas.", estoque: 7 },

  // Mais Perfumes
  { id: 57, nome: "Perfume Invictus", categoria: "perfumes", marca: "Paco Rabanne", imagem: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400", preco: 519.90, avaliacao: 4.8, descricao: "Força e vitalidade masculina.", estoque: 8 },
  { id: 58, nome: "Perfume Good Girl", categoria: "perfumes", marca: "Carolina Herrera", imagem: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400", preco: 629.90, avaliacao: 4.9, descricao: "Dualidade feminina em fragrância.", estoque: 6 },
  { id: 59, nome: "Perfume Bleu de Chanel", categoria: "perfumes", marca: "Chanel", imagem: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400", preco: 749.90, avaliacao: 5.0, descricao: "Liberdade e elegância masculina.", estoque: 4 },
  { id: 60, nome: "Perfume Scandal", categoria: "perfumes", marca: "Jean Paul Gaultier", imagem: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400", preco: 579.90, avaliacao: 4.7, descricao: "Ousadia e sensualidade feminina.", estoque: 10 }
];

export const categorias = [
  { id: "todas", nome: "Todas as Categorias" },
  { id: "camisetas", nome: "Camisetas" },
  { id: "calcas", nome: "Calças" },
  { id: "tenis", nome: "Tênis" },
  { id: "acessorios", nome: "Acessórios" },
  { id: "oculos", nome: "Óculos" },
  { id: "perfumes", nome: "Perfumes" }
];

// Função para obter todas as marcas únicas
export function getAllBrands(): string[] {
  const brands = new Set(products.map(p => p.marca));
  return Array.from(brands).sort();
}

// Função para obter marcas de uma categoria específica
export function getBrandsByCategory(categoryId: string): string[] {
  if (categoryId === "todas") {
    return getAllBrands();
  }
  const brands = new Set(
    products.filter(p => p.categoria === categoryId).map(p => p.marca)
  );
  return Array.from(brands).sort();
}
