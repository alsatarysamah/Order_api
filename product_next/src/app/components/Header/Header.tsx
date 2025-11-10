"use client";

import { useEffect } from "react";
import { getAllVariantsHandler } from "../../../service/variant";



export default function Header() {


  const fetchallvar=async()=>{

    const x = await getAllVariantsHandler()

    console.log("🚀 ~ Header.tsx ~ fetchallvar ~ x:", x)

  }
  useEffect(() => {
    fetchallvar()
  }, []);
  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
          💄 Cozmatee
        </h1>

        <div className="flex space-x-4">

        </div>
      </div>
    </header>
  );
}
