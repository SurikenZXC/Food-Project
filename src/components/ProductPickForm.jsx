import React from "react";
import Search from "./Search"
import FormBlock from "./FormBlock";
import { useState } from "react";

function ProductPickForm() {
  const [product, setProduct] = useState({
    name: "",
    quantity: 0
  });

  const handleQuantity = (e)=>{
    setProduct(prev => ({...prev, quantity: e.target.value}))
    console.log(product)
  }
  let unit

  return (
    <div>
      <Search
        onSelect={
          value => setProduct(prev => ({...prev, name:value })  )
        }
          ></Search>
        <FormBlock label="Кількість продукту" direction="horizontal">
          <input
            type="number"
            min="0"
            step="0.1"
            name="portions"
            value={product.quantity}
            onChange={handleQuantity}
          />
          <label>{unit ?? "kg"}</label>
        </FormBlock>
    </div>
  );
}

export default ProductPickForm;