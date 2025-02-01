import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Define CartItem type
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imag: string;
}

interface CartProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Cart: React.FC<CartProps> = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <div className="w-full min-h-[100vh] bg-gray-100 flex justify-center items-center p-4 sm:p-6">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-4xl">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800 mb-6">
          Your Cart
        </h2>

        {/* Cart Items */}
        <div className="space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-lg sm:text-xl text-gray-500">
              Your cart is empty.{" "}
              <Link to="/shop" className="text-blue-600 hover:underline">
                Start shopping
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md"
              >
                <img
                  src={item.imag}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md"
                />
                <div className="flex-grow sm:ml-6 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
                    {item.name}
                  </h3>
                  <p className="text-gray-500">
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2">
                    <button
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      className="w-12 text-center border border-gray-300 rounded-md"
                    />
                    <button
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-lg sm:text-xl font-semibold text-gray-800 mt-4 sm:mt-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="mt-4 sm:mt-0 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Total Price and Checkout */}
        <div className="mt-6 border-t pt-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <div className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
            Total: ${totalPrice.toFixed(2)}
          </div>
          <div className="space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate("/shop")}
              className="w-full sm:w-auto px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition duration-300"
            >
              Back to Shop
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
