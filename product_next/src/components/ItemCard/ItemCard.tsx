import { IProduct } from "@interface/product";
import Image from "next/image";
import Size from "../Size/Size";
import Color from "../Color/Color";
import Counter from "../Counter/Counter";
import { useEffect, useState } from "react";
import { itemMapper } from "@utils/itemMapper";
import { useCartStore } from "@store/cart"; // import your Zustand store

function ItemCard({ item }: { item: IProduct }) {
  const { id, imageURL, prices, colors, sizes, name } = item;
  const cart = useCartStore((state) => state.cart);

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const newItemCart = itemMapper(item, selectedColor, selectedSize,quantity);

  useEffect(() => {
    const cartItem = cart.find(
      (c) => c.id === id
    );
    if (cartItem) {
      setSelectedColor(cartItem.selectedColor || "");
      setSelectedSize(cartItem.selectedSize || "");
      setQuantity(cartItem.quantity || 1);
    }
  }, [cart, id]);

  return (
    <div className="w-full h-full rounded overflow-hidden shadow-lg p-3 flex flex-col hover:bg-slate-300">
      <div className="relative w-full h-48">
        <Image
          src={imageURL || "/placeholder.png"}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t"
        />
      </div>

      <div className="px-6 py-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="font-bold text-xl mb-2">{name}</div>

          <div className="mb-2">
            <span className="font-semibold mr-2">Colors:</span>
            {colors.length > 0
              ? colors.map((color) => (
                  <Color
                    key={color}
                    color={color}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    newItemCart={newItemCart}
                  />
                ))
              : "N/A"}
          </div>

          <div className="mb-2">
            <span className="font-semibold mr-2">Sizes:</span>
            {sizes.length > 0
              ? sizes.map((size) => (
                  <Size
                    key={size}
                    size={size}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    newItemCart={newItemCart}
                  />
                ))
              : "N/A"}
          </div>
        </div>

        <div className="mt-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            ${prices}
          </span>
          <Counter
            newItemCart={newItemCart}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
