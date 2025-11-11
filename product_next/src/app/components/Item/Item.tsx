"use client";
import { useEffect, useState } from "react";
import { getAllVariantsHandler } from "../../../service/variant";
import { IVariant } from "@interface/variant";
import ItemCard from "../ItemCard/ItemCard";

function Item() {
  const [items, setItems] = useState<IVariant[] | []>([]);

  const fetchAllItem = async () => {
    const dbItems = await getAllVariantsHandler();

    if (Array.isArray(dbItems)) {
      setItems(dbItems as IVariant[] );
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
      {items?.length > 0 &&
        items?.map((item) => (
          <div key={item?.id}>
            <ItemCard item={item} />
          </div>
        ))}
    </div>
  );
}

export default Item;
