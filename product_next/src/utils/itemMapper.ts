export const itemMapper = (
  item,
  selectedColor = "",
  selectedSize = "",
) => {
  const { id, prices, imageURL, name } = item;

  console.log("🚀 ~ itemMapper.ts ~ itemMapper ~ item:", item)

  return {
    id,
    name,
    imageURL,
    prices,
    selectedColor,
    selectedSize,
  };
};
