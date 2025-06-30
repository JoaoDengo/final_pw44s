import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#111827] px-4">
      <div className="text-center bg-[#1E2939] p-10 rounded-2xl shadow-xl max-w-md">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-2">
          Oops! Página não encontrada.
        </h2>
        <p className="text-white mb-6">
          A página que você está procurando pode ter sido removida ou não
          existe.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Voltar para a Home
        </Link>
      </div>
    </div>
  );
}
