interface ColorProps {
  color: string;
  selectedColor: string;
  setSelectedColor:React.Dispatch<React.SetStateAction<string>>;
}

function Color({ color, selectedColor, setSelectedColor }: ColorProps) {
  const colorHandler = () => {
    setSelectedColor(color);
  };

  return (
    <div
      className={`inline-block rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-1 cursor-pointer ${
        selectedColor === color ? "bg-purple-400 text-white" : "bg-gray-200"
      }`}
      onClick={colorHandler}
    >
      {color}
    </div>
  );
}

export default Color;
