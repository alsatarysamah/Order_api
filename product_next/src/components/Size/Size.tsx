import { CartItem } from "@interface/cartItem";
import { useCartStore } from "@store/cart";

interface SizeProps {
  size: string;
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
  newItemCart: CartItem;
}

function Size({ size, selectedSize, setSelectedSize, newItemCart }: SizeProps) {
  const updateSelectedSize = useCartStore((state) => state.updateSelectedSize);

  const sizeHandler = () => {
    updateSelectedSize(newItemCart, size);
    setSelectedSize(size);
  };

  return (
    <div
      className={`inline-block rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-1 cursor-pointer ${
        selectedSize === size ? "bg-purple-400 text-white" : "bg-gray-200"
      }`}
      onClick={sizeHandler}
    >
      {size}
    </div>
  );
}

export default Size;
