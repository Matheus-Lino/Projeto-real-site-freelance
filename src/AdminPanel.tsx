// import { useEffect, useState } from "react";
// import axios from "axios";

// const API_URL = "http://127.0.0.1:5000";

// export default function AdminPanel() {
//   const [products, setProducts] = useState<any[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [brands, setBrands] = useState<any[]>([]);
//   const [editingProduct, setEditingProduct] = useState<any | null>(null);
//   const [previewImage, setPreviewImage] = useState<string>("");

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     description: "",
//     category_id: "",
//     brand_id: "",
//     stock: "",
//     image_url: "",
//     image_file: null as File | null,
//   });

//   // =========================
//   // 1️⃣ Carregar dados iniciais
//   // =========================
//   useEffect(() => {
//     loadProducts();
//     loadCategories();
//     loadBrands();
//   }, []);

//   const loadProducts = async () => {
//     const res = await axios.get(`${API_URL}/products`);
//     setProducts(res.data);
//   };

//   const loadCategories = async () => {
//     const res = await axios.get(`${API_URL}/categories`);
//     setCategories(res.data);
//   };

//   const loadBrands = async () => {
//     const res = await axios.get(`${API_URL}/brands`);
//     setBrands(res.data);
//   };

//   // =========================
//   // 2️⃣ Manipulação de formulário
//   // =========================
//   const handleChange = (e: any) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e: any) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, image_file: file });
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     try {
//       let imageUrl = formData.image_url;

//       // Se o usuário anexou uma imagem, faz upload
//       if (formData.image_file) {
//         const uploadData = new FormData();
//         uploadData.append("file", formData.image_file);
//         const uploadRes = await axios.post(`${API_URL}/upload`, uploadData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         imageUrl = uploadRes.data.image_url;
//       }

//       const payload = {
//         name: formData.name,
//         price: parseFloat(formData.price),
//         description: formData.description,
//         category_id: formData.category_id ? parseInt(formData.category_id) : null,
//         brand_id: formData.brand_id ? parseInt(formData.brand_id) : null,
//         stock: formData.stock ? parseInt(formData.stock) : 0,
//         image_url: imageUrl,
//       };

//       if (!payload.name || !payload.price) {
//         alert("Nome e preço são obrigatórios!");
//         return;
//       }

//       if (editingProduct) {
//         await axios.put(`${API_URL}/products/${editingProduct.id}`, payload);
//       } else {
//         await axios.post(`${API_URL}/products`, payload);
//       }

//       resetForm();
//       loadProducts();
//     } catch (err: any) {
//       console.error("Erro ao salvar produto:", err);
//       alert("Erro ao salvar o produto. Verifique os campos e tente novamente.");
//     }
//   };

//   const handleEdit = (product: any) => {
//     setEditingProduct(product);
//     setFormData({
//       name: product.name,
//       price: product.price,
//       description: product.description,
//       category_id: product.category_id,
//       brand_id: product.brand_id,
//       stock: product.stock,
//       image_url: product.image_url,
//       image_file: null,
//     });
//     setPreviewImage(product.image_url);
//   };

//   const handleDelete = async (id: number) => {
//     if (confirm("Tem certeza que deseja excluir este produto?")) {
//       await axios.delete(`${API_URL}/products/${id}`);
//       loadProducts();
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       price: "",
//       description: "",
//       category_id: "",
//       brand_id: "",
//       stock: "",
//       image_url: "",
//       image_file: null,
//     });
//     setPreviewImage("");
//     setEditingProduct(null);
//   };

//   // =========================
//   // 3️⃣ Renderização
//   // =========================
//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
//         Painel Administrativo - Outlet Machado
//       </h1>

//       {/* FORMULÁRIO */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-4xl mx-auto"
//       >
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
//           <input name="name" placeholder="Nome do Produto" value={formData.name} onChange={handleChange} className="border p-2 rounded" />
//           <input name="price" placeholder="Preço (ex: 99.90)" value={formData.price} onChange={handleChange} className="border p-2 rounded" />
//           <input name="stock" placeholder="Estoque" value={formData.stock} onChange={handleChange} className="border p-2 rounded" />

//           <select name="category_id" value={formData.category_id} onChange={handleChange} className="border p-2 rounded">
//             <option value="">Selecione a Categoria</option>
//             {categories.map((c) => (
//               <option key={c.id} value={c.id}>{c.name}</option>
//             ))}
//           </select>

//           <select name="brand_id" value={formData.brand_id} onChange={handleChange} className="border p-2 rounded">
//             <option value="">Selecione a Marca</option>
//             {brands.map((b) => (
//               <option key={b.id} value={b.id}>{b.name}</option>
//             ))}
//           </select>

//           <input name="image_url" placeholder="Ou insira um link de imagem" value={formData.image_url} onChange={handleChange} className="border p-2 rounded" />

//           <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded" />
//         </div>

//         {previewImage && (
//           <div className="flex justify-center mb-4">
//             <img src={previewImage} alt="Preview" className="w-40 h-40 object-cover rounded-md border" />
//           </div>
//         )}

//         <textarea name="description" placeholder="Descrição" value={formData.description} onChange={handleChange} className="border p-2 rounded w-full mb-4" />

//         <div className="flex flex-wrap gap-2 justify-center">
//           <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">
//             {editingProduct ? "Atualizar Produto" : "Cadastrar Produto"}
//           </button>
//           {editingProduct && (
//             <button type="button" onClick={resetForm} className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded">
//               Cancelar
//             </button>
//           )}
//         </div>
//       </form>

//       {/* TABELA DE PRODUTOS */}
//       <div className="overflow-x-auto max-w-6xl mx-auto">
//         <table className="w-full border bg-white rounded-lg shadow">
//           <thead className="bg-blue-100">
//             <tr>
//               <th className="border p-2">ID</th>
//               <th className="border p-2">Nome</th>
//               <th className="border p-2">Preço</th>
//               <th className="border p-2">Categoria</th>
//               <th className="border p-2">Marca</th>
//               <th className="border p-2">Estoque</th>
//               <th className="border p-2">Ações</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((p) => (
//               <tr key={p.id} className="hover:bg-gray-50">
//                 <td className="border p-2">{p.id}</td>
//                 <td className="border p-2">{p.name}</td>
//                 <td className="border p-2">
//                     R$ {isNaN(Number(p.price)) ? "0.00" : Number(p.price).toFixed(2)}
//                 </td>
//                 <td className="border p-2">{categories.find(c => c.id === p.category_id)?.name || "—"}</td>
//                 <td className="border p-2">{brands.find(b => b.id === p.brand_id)?.name || "—"}</td>
//                 <td className="border p-2">{p.stock}</td>
//                 <td className="border p-2 text-center">
//                   <button onClick={() => handleEdit(p)} className="bg-yellow-400 text-white px-3 py-1 rounded mr-2">Editar</button>
//                   <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-3 py-1 rounded">Excluir</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminPanel() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category_id: "",
    brand_id: "",
    stock: "",
    image_url: "",
    image_file: null as File | null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    loadProducts();
    loadCategories();
    loadBrands();
  }, []);

  const loadProducts = async () => {
    const res = await axios.get(`${API_URL}/products`);
    setProducts(res.data);
  };
  const loadCategories = async () => {
    const res = await axios.get(`${API_URL}/categories`);
    setCategories(res.data);
  };
  const loadBrands = async () => {
    const res = await axios.get(`${API_URL}/brands`);
    setBrands(res.data);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image_file: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: "Cadastrar produto?",
      text: "Deseja realmente cadastrar este produto?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim, cadastrar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
    });

    if (!confirm.isConfirmed) return;

    try {
      let imageUrl = formData.image_url;

      if (formData.image_file) {
        const uploadData = new FormData();
        uploadData.append("file", formData.image_file);
        const uploadRes = await axios.post(`${API_URL}/upload`, uploadData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = uploadRes.data.image_url;
      }

      const payload = {
        name: formData.name,
        price: parseFloat(String(formData.price)),
        description: formData.description,
        category_id: formData.category_id
          ? parseInt(String(formData.category_id))
          : null,
        brand_id: formData.brand_id
          ? parseInt(String(formData.brand_id))
          : null,
        stock: formData.stock ? parseInt(String(formData.stock)) : 0,
        image_url: imageUrl,
      };

      if (!payload.name || isNaN(Number(payload.price))) {
        Swal.fire({
          icon: "warning",
          title: "Campos inválidos",
          text: "Nome e preço válidos são obrigatórios!",
          confirmButtonColor: "#2563eb",
        });
        return;
      }

      if (editingProduct) {
        await axios.put(`${API_URL}/products/${editingProduct.id}`, payload);
      } else {
        await axios.post(`${API_URL}/products`, payload);
      }

      resetForm();
      await loadProducts();

      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Produto cadastrado com sucesso.",
        confirmButtonColor: "#16a34a",
      });
    } catch (err) {
      console.error("Erro ao cadastrar produto:", err);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Não foi possível cadastrar o produto.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      category_id: "",
      brand_id: "",
      stock: "",
      image_url: "",
      image_file: null,
    });
    setPreviewImage("");
    setEditingProduct(null);
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Excluir produto?",
      text: "Essa ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/products/${id}`);
      await loadProducts();

      Swal.fire({
        icon: "success",
        title: "Excluído!",
        text: "O produto foi removido com sucesso.",
        confirmButtonColor: "#16a34a",
      });
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Não foi possível excluir o produto.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Painel Administrativo - Outlet Machado
      </h1>

      {/* FORMULÁRIO */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <input
            name="name"
            placeholder="Nome do Produto"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            name="price"
            placeholder="Preço (ex: 99.90)"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            name="stock"
            placeholder="Estoque"
            value={formData.stock}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Selecione Categoria</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            name="brand_id"
            value={formData.brand_id}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Selecione Marca</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          <input
            name="image_url"
            placeholder="Ou insira link de imagem"
            value={formData.image_url}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded"
          />
        </div>

        {previewImage && (
          <div className="flex justify-center mb-4">
            <img
              src={previewImage}
              alt="Pré-visualização"
              className="w-40 h-40 object-cover rounded border"
            />
          </div>
        )}

        <textarea
          name="description"
          placeholder="Descrição"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-4"
        />

        <div className="flex justify-center gap-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            {editingProduct ? "Atualizar Produto" : "Cadastrar Produto"}
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* LISTAGEM DE PRODUTOS */}
      <div className="overflow-x-auto max-w-6xl mx-auto">
        <table className="w-full border bg-white rounded-lg shadow">
          <thead className="bg-blue-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Nome</th>
              <th className="border p-2">Preço</th>
              <th className="border p-2">Categoria</th>
              <th className="border p-2">Marca</th>
              <th className="border p-2">Estoque</th>
              <th className="border p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="border p-2">{p.id}</td>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">
                  R${" "}
                  {isNaN(Number(p.price))
                    ? "0.00"
                    : Number(p.price).toFixed(2)}
                </td>
                <td className="border p-2">
                  {categories.find((c) => c.id === p.category_id)?.name || "—"}
                </td>
                <td className="border p-2">
                  {brands.find((b) => b.id === p.brand_id)?.name || "—"}
                </td>
                <td className="border p-2">{p.stock}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4 gap-2 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            ◀ Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
          </button>
        </div>
      </div>
    </div>
  );
}

