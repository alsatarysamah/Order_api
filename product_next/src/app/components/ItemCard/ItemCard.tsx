import { IProduct } from "@interface/product";
import Image from "next/image";
import Size from "../Size/Size";
import Color from "../Color/Color";
import Counter from "../Counter/Counter";

function ItemCard({ item }: { item: IProduct }) {
  const { imageURL, prices, colors, sizes } = item;

  return (
<div className="w-full h-full rounded overflow-hidden shadow-lg p-3 flex flex-col">
  <div className="relative w-full h-48">
    <Image
      src={item.imageURL || "/placeholder.png"}
      alt={item.name}
      layout="fill"
      objectFit="cover"
      className="rounded-t"
    />
  </div>

  <div className="px-6 py-4 flex-1 flex flex-col justify-between">
    <div>
      <div className="font-bold text-xl mb-2">{item.name}</div>

      <div className="mb-2">
        <span className="font-semibold mr-2">Colors:</span>
        {item.colors.length > 0
          ? item.colors.map((color) => <Color key={color} color={color} />)
          : "N/A"}
      </div>

      <div className="mb-2">
        <span className="font-semibold mr-2">Sizes:</span>
        {item.sizes.length > 0
          ? item.sizes.map((size) => <Size key={size} size={size} />)
          : "N/A"}
      </div>
    </div>

    <div className="mt-4">
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        ${item.prices}
      </span>
      <Counter />
    </div>
  </div>
</div>

  );
}

export default ItemCard;
