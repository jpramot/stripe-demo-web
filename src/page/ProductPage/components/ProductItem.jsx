import useCartStore from "../../../store/cartStore";

export default function ProductItem({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      <img src={product.img} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
        <p className="text-sm text-gray-600 flex-grow">{product.description}</p>

        <div className="mt-4">
          <span className="text-xl font-bold text-indigo-600">
            {product.price.toLocaleString("th-TH", {
              style: "currency",
              currency: "THB",
            })}
          </span>
        </div>

        <button
          onClick={() =>
            addToCart({ name: product.name, price: product.price, quantity: 1, image: product.img })
          }
          className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors hover:cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
