export default function ProductFilters({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  products,
  filteredProducts,
  darkMode,
  formatBRL,
  exportCSV,
}) {
  const formatCurrencyInput = (value) => {
    if (!value) return "";

    const number = Number(value.replace(/\D/g, "")) / 100;

    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  return (
    <div>
      <div className="mb-4">
        <input
          placeholder="Pesquisar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full border p-3 rounded ${
            darkMode
              ? "bg-slate-700 text-white placeholder-gray-400"
              : "bg-white text-black"
          }`}
        />
      </div>

      <div className="flex flex-wrap gap-3 items-center mb-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={`border p-3 rounded w-44 ${
            darkMode ? "bg-slate-700 text-white" : "bg-white text-black"
          }`}
        >
          {[
            "Todos",
            "Informática",
            "Eletrônicos",
            "Escritório",
            "Móveis",
            ...products
              .map((p) => p.category)
              .filter(
                (category) =>
                  ![
                    "Informática",
                    "Eletrônicos",
                    "Escritório",
                    "Móveis",
                  ].includes(category),
              ),
          ]
            .filter(
              (category, index, array) => array.indexOf(category) === index,
            )
            .map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`border p-3 rounded w-44 ${
            darkMode ? "bg-slate-700 text-white" : "bg-white text-black"
          }`}
        >
          <option>Todos</option>
          <option>Em estoque</option>
          <option>Estoque baixo</option>
          <option>Sem estoque</option>
        </select>

        <input
          type="text"
          inputMode="numeric"
          placeholder="Preço mínimo"
          value={formatCurrencyInput(minPrice)}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, "");

            setMinPrice(onlyNumbers);
          }}
          className={`border p-3 rounded w-40 ${
            darkMode
              ? "bg-slate-700 text-white placeholder-gray-400"
              : "bg-white text-black"
          }`}
        />

        <input
          type="text"
          inputMode="numeric"
          placeholder="Preço máximo"
          value={formatCurrencyInput(maxPrice)}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, "");

            setMaxPrice(onlyNumbers);
          }}
          className={`border p-3 rounded w-40 ${
            darkMode
              ? "bg-slate-700 text-white placeholder-gray-400"
              : "bg-white text-black"
          }`}
        />

        <button
          onClick={() => {
            setSearch("");
            setCategoryFilter("Todos");
            setStatusFilter("Todos");
            setMinPrice("");
            setMaxPrice("");
          }}
          className="px-6 py-3 rounded-lg border border-pink-500/40 text-pink-500 hover:bg-pink-500/10 transition"
        >
          Limpar Filtros
        </button>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="font-semibold text-lg">
            Total encontrado: {filteredProducts.length}
          </span>

          <button
            onClick={exportCSV}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Exportar CSV
          </button>
        </div>
      </div>
    </div>
  );
}