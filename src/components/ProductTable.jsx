import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";

export default function ProductTable({
  filteredProducts,
  darkMode,
  editProduct,
  deleteProduct,
  isAdmin,
}) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full ${darkMode ? "text-white" : "text-black"}`}>
        <thead>
          <tr className={darkMode ? "bg-slate-700" : "bg-slate-200"}>
            <th className="p-3">Imagem</th>
            <th className="p-3">Código</th>
            <th className="p-3">Produto</th>
            <th className="p-3">Descrição</th>
            <th className="p-3">Categoria</th>
            <th className="p-3">Preço</th>
            <th className="p-3">Qtd.</th>
            <th className="p-3">Status</th>
            <th className="p-3">Cadastro</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>

        <tbody
          className={
            darkMode ? "bg-slate-800 text-white" : "bg-white text-black"
          }
        >
          {filteredProducts.map((product) => (
            <tr
              key={product.firestoreId || product.code}
              className="border-b text-center"
            >
              <td className="p-3">
                <img
                  src={product.image || "https://placehold.co/80x80"}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded mx-auto"
                />
              </td>
              <td className="p-3">{product.code}</td>
              <td className="p-3">{product.name}</td>
              <td className="p-3 max-w-xs truncate"> {product.description}</td>
              <td className="p-3">{product.category}</td>
              <td className="p-3">
                R${" "}
                {Number(product.price).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="p-3">{product.quantity}</td>

              <td className="p-3">
                {Number(product.quantity) === 0 ? (
                  <span className="text-red-600 font-bold">Sem estoque</span>
                ) : Number(product.quantity) <= 5 ? (
                  <span className="text-yellow-600 font-bold">
                    Estoque baixo
                  </span>
                ) : (
                  <span className="text-green-600 font-bold">Em estoque</span>
                )}
              </td>

              <td className="p-3">{product.createdAt}</td>

              <td className="p-3">
                <div className="flex justify-center gap-2">
                  {isAdmin ? (
                    <>
                      <button
                        onClick={() => editProduct(product)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-pink-500 hover:bg-pink-600 text-white transition"
                        title="Editar"
                      >
                        <FaPencilAlt size={14} />
                      </button>

                      <button
                        onClick={() =>
                          product.firestoreId &&
                          deleteProduct(product.firestoreId)
                        }
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 text-pink-400 transition"
                        title="Excluir"
                      >
                        <FaTrashAlt size={14} />
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-slate-400">
                      Somente leitura
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
