export const itemMapper = (
  item,
  selectedColor = "",
  selectedSize = "",
  quantity = 1
) => {
  const { id, prices, imageURL, name } = item;

  console.log("🚀 ~ itemMapper.ts ~ itemMapper ~ item:", item);

  return {
    id,
    name,
    imageURL,
    prices,
    selectedColor,
    selectedSize,
    quantity,
  };
};
