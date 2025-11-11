"use client";
import { useEffect, useState } from "react";
import ItemCard from "../ItemCard/ItemCard";
import { IProduct } from "@interface/product";
import { getAllProductsHandler } from "../../service/product";

function Item() {
  const [items, setItems] = useState<IProduct[] | []>([]);

  const fetchAllItem = async () => {
    const dbItems = await getAllProductsHandler();

    if (Array.isArray(dbItems)) {
      setItems(dbItems as IProduct[]);
      console.log(" product fetched:", dbItems);
    } else {
      console.error(" Error fetching variants:", dbItems);
    }
  };

  useEffect(() => {
    fetchAllItem();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items?.length > 0 &&
        items.map((item) => <ItemCard key={item.id} item={item} />)}
    </div>
  );
}

export default Item;
