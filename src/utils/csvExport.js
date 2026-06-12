import { getStatus } from "./productStatus";

export const exportCSV = (products) => {
  const headers =
    "Codigo,Nome,Descricao,Categoria,Preco,Quantidade,Status,DataCadastro,Imagem\n";

  const rows = products
    .map(
      (p) =>
        `"${p.code}","${p.name}","${p.description}","${p.category}","${p.price}","${p.quantity}","${getStatus(p.quantity)}","${p.createdAt}","${p.image}"`,
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
