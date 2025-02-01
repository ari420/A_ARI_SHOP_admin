import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Shop from "./pages/Shop";
import AdminPanel from "./pages/AdminPanel";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout"
import NotFound from "./pages/NotFound";


// Define the Product and CartItem types
type Product = {
  id: number;
  name: string;
  imag: string;
  price: number;
};

interface CartItem extends Product {
  quantity: number;
}

const App = () => {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // Notification state (success or error)
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Function to handle adding items to the cart
  const handleAddToCart = (product: Product) => {
    try {
      setCartItems((prev) => {
        const existingItem = prev.find((item) => item.id === product.id);
        if (existingItem) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });

      // Show success notification
      setNotification({
        message: `${product.name} has been added to your cart!`,
        type: "success",
      });

      // Hide notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      // Show error notification if something goes wrong
      setNotification({
        message:
          "An error occurred while adding the product to the cart. Please try again.",
        type: "error",
      });

      // Hide notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <Router>
      <div>
        {/* Show notification if it's set */}
        {notification && (
          <div
            className={`notification fixed top-0 right-0 z-50 m-4 p-4 text-white rounded-md ${
              notification.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {notification.message}
          </div>
        )}

        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />}/>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}/>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
