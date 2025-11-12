import { CartItem } from "@interface/cartItem";
import { useCartStore } from "@store/cart";

function Counter({
  newItemCart,
  quantity,
  setQuantity,
}: {
  newItemCart: CartItem;

  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const increment = () => {

    setQuantity((q) => q + 1);
    updateQuantity(newItemCart,quantity+1)
  };
  const decrement = () => {
    setQuantity((q) => (q > 0 ? q - 1 : 0));
    updateQuantity(newItemCart,quantity-1)

  };

  return (
    <div className="flex items-stretch justify-between border rounded">
      <button
        className="px-3 py-1 bg-gray-200 hover:bg-purple-400"
        onClick={decrement}
        disabled={quantity<=0}
      >
        -
      </button>
      <span className="px-4">{quantity}</span>
      <button
        className="px-3 py-1 bg-gray-200 hover:bg-purple-400"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
}

export default Counter;
