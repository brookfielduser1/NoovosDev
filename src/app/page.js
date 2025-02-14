export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to Noovos!</h1>
      <p className="text-lg text-gray-600 mt-2">Your go-to booking platform.</p>

      <div className="mt-6">
        <a
          href="/auth"
          className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </a>
      </div>
    </div>
  );
}
