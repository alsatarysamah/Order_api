"use client";


export default function Header() {
  // const fetchallvar = async () => {
  //   const x = await getAllVariantsHandler();

  //   console.log("🚀 ~ Header.tsx ~ fetchallvar ~ x:", x);

  //   const y = await createOrderHandler([
  //     { item_id: 1, quantity: 2, price: 9.99 },
  //     { item_id: 3, quantity: 1, price: 19.99 },
  //   ]);

  //   console.log("🚀 ~ Header.tsx ~ fetchallvar ~ y:", y);
  // };
  // useEffect(() => {
  //   fetchallvar();
  // }, []);
  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
          💄 Cozmatee
        </h1>

        <div className="flex space-x-4"></div>
      </div>
    </header>
  );
}
