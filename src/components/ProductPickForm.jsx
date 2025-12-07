// ProductPickForm.jsx
import React, { useState } from "react";
import Search from "./Search";
import FormBlock from "./FormBlock";

function ProductPickForm({ products, setProducts }) {
  const [product, setProduct] = useState({ name: "", quantity: 0 });
  let unit = "kg";

  const handleQuantity = e => {
    setProduct(prev => ({ ...prev, quantity: e.target.value }));
  };

  const handleSelect = value => {
    setProduct(prev => ({ ...prev, name: value }));
  };

  const addProduct = () => {
    if (product.name && product.quantity > 0) {
      setProducts(prev => [...prev, product]);
      setProduct({ name: "", quantity: 0 }); // очищаем поля после добавления
    }
  };

  return (
    <div>
      <Search onSelect={handleSelect} />
      <FormBlock label="Кількість продукту" direction="horizontal">
        <input
          type="number"
          min="0"
          step="0.1"
          value={product.quantity}
          onChange={handleQuantity}
        />
        <label>{unit}</label>
        <button type="button" onClick={addProduct}>
          Додати продукт
        </button>
      </FormBlock>

      {/* можно вывести текущий список выбранных продуктов */}
      <ul>
        {products.map((p, index) => (
          <li key={index}>
            {p.name} — {p.quantity} {unit}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductPickForm;
