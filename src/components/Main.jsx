import React, { useState } from "react";
import RecipeForm from "./RecipeForm";
import ProductPickForm from "./ProductPickForm";

function Main() {
  const [step, setStep] = useState(0);

  const [recipeData, setRecipeData] = useState({
    recipe_name: "",
    portions: "1",
    category: "",
    recipe_link: "",
    recipe_desc: ""
  });

  // теперь массив продуктов хранится в родителе
  const [products, setProducts] = useState([]); // каждый элемент { name, quantity, unit }

  const handleChange = e => {
    const { name, value } = e.target;
    setRecipeData(prev => ({ ...prev, [name]: value }));
  };

  const nextHandle = () => setStep(prev => prev + 1);
  const prevHandle = () => setStep(prev => prev - 1);

  const handleAdd = () => {
    console.log("Recipe:", recipeData);
    console.log("Products:", products);
    // здесь можно отправлять fetch/post на сервер
  };

  return (
    <main>
      <form>
        {step === 0 && <RecipeForm recipeData={recipeData} handleChange={handleChange} />}
        {step === 1 && (
          <ProductPickForm products={products} setProducts={setProducts} />
        )}

        <div className="buttons">
          {step > 0 && (
            <button type="button" className="button" onClick={prevHandle}>
              Назад
            </button>
          )}
          {step < 1 && (
            <button type="button" className="button" onClick={nextHandle}>
              Далі
            </button>
          )}
          {step === 1 && (
            <button type="button" className="button" onClick={handleAdd}>
              Додати
            </button>
          )}
        </div>
      </form>
    </main>
  );
}

export default Main;