// ProductPickForm.jsx
import { useState } from "react";
import Search from "./Search";
import FormBlock from "./FormBlock";

function ProductPickForm({ products, setProducts }) {
  // текущее редактируемое поле — называем нормально
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    quantity: 0,
    unit: "kg"
  });

  const getStep = (unit) =>{
    switch (unit) {
      case "kg":
      case "l":
        return "0.1"
      case "g":
      case "pcs":
        return  "1"
    }
  }

  const getUnitName = (unit) =>{
      switch (unit) {
        case "kg":
          return "Кг"
        case "l":
          return "Л"
        case "g":
          return "Г"
        case "pcs":
          return  "Шт"
      }
  }

  const handleQuantityChange = e => {
    setCurrentProduct(prev => ({
      ...prev,
      quantity: e.target.value
    }));
  };

  const handleNameSelect = product => {
    setCurrentProduct(prev => ({
      ...prev,
      name: product.name,
      unit: product.unit,
      id: product.id,
    }));
  };

  const addProduct = () => {
    if (currentProduct.name && currentProduct.quantity > 0) {
      setProducts(prev => [...prev, currentProduct]);

      // очищаем форму
      setCurrentProduct({
        name: "",
        quantity: 0,
        unit: "kg"
      });
    }
  };

  return (
    <div>
      <Search
        value={currentProduct.name}
        onSelect={handleNameSelect}
      />

      <FormBlock label="Кількість продукту" direction="horizontal">
        <input
          type="number"
          min="0"
          step={getStep(currentProduct.unit)}
          value={currentProduct.quantity}
          onChange={handleQuantityChange}
        />
        <label>{getUnitName(currentProduct.unit)}</label>

        <button type="button" className="button" onClick={addProduct}>
          Додати продукт
        </button>
      </FormBlock>

      <ol className="product-list">
  {products.map((product, index) => (
          <li key={index}>
            {product.name}  {product.quantity} {getUnitName(product.unit) }
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ProductPickForm;
