// import React, { useState, useEffect } from 'react';

// // Define o formato esperado dos dados agrupados por categoria
// interface ApiData {
//     [category: string]: string[]; 
// }

// /**
//  * Componente de teste para validar a conexão React -> Flask -> MySQL.
//  * Exibe a lista de Categorias e Marcas do banco de dados.
//  */
// export function ApiDataTest() {
//     const [data, setData] = useState<ApiData | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         // O ENDPOINT DO SEU SERVIDOR FLASK
//         const API_URL = `${import.meta.env.VITE_API_URL}/categories`;

//         fetch(API_URL)
//             .then(response => {
//                 if (!response.ok) {
//                     // Tenta ler o JSON de erro do backend para uma mensagem mais específica
//                     if (response.status === 500) {
//                         return response.json().then(errData => {
//                             throw new Error(errData.erro || `Erro no servidor Flask (Status: ${response.status})`);
//                         }).catch(() => {
//                             throw new Error(`Erro interno do servidor (Status: ${response.status})`);
//                         });
//                     }
//                     throw new Error(`Erro de rede ao conectar (Status: ${response.status})`);
//                 }
//                 return response.json();
//             })
//             .then((data: ApiData) => {
//                 setData(data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error("Erro na requisição:", error);
//                 setError(error.message); 
//                 setLoading(false);
//             });
//     }, []);

//     // --- Lógica de Renderização ---

//     if (loading) {
//         return <div className="p-10 text-center text-lg text-gray-700">Carregando dados da API...</div>;
//     }

//     if (error) {
//         return <div className="p-10 text-center text-xl font-semibold text-red-600">🚨 Erro de Conexão: {error}</div>;
//     }
    
//     const categoriasArray = Object.entries(data || {});

//     return (
//         <section id="api-data-test" className="py-8 px-4 bg-blue-50 border-t border-b border-blue-200">
//             <div className="max-w-7xl mx-auto">
//                 <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
//                     ✅ Conexão Flask-MySQL-React BEM-SUCEDIDA!
//                 </h2>
//                 <p className="text-center text-gray-700 mb-8">
//                     {categoriasArray.length} Categorias carregadas diretamente do banco de dados `outlet_machado`.
//                 </p>

//                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {categoriasArray.length === 0 ? (
//                         <p className="col-span-full text-center text-gray-600">
//                             O banco de dados está conectado, mas não retornou categorias ou as tabelas estão vazias.
//                         </p>
//                     ) : (
//                         categoriasArray.map(([categoria, marcas]) => (
//                             <div 
//                                 key={categoria} 
//                                 className="p-4 bg-white rounded-lg shadow-md border border-gray-100"
//                             >
//                                 <h3 className="text-lg font-semibold text-gray-900 mb-2 border-b pb-1">
//                                     {categoria.toUpperCase()} ({marcas.length} Marcas)
//                                 </h3>
//                                 <ul className="list-disc list-inside text-sm text-gray-600">
//                                     {marcas.map((marca, index) => (
//                                         <li key={index} className="truncate">{marca}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// }

import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
}

interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

export function ApiDataTest() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        // 🔹 Faz todas as requisições em paralelo
        const [prodRes, catRes, brandRes] = await Promise.all([
          fetch(`${API_URL}/products`),
          fetch(`${API_URL}/categories`),
          fetch(`${API_URL}/brands`),
        ]);

        if (!prodRes.ok || !catRes.ok || !brandRes.ok) {
          throw new Error("Erro ao buscar dados da API.");
        }

        const [prodData, catData, brandData] = await Promise.all([
          prodRes.json(),
          catRes.json(),
          brandRes.json(),
        ]);

        setProducts(prodData);
        setCategories(catData);
        setBrands(brandData);
      } catch (err: any) {
        console.error("Erro ao conectar com a API:", err);
        setError(err.message || "Erro desconhecido ao conectar com a API.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="p-10 text-center text-lg text-gray-700">
        Carregando dados da API...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-xl font-semibold text-red-600">
        🚨 Erro: {error}
      </div>
    );
  }

  return (
    <section className="py-10 px-4 bg-gray-50 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          ✅ Conexão React → Flask → MySQL funcionando!
        </h2>

        {/* Categorias */}
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Categorias</h3>
        <ul className="mb-6 list-disc list-inside text-gray-700">
          {categories.map((cat) => (
            <li key={cat.id}>{cat.name}</li>
          ))}
        </ul>

        {/* Marcas */}
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Marcas</h3>
        <ul className="mb-6 list-disc list-inside text-gray-700">
          {brands.map((b) => (
            <li key={b.id}>{b.name}</li>
          ))}
        </ul>

        {/* Produtos */}
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Produtos</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow p-4 border border-gray-200"
            >
              {p.image_url && (
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h4 className="text-lg font-semibold text-gray-900">{p.name}</h4>
              <p className="text-gray-700 text-sm mb-2">{p.description}</p>
              <p className="text-blue-600 font-bold">
                R$ {p.price.toFixed(2).replace(".", ",")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
