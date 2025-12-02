import React, { useState } from "react";
import RecipeForm from "./RecipeForm";
import ProductPickForm from "./ProductPickForm"

function Main() {
  const [step, setStep] = useState(0);

  const [recipeData, setRecipeData] = useState({
    recipe_name: "",
    portions: "1",
    category: "",
    recipe_link: "",
    recipe_desc: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setRecipeData(prev => ({ ...prev, [name]: value }));
  };

  const nextHandle = () => setStep(prev => prev + 1);
  const prevHandle = () => setStep(prev => prev - 1);

  return (
    <main>
      <form>
        {step === 0 && <RecipeForm recipeData={recipeData} handleChange={handleChange} />}

        {/* Можно добавить второй шаг для продуктов */}
        {step === 1 && <ProductPickForm/>}

        <div className="buttons">
        {step > 0 && <button type="button" className="button" onClick={prevHandle}>Назад</button>}
        <button type="button" className="button" onClick={nextHandle}>Далі</button>
        </div>
      </form>
    </main>
  );
}

export default Main;
