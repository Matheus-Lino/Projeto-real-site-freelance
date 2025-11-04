import React, { useState, useEffect } from 'react';

// Define o formato esperado dos dados agrupados por categoria
interface ApiData {
    [category: string]: string[]; 
}

/**
 * Componente de teste para validar a conexão React -> Flask -> MySQL.
 * Exibe a lista de Categorias e Marcas do banco de dados.
 */
export function ApiDataTest() {
    const [data, setData] = useState<ApiData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // O ENDPOINT DO SEU SERVIDOR FLASK
        const API_URL = `${import.meta.env.VITE_API_URL}/api/outlet_machado`;

        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    // Tenta ler o JSON de erro do backend para uma mensagem mais específica
                    if (response.status === 500) {
                        return response.json().then(errData => {
                            throw new Error(errData.erro || `Erro no servidor Flask (Status: ${response.status})`);
                        }).catch(() => {
                            throw new Error(`Erro interno do servidor (Status: ${response.status})`);
                        });
                    }
                    throw new Error(`Erro de rede ao conectar (Status: ${response.status})`);
                }
                return response.json();
            })
            .then((data: ApiData) => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro na requisição:", error);
                setError(error.message); 
                setLoading(false);
            });
    }, []);

    // --- Lógica de Renderização ---

    if (loading) {
        return <div className="p-10 text-center text-lg text-gray-700">Carregando dados da API...</div>;
    }

    if (error) {
        return <div className="p-10 text-center text-xl font-semibold text-red-600">🚨 Erro de Conexão: {error}</div>;
    }
    
    const categoriasArray = Object.entries(data || {});

    return (
        <section id="api-data-test" className="py-8 px-4 bg-blue-50 border-t border-b border-blue-200">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
                    ✅ Conexão Flask-MySQL-React BEM-SUCEDIDA!
                </h2>
                <p className="text-center text-gray-700 mb-8">
                    {categoriasArray.length} Categorias carregadas diretamente do banco de dados `outlet_machado`.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoriasArray.length === 0 ? (
                        <p className="col-span-full text-center text-gray-600">
                            O banco de dados está conectado, mas não retornou categorias ou as tabelas estão vazias.
                        </p>
                    ) : (
                        categoriasArray.map(([categoria, marcas]) => (
                            <div 
                                key={categoria} 
                                className="p-4 bg-white rounded-lg shadow-md border border-gray-100"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 border-b pb-1">
                                    {categoria.toUpperCase()} ({marcas.length} Marcas)
                                </h3>
                                <ul className="list-disc list-inside text-sm text-gray-600">
                                    {marcas.map((marca, index) => (
                                        <li key={index} className="truncate">{marca}</li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}