import useCartStore from "../../../store/cartStore";

export default function CartItem({ item }) {
  const changeQty = useCartStore((state) => state.changeQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  return (
    <div className="flex items-center justify-between border rounded-lg p-4 shadow">
      <div className="flex items-center gap-4">
        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>

          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-gray-600">
              {item.price.toLocaleString("th-TH", {
                style: "currency",
                currency: "THB",
              })}
            </p>

            <div className="flex items-center border rounded overflow-hidden">
              <button
                onClick={() => changeQty(item.name, -1)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                −
              </button>
              <span className="px-3 text-sm">{item.quantity}</span>
              <button
                onClick={() => changeQty(item.name, 1)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                +
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-800 font-medium mt-1">
            รวม:{" "}
            {(item.price * item.quantity).toLocaleString("th-TH", {
              style: "currency",
              currency: "THB",
            })}
          </p>
        </div>
      </div>

      <button
        onClick={() => removeFromCart(item.name)}
        className="text-red-600 hover:text-red-800 text-sm font-medium"
      >
        ลบ
      </button>
    </div>
  );
}
