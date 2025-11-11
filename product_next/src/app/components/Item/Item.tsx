"use client";
import { useEffect, useState } from "react";
import { getAllVariantsHandler } from "../../../service/variant";
import { IVariantResponse } from "@interface/variant";

function Item() {
  const [items, setItems] = useState<IVariantResponse[] | []>([]);

  const fetchAllItem = async () => {
    const dbItems = await getAllVariantsHandler();

    if (Array.isArray(dbItems)) {
      setItems(dbItems as IVariantResponse[]);
      console.log(" Variants fetched:", dbItems);
    } else {
      console.error(" Error fetching variants:", dbItems);
    }
  };

  useEffect(() => {
    fetchAllItem();
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <div key={item?.id} className="p-2 border rounded">
          {item?.size}
        </div>
      ))}
    </div>
  );
}

export default Item;
