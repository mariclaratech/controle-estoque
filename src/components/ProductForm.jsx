export default function ProductForm({
  form,
  setForm,
  darkMode,
  saveProduct,
  clearForm,
}) {
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const formatBRL = (value) => {
    if (!value) return "";

    const number = Number(value) / 100;

    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div
      className={`p-6 rounded-xl shadow-md mb-8 ${
        darkMode
          ? "bg-slate-900/70 backdrop-blur-md border border-cyan-400/10"
          : "bg-white"
      }`}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            Nome do Produto
            <span className="text-red-500 ml-1">*</span>
          </label>

          <input
            name="name"
            placeholder="Ex: Notebook Dell Inspiron"
            value={form.name}
            onChange={handleChange}
            className={`border p-3 rounded ${
              darkMode
                ? "bg-slate-800 text-white placeholder-gray-400"
                : "bg-white text-black"
            }`}
          />
        </div>

        <div className="flex gap-3 items-end">
          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium mb-1">
              Categoria
              <span className="text-red-500 ml-1">*</span>
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`border p-3 rounded ${
                darkMode ? "bg-slate-800 text-white" : "bg-white text-black"
              }`}
            >
              <option>Informática</option>
              <option>Eletrônicos</option>
              <option>Escritório</option>
              <option>Móveis</option>
              <option>Outro</option>
            </select>
          </div>

          {form.category === "Outro" && (
            <div className="flex flex-col flex-1">
              <label className="text-sm font-medium mb-1">Nova Categoria</label>

              <input
                type="text"
                name="customCategory"
                placeholder="Ex: Acessórios"
                value={form.customCategory}
                onChange={(e) =>
                  setForm({
                    ...form,
                    customCategory:
                      e.target.value.length > 0
                        ? e.target.value.charAt(0).toUpperCase() +
                          e.target.value.slice(1)
                        : "",
                  })
                }
                className={`border p-3 rounded ${
                  darkMode ? "bg-slate-800 text-white" : "bg-white text-black"
                } ${
                  form.category === "Outro" && !form.customCategory
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            Preço
            <span className="text-red-500 ml-1">*</span>
          </label>

          <input
            type="text"
            inputMode="numeric"
            placeholder="R$ 0,00"
            value={formatBRL(form.price)}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, "");

              setForm({
                ...form,
                price: onlyNumbers,
              });
            }}
            className={`border p-3 rounded ${
              darkMode
                ? "bg-slate-800 text-white placeholder-gray-400"
                : "bg-white text-black"
            }`}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            Quantidade
            <span className="text-red-500 ml-1">*</span>
          </label>

          <input
            type="number"
            name="quantity"
            min="0"
            onKeyDown={(e) => {
              if (["-", "+", "e", "E", "."].includes(e.key)) {
                e.preventDefault();
              }
            }}
            placeholder="Ex: 10"
            value={form.quantity}
            onChange={(e) => {
              const value = e.target.value;

              if (value === "" || Number(value) >= 0) {
                setForm({
                  ...form,
                  quantity: value,
                });
              }
            }}
            className={`border p-3 rounded ${
              darkMode
                ? "bg-slate-800 text-white placeholder-gray-400"
                : "bg-white text-black"
            }`}
          />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm font-medium">Descrição</label>

          <textarea
            name="description"
            placeholder="Ex: Notebook para uso corporativo com 16GB RAM"
            value={form.description}
            onChange={handleChange}
            className={`border p-3 rounded ${
              darkMode
                ? "bg-slate-800 text-white placeholder-gray-400"
                : "bg-white text-black"
            }`}
          />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm font-medium">URL da Imagem</label>

          <input
            name="image"
            placeholder="https://exemplo.com/imagem.jpg"
            value={form.image}
            onChange={handleChange}
            className={`border p-3 rounded ${
              darkMode
                ? "bg-slate-800 text-white placeholder-gray-400"
                : "bg-white text-black"
            }`}
          />
        </div>

        <p className="text-sm text-gray-500 mb-4 md:col-span-2">
          <span className="text-red-500">*</span> Campos obrigatórios
        </p>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={saveProduct}
          className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
        >
          {form.firestoreId ? "Atualizar" : "Cadastrar"}
        </button>

        <button
          onClick={clearForm}
          className="bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-600 transition"
        >
          Limpar
        </button>
      </div>
    </div>
  );
}
