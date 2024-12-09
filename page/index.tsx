import { useState } from 'react';

export async function getStaticPaths() {
  // Fetch product IDs
  const res = await fetch('https://api.example.com/products');
  const products = await res.json();

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Fetch product data based on ID
  const res = await fetch(`https://api.example.com/products/${params.id}`);
  const product = await res.json();

  return { props: { product } };
}

export default function ProductPage({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState('Medium');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600">${product.price}</p>

      {/* Color Selector */}
      <div>
        <h3 className="mt-4 text-lg">Select Color:</h3>
        <div className="flex space-x-2">
          {product.colors.map((color) => (
            <button
              key={color}
              className={`p-2 rounded-full ${selectedColor === color ? 'ring-2 ring-black' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            ></button>
          ))}
        </div>
      </div>

      {/* Size Selector */}
      <div>
        <h3 className="mt-4 text-lg">Choose Size:</h3>
        <div className="flex space-x-2">
          {['Small', 'Medium', 'Large', 'X-Large'].map((size) => (
            <button
              key={size}
              className={`px-4 py-2 rounded ${selectedSize === size ? 'bg-black text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Cart */}
      <button className="mt-6 bg-black text-white px-6 py-2 rounded">Add to Cart</button>
    </div>
  );
}
