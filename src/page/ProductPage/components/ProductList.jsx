import data from "../../../mock/data.json";
import ProductItem from "./ProductItem";

export default function ProductList() {
  const products = data.products;
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, idx) => (
          <ProductItem product={product} key={idx} />
        ))}
      </div>
    </div>
  );
}
