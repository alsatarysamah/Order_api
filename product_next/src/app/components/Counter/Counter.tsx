import { useState } from "react";

function Counter() {
     const [quantity, setQuantity] = useState(0);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 0 ? q - 1 : 0));
    return (   <div className="flex items-stretch justify-between border rounded ">
          <button
            className="px-3 py-1 bg-gray-200  hover:bg-purple-400"
            onClick={decrement}
          >
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            className="px-3 py-1 bg-gray-200  hover:bg-purple-400"
            onClick={increment}
          >
            +
          </button>
        </div>);
}

export default Counter;