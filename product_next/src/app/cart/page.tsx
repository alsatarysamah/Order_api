"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import { useCartStore } from "@store/cart";
import { createOrderHandler } from "../../service/order";
import { IOrderItem } from "@interface/order";

export default function CartPage() {
  const { cart, updateQuantity, removeItem } = useCartStore();

  const totalPrice = cart.reduce(
    (sum, item) => sum + parseFloat(item.prices) * (item.quantity || 0),
    0
  );

  const checkoutHandle = async () => {
    const cart = useCartStore.getState().cart;
    const clearCart = useCartStore.getState().clearCart;

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderItems: IOrderItem[] = cart.map((item) => ({
      item_id: item.id,
      quantity: item.quantity,
      price: parseFloat(item.prices),
    }));

    try {
      const response = await createOrderHandler(orderItems);

      if (response) {
        alert(`✅ Order placed successfully! Order ID: ${response.id}`);
        clearCart();
      } else {
        alert("Failed to create order. Please try again.");
        console.error("Order error:", response);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };
  return (
    <div className="flex flex-col min-h-screen overflow-auto scroll-smooth bg-gray-50">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto p-4 w-full">
        <h1 className="text-2xl font-bold mb-6 text-blue-600 text-center">
          🛒 Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600 mt-10">
            Your cart is empty 😔
          </p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white shadow-sm p-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.imageURL}
                    alt={item.name}
                    width={70}
                    height={70}
                    className="rounded-md object-cover"
                  />
                  <div className="text-left">
                    <h2 className="font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-gray-500 text-sm">
                      Color: {item.selectedColor || "—"} | Size:{" "}
                      {item.selectedSize || "—"}
                    </p>
                    <p className="font-medium text-blue-600">
                      ${parseFloat(item.prices).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      updateQuantity(item, Math.max(0, item.quantity - 1))
                    }
                    className="px-2 py-1 border rounded hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item, item.quantity + 1)}
                    className="px-2 py-1 border rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {cart.length > 0 && (
        <div className="bg-white border-t shadow-sm p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-800">
              Total: ${totalPrice.toFixed(2)}
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              onClick={checkoutHandle}
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
