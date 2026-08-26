// Components/NotFoundPage.jsx
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const nav = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
      <h1 className="text-8xl font-black text-gray-800">404</h1>
      <p className="text-3xl font-bold text-gray-700">Oops! Page Not Found</p>
      <button
        onClick={() => nav("/")}
        className="border-4 border-black bg-gray-400 rounded-xl py-3 px-8 font-extrabold text-xl hover:bg-gray-300 transition cursor-pointer"
      >
        Go Back Home
      </button>
    </div>
  );
}

export default NotFoundPage;