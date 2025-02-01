import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-red-600 to-orange-500 text-white">
      <div className="text-center px-6 md:px-12">
        <h1 className="text-6xl md:text-9xl font-bold mb-4">404</h1>
        <p className="text-2xl md:text-3xl mb-6">Oops! Page Not Found</p>
        <p className="text-lg md:text-xl mb-6">
          It seems like the page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-black text-white font-semibold text-lg md:text-xl rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Go Back To Home 
        </button>
      </div>
    </main>
  );
}
