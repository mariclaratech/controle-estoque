export const formatBRL = (value) => {
  if (!value) return "";

  const number = Number(value) / 100;

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
