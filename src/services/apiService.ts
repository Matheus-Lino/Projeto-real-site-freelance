const API_BASE_URL = 'http://127.0.0.1:5000';

export interface Product {
    id: number;
    name: string;  
    price: string; 
    description: string;
    stock: number;  
    category_id: number;
    brand_id: number;
    image_url: string; 
    rating: string;  
    discount_percent: number;
    avaliacao: number; 
}

export interface Category {
    id: number | 'todas'; 
    name: string;
}

export interface Brand {
    id: number;
    name: string;
}

async function fetchData<T>(endpoint: string): Promise<T> {
    const url = `${API_BASE_URL}/${endpoint}`;
    console.log(`Buscando dados em: ${url}`); // DEBUG
    
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro de HTTP: ${response.status} ao buscar ${endpoint}`);
        }

        const data = await response.json();
        return data as T;
        
    } catch (error) {
        console.error(`Falha ao buscar ${endpoint}:`, error);
        return [] as unknown as T; 
    }
}

export async function fetchProducts(): Promise<Product[]> {
    const products = await fetchData<Product[]>('products');
    
    return products.map(p => ({
        ...p,
        price: parseFloat(p.price as unknown as string),
        rating: parseFloat(p.rating as unknown as string),
        avaliacao: parseFloat(p.rating as unknown as string), 
    })) as unknown as Product[];
}


export async function fetchCategories(): Promise<Category[]> {
    return fetchData<Category[]>('categories');
}

export async function fetchBrands(): Promise<Brand[]> {
    return fetchData<Brand[]>('brands');
}