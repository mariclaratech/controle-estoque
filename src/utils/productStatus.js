export const getStatus = (quantity) => {
  if (Number(quantity) === 0) return "Sem estoque";
  if (Number(quantity) <= 5) return "Estoque baixo";
  return "Em estoque";
};
