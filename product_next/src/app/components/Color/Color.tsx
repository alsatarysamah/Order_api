import { useState } from "react";

interface ColorProps {
  color: string;
}

function Color({ color }: ColorProps) {
  const [isSelected, setIsSelected] = useState(false);

  const colorHandler = () => {
    setIsSelected(!isSelected);
    console.log("Selected color:", color);
  };

  return (
    <div
      className={`inline-block rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-1 cursor-pointer ${
        isSelected ? "bg-purple-400 text-white" : "bg-gray-200"
      }`}
      onClick={colorHandler}
    >
      {color}
    </div>
  );
}

export default Color;
