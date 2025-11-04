// src/components/ProductManager.jsx

// import React, { useState, useEffect } from 'react';
// import {
//   Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer,
//   Heading, Button, Flex, useToast, Spinner,
// } from '@chakra-ui/react';
// import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';

// // Simulação de Dados de Produto (em produção, viria da sua API)
// const mockProducts = [
//   { id: 1, name: 'Tênis Adidas Ultraboost', brand: 'Adidas', price: 699.99, stock: 45 },
//   { id: 14, name: 'Óculos de Sol Juliet', brand: 'Oakley', price: 120.00, stock: 11 },
//   // ... mais produtos
// ];

// function ProductManager() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const toast = useToast();

//   // Função para buscar dados da sua API (Backend)
//   useEffect(() => {
//     // Aqui você faria uma chamada real para sua API
//     // Ex: fetch('/api/products').then(res => res.json()).then(data => setProducts(data));
    
//     // Simulação de carregamento (para fins de demonstração)
//     setTimeout(() => {
//       setProducts(mockProducts);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   // --- Funções de Ação (CRUD) ---

//   const handleEdit = (product) => {
//     // Lógica para abrir um modal ou navegar para a página de edição
//     console.log('Editar produto:', product.id);
//     toast({
//       title: `Editar ${product.name}`,
//       description: "Lógica de edição em modal ou formulário.",
//       status: "info",
//       duration: 2000,
//       isClosable: true,
//     });
//   };

//   const handleDelete = async (productId) => {
//     // 1. Confirmação (Ex: use um AlertDialog do Chakra UI)
//     if (!window.confirm("Tem certeza que deseja deletar este produto?")) {
//       return;
//     }

//     // 2. Chamada à API de exclusão
//     // Ex: await fetch(`/api/products/${productId}`, { method: 'DELETE' });
    
//     // 3. Atualização Rápida da UI (Reatividade)
//     setProducts(products.filter(p => p.id !== productId));
    
//     toast({
//       title: "Produto Deletado.",
//       description: `Produto ID ${productId} foi removido com sucesso.`,
//       status: "success",
//       duration: 3000,
//       isClosable: true,
//     });
//   };

//   if (loading) {
//     return (
//       <Flex justify="center" align="center" height="100vh">
//         <Spinner size="xl" />
//       </Flex>
//     );
//   }

//   return (
//     <Box p={8} maxW="1200px" mx="auto">
//       <Flex justify="space-between" align="center" mb={6}>
//         <Heading as="h1" size="xl">
//           🚀 Gestão de Produtos
//         </Heading>
//         <Button 
//           leftIcon={<AddIcon />} 
//           colorScheme="teal" 
//           onClick={() => console.log('Adicionar novo produto')}
//         >
//           Novo Produto
//         </Button>
//       </Flex>

//       <TableContainer border="1px" borderColor="gray.200" borderRadius="lg" p={4} bg="white">
//         <Table variant="simple" colorScheme="gray">
//           <Thead bg="gray.50">
//             <Tr>
//               <Th>ID</Th>
//               <Th>Nome</Th>
//               <Th>Marca</Th>
//               <Th isNumeric>Preço</Th>
//               <Th isNumeric>Estoque</Th>
//               <Th textAlign="center">Ações</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {products.map((product) => (
//               <Tr key={product.id} _hover={{ bg: 'gray.50' }}>
//                 <Td fontWeight="bold">{product.id}</Td>
//                 <Td>{product.name}</Td>
//                 <Td>{product.brand}</Td>
//                 <Td isNumeric>R$ {product.price.toFixed(2)}</Td>
//                 <Td isNumeric>{product.stock}</Td>
//                 <Td textAlign="center">
//                   <Button 
//                     size="sm" 
//                     colorScheme="blue" 
//                     onClick={() => handleEdit(product)} 
//                     mr={2}
//                     leftIcon={<EditIcon />}
//                   >
//                     Editar
//                   </Button>
//                   <Button 
//                     size="sm" 
//                     colorScheme="red" 
//                     onClick={() => handleDelete(product.id)}
//                     leftIcon={<DeleteIcon />}
//                   >
//                     Deletar
//                   </Button>
//                 </Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }

// export default ProductManager;

import React, { useState, useEffect } from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer,
  Heading, Button, Flex, useToast, Spinner,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';

const API_BASE_URL = 'http://127.0.0.1:5000'; 


function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchProductsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Falha ao buscar produtos da API.');
      }
      const data = await response.json();
      setProducts(data);
      toast({
        title: "Produtos Carregados.",
        description: `Encontrados ${data.length} produtos.`,
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      toast({
        title: "Erro de API.",
        description: "Não foi possível conectar ao backend ou buscar os dados.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setProducts([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []); 

  const handleEdit = (product) => {
    console.log('Editar produto:', product.id);
    toast({
      title: `Editar ${product.name}`,
      description: "Lógica para abrir modal/formulário de edição.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Tem certeza que deseja deletar este produto?")) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, { 
        method: 'DELETE' 
      });

      if (!response.ok) {
        throw new Error('Falha ao deletar produto.');
      }
      
      setProducts(products.filter(p => p.id !== productId));
      
      toast({
        title: "Produto Deletado.",
        description: `Produto ID ${productId} foi removido com sucesso.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        toast({
            title: "Erro de Exclusão.",
            description: "Não foi possível remover o produto.",
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="calc(100vh - 8rem)"> 
        <Spinner size="xl" color="blue.500" thickness="4px" />
      </Flex>
    );
  }

  return (
    <Box p={2} maxW="100%" mx="auto"> {/* Ajuste no padding e maxW */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" size="xl" className="text-gray-900">
          🚀 Gestão de Produtos
        </Heading>
        <Button 
          leftIcon={<AddIcon />} 
          colorScheme="teal" 
          onClick={() => console.log('Adicionar novo produto')} // Lógica de adição
        >
          Novo Produto
        </Button>
      </Flex>

      <TableContainer border="1px" borderColor="gray.200" borderRadius="lg" p={4} bg="white" shadow="md">
        <Table variant="simple" colorScheme="blue" size="md">
          <Thead bg="blue.50">
            <Tr>
              <Th>ID</Th>
              <Th>Nome</Th>
              <Th>Categoria</Th> 
              <Th isNumeric>Preço</Th>
              <Th isNumeric>Estoque</Th>
              <Th textAlign="center">Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product.id} _hover={{ bg: 'gray.50' }}>
                <Td fontWeight="bold">{product.id}</Td>
                <Td>{product.name}</Td>
                <Td>{product.category_id}</Td> 
                <Td isNumeric>R$ {parseFloat(product.price).toFixed(2)}</Td>
                <Td isNumeric>{product.stock}</Td>
                <Td textAlign="center" className="min-w-[150px]">
                  <Button 
                    size="sm" 
                    colorScheme="blue" 
                    onClick={() => handleEdit(product)} 
                    mr={2}
                    leftIcon={<EditIcon />}
                  >
                    Editar
                  </Button>
                  <Button 
                    size="sm" 
                    colorScheme="red" 
                    onClick={() => handleDelete(product.id)}
                    leftIcon={<DeleteIcon />}
                  >
                    Deletar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {products.length === 0 && (
            <Flex justify="center" align="center" py={10}>
                <p className="text-gray-500">Nenhum produto cadastrado.</p>
            </Flex>
        )}
      </TableContainer>
    </Box>
  );
}

export default ProductManager;