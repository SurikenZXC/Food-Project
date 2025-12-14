import { useState } from "react";
import RecipeForm from "./RecipeForm";
import ProductPickForm from "./ProductPickForm";
import FormBlock from "./FormBlock";
import RadioOption from "./RadioOption";
import ProductAddForm from "./ProductAddForm.jsx"
import Button from "./Button";

function Main() {
  const [radio, setRadio] = useState("product")
  const [step, setStep] = useState(0);

  const handleRadio = e =>{setRadio(e.target.value)}

  const [recipeData, setRecipeData] = useState({
    recipe_name: "",
    servings: "1",
    recipe_category: "",
    instruction_url: "",
    instruction: ""
  });

  const [products, setProducts] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setRecipeData(prev => ({ ...prev, [name]: value }));
  };

  const nextHandle = () => setStep(prev => prev + 1);
  const prevHandle = () => setStep(prev => prev - 1);

  const handleAdd = () => {
    console.log("Recipe:", recipeData);
    console.log("Products:", products);

    fetch(`${import.meta.env.VITE_API_BASE_URL}/recipes`, {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({products: products, recipeData: recipeData})
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
  };
  const handleClear = () => {
    setProducts([])
    setRecipeData({
      recipe_name: "",
      servings: "1",
      recipe_category: "",
      instruction_url: "",
      instruction: ""
    })
  };

  return (
    <main>
      <FormBlock label="Додати рецепт або продукт">
        <RadioOption name="recipe-product" label="Продукт" value="product" id="radio-product" onChange={handleRadio} checked={radio == "product"}/>
        <RadioOption name="recipe-product" label="Рецепт" value="recipe" id="radio-recipe" onChange={handleRadio} checked={radio == "recipe"}/>
      </FormBlock>
      { radio == "recipe" && (<>
      {step === 0 && <RecipeForm recipeData={recipeData} handleChange={handleChange} />}
        {step === 1 && (
          <ProductPickForm products={products} setProducts={setProducts} />
        )}

      <div className="buttons">
        {step > 0 && <Button onClick={prevHandle}>Назад</Button>}
        {step < 1 && <Button onClick={nextHandle}>Далі</Button>}
        {step === 1 && (
          <div>
            <Button onClick={handleAdd}>Додати рецепт</Button>
            <Button onClick={handleClear}>Скасувати усе</Button>
          </div>
        )}
      </div>
      </>
      )
      }
      {radio == "product" && <ProductAddForm></ProductAddForm>}

    </main>
  );
}

export default Main;