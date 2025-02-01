import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  // Dummy data for the cart items and pricing
  const cartItems = [
    { id: 1, name: "Product 1", price: 30, quantity: 2 },
    { id: 2, name: "Product 2", price: 40, quantity: 1 },
    { id: 3, name: "Product 3", price: 25, quantity: 3 },
  ];

  // Calculate the total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gradient-to-r from-blue-400 via-purple-600 to-pink-600 min-h-screen flex flex-col text-white">
      {/* Header Section */}
      <header className="bg-opacity-80 bg-black text-center p-4 shadow-md">
        <h1 className="text-4xl font-semibold">Checkout</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            Order Summary
          </h2>

          {/* Cart Items List */}
          <div className="space-y-6 mb-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm transition duration-300 hover:bg-gray-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-lg font-medium text-gray-700">{item.name}</div>
                  <div className="text-sm text-gray-500">x {item.quantity}</div>
                </div>
                <div className="text-lg font-semibold text-gray-900">${item.price * item.quantity}</div>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="flex justify-between items-center text-xl font-semibold mb-8">
            <span className="text-gray-700">Total Price</span>
            <span className="text-gray-900">${totalPrice}</span>
          </div>

          {/* Payment Section */}
          <div className="space-y-6 mb-8">
            <div className="flex justify-between items-center">
              <label className="text-lg font-medium text-gray-700">Name on Card</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full p-3 border-2 text-black-0 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-lg font-medium text-gray-700">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 1234 5678"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-lg font-medium text-gray-700">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-lg font-medium text-gray-700">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => navigate("/shop")}
              className="px-6 py-3  bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
            >
              Back to Shop
            </button>
            <button
              className="px-6 py-3 ml-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-4">
        <p className="text-sm">&copy; 2025 My Awesome Store. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
