import Header from "./components/Header";
import ProductForm from "./components/ProductForm";
import ProductStats from "./components/ProductStats";
import ProductFilters from "./components/ProductFilters";
import ProductTable from "./components/ProductTable";
import Footer from "./components/Footer";
import { useTheme } from "./hooks/useTheme";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/auth";
import Login from "./pages/Login";
import { FaBoxOpen, FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { FiMoon, FiSun, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { db } from "./firebase/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

function App() {
  const { darkMode, setDarkMode } = useTheme();

  const [form, setForm] = useState({
    image: "",
    firestoreId: null,
    code: "",
    name: "",
    category: "Informática",
    customCategory: "",
    description: "",
    price: "",
    quantity: "",
    createdAt: "",
  });

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err.message);
    }
  };

  const formatBRL = (value) => {
    if (!value) return "";

    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        firestoreId: doc.id,
        ...doc.data(),
      }));

      setProducts(data);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const isAdmin = user?.email === "aluno_uniasselvi@gmail.com";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveProduct = async () => {
    if (!form.name || !form.category || !form.price || !form.quantity) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    if (form.category === "Outro" && !form.customCategory.trim()) {
      toast.error("Informe a categoria personalizada.");
      return;
    }

    const id = form.firestoreId;

    const newProduct = {
      image: form.image,
      code: form.code,
      name: form.name,
      category: form.category === "Outro" ? form.customCategory : form.category,
      description: form.description,
      price: Number(form.price),
      quantity: form.quantity,
      createdAt: form.createdAt,
    };

    try {
      if (id) {
        await updateDoc(doc(db, "products", id), newProduct);
        toast.success("Atualizado!");
      } else {
        await addDoc(collection(db, "products"), {
          ...newProduct,
          createdAt: new Date().toLocaleDateString("pt-BR"),
        });
        toast.success("Criado!");
      }

      clearForm();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar");
    }
  };

  const editProduct = (product) => {
    setForm({
      firestoreId: product.firestoreId,
      image: product.image || "",
      code: product.code || "",
      name: product.name || "",
      category: product.category || "Informática",
      customCategory: product.customCategory || "",
      description: product.description || "",
      price: product.price ? String(product.price) : "",
      quantity: product.quantity ? String(product.quantity) : "",
      createdAt: product.createdAt || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("EDITANDO:", product.firestoreId);
  };

  const finalCategory =
    form.category === "Outro" ? form.customCategory : form.category;

  const deleteProduct = (firestoreId) => {
    if (!firestoreId) {
      console.log("ID inválido");
      return;
    }

    setProductToDelete(firestoreId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "products", productToDelete));
      toast.success("Produto removido com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir produto");
    } finally {
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const clearForm = () => {
    setForm({
      firestoreId: null,
      code: "",
      name: "",
      category: "Informática",
      customCategory: "",
      price: "",
      quantity: "",
      description: "",
      image: "",
      createdAt: "",
    });
  };

  const getStatus = (quantity) => {
    if (Number(quantity) === 0) return "Sem estoque";
    if (Number(quantity) <= 5) return "Estoque baixo";
    return "Em estoque";
  };

  const filteredProducts = products.filter((product) => {
    const matchesName = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "Todos" || product.category === categoryFilter;

    const matchesStatus =
      statusFilter === "Todos" || getStatus(product.quantity) === statusFilter;

    const min = minPrice ? Number(minPrice) / 100 : 0;
    const max = maxPrice ? Number(maxPrice) / 100 : Infinity;

    const matchesPrice =
      Number(product.price) >= min && Number(product.price) <= max;

    return matchesName && matchesCategory && matchesStatus && matchesPrice;
  });

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const getPagination = () => {
    const pages = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter, statusFilter, minPrice, maxPrice]);

  const exportCSV = () => {
    const headers =
      "Codigo,Nome,Descricao,Categoria,Preco,Quantidade,Status,DataCadastro,Imagem\n";

    const rows = products
      .map(
        (p) =>
          `"${p.code}","${p.name}","${p.description}","${p.category}","${p.price}","${p.quantity}","${getStatus(p.quantity)}",` +
          `"${p.createdAt}","${p.image}"`,
      )
      .join("\n");

    const csv = headers + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "relatorio_produtos.csv";
    link.click();
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsub();
  }, []);

  return (
    <>
      <Toaster position="top-right" />

      <div
        className={`min-h-screen p-8 md:p-8 relative overflow-hidden ${
          darkMode ? "bg-[#020617] text-white" : "bg-slate-100 text-black"
        }`}
      >
        <div className="fixed top-10 left-10 w-72 h-72 rounded-full blur-3xl bg-cyan-300/30 pointer-events-none" />
        <div className="fixed top-40 right-20 w-96 h-96 rounded-full blur-3xl bg-blue-300/30 pointer-events-none" />
        <div className="fixed bottom-10 left-1/3 w-80 h-80 rounded-full blur-3xl bg-violet-300/30 pointer-events-none" />

        <div className="max-w-6xl mx-auto md:px-0 relative z-10">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} user={user} />

          <ProductForm
            form={form}
            setForm={setForm}
            saveProduct={saveProduct}
            clearForm={clearForm}
            darkMode={darkMode}
          />

          <div
            className={`mt-6 p-4 rounded-xl shadow-md ${
              darkMode
                ? "bg-slate-900/70 backdrop-blur-md border border-cyan-400/10"
                : "bg-white"
            }`}
          >
            <ProductStats products={products} darkMode={darkMode} />

            <ProductFilters
              search={search}
              setSearch={setSearch}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              products={products}
              filteredProducts={filteredProducts}
              darkMode={darkMode}
              exportCSV={exportCSV}
            />

            <ProductTable
              filteredProducts={paginatedProducts}
              editProduct={editProduct}
              deleteProduct={deleteProduct}
              darkMode={darkMode}
              isAdmin={isAdmin}
            />

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
              <div className="text-sm text-slate-500">
                Mostrando <b>{totalItems === 0 ? 0 : startIndex + 1}</b> a{" "}
                <b>{endIndex}</b> de <b>{totalItems}</b> resultados
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className={`border rounded px-2 py-1 text-sm ${
                    darkMode
                      ? "bg-slate-800 text-white border-slate-700"
                      : "bg-white text-black border-slate-300"
                  }`}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>

                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border transition hover:bg-pink-500 hover:text-white disabled:opacity-40"
                >
                  <FiChevronLeft size={18} />
                </button>

                {getPagination().map((page, index) =>
                  page === "..." ? (
                    <span key={index} className="px-2 text-slate-400">
                      ...
                    </span>
                  ) : (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded text-sm border transition ${
                        currentPage === page
                          ? "bg-pink-500 text-white border-pink-500"
                          : "hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border transition hover:bg-pink-500 hover:text-white disabled:opacity-40"
                >
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>

            {showDeleteModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div
                  className={`w-80 p-6 rounded-xl shadow-lg transition-colors ${
                    darkMode
                      ? "bg-slate-900 text-white border border-slate-700"
                      : "bg-white text-black"
                  }`}
                >
                  <h2 className="text-lg font-bold mb-3">Confirmar exclusão</h2>

                  <p className="text-sm opacity-80 mb-6">
                    Tem certeza que deseja excluir este produto?
                  </p>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={cancelDelete}
                      className={`px-4 py-2 rounded transition ${
                        darkMode
                          ? "bg-slate-700 hover:bg-slate-600"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      Cancelar
                    </button>

                    <button
                      onClick={confirmDelete}
                      className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Footer darkMode={darkMode} />
        </div>
      </div>
    </>
  );
}

export default App;
