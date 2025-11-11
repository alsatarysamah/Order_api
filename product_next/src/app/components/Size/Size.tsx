function Size({ size }: { size: string }) {
  return (
    <span
      key={size}
      className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-1"
    >
      {size}
    </span>
  );
}

export default Size;
