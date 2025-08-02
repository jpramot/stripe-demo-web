export default function CancelOrderPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-2xl p-8 text-center">
        <div className="text-red-500 text-5xl mb-4">✖️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Canceled</h1>
        <p className="text-gray-600 mb-6">
          You have canceled the payment process. Please try again.
        </p>
        <a
          href="/"
          className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-xl transition"
        >
          Back to Cart
        </a>
      </div>
    </div>
  );
}
