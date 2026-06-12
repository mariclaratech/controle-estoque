export default function ProductStats({ products, darkMode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div
        className={`p-4 rounded-xl shadow-lg shadow-cyan-500/10 ${
          darkMode ? "bg-slate-700" : "bg-white"
        }`}
      >
        <h3 className="text-gray-500">Produtos</h3>
        <p
          className={`text-3xl font-bold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {products.length}
        </p>
      </div>

      <div
        className={`p-4 rounded-xl shadow-lg shadow-cyan-500/10 ${
          darkMode ? "bg-slate-700" : "bg-white"
        }`}
      >
        <h3 className="text-gray-500">Valor Estoque</h3>
        <p
          className={`text-2xl md:text-3xl font-bold break-words ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          R$
          {products
            .reduce(
              (acc, p) =>
                acc +
                Number(String(p.price).replace(",", ".")) * Number(p.quantity),
              0,
            )
            .toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
        </p>
      </div>

      <div
        className={`p-4 rounded-xl shadow-lg shadow-cyan-500/10 ${
          darkMode ? "bg-slate-700" : "bg-white"
        }`}
      >
        <h3 className="text-gray-500">Sem Estoque</h3>
        <p
          className={`text-3xl font-bold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {products.filter((p) => Number(p.quantity) === 0).length}
        </p>
      </div>

      <div
        className={`p-4 rounded-xl shadow-lg shadow-cyan-500/10 ${
          darkMode ? "bg-slate-700" : "bg-white"
        }`}
      >
        <h3 className="text-gray-500">Categorias</h3>
        <p
          className={`text-3xl font-bold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {new Set(products.map((p) => p.category)).size}
        </p>
      </div>
    </div>
  );
}
