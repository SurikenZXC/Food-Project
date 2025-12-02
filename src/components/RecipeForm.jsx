import React from "react";
import FormBlock from "./FormBlock";
import RadioOption from "./RadioOption";
import SelectField from "./SelectField";

function RecipeForm({ recipeData, handleChange }) {
  return (
    <>
      <FormBlock label="Додати рецепт або продукт">
        <RadioOption name="recipe-product" label="Продукт" value="product" />
        <RadioOption name="recipe-product" label="Рецепт" value="recipe" />
      </FormBlock>

      <FormBlock label="Назва рецепту">
        <input
          type="text"
          name="recipe_name"
          value={recipeData.recipe_name}
          onChange={handleChange}
        />
      </FormBlock>

      <div className="flex-container">
        <FormBlock label="Кількість порцій" direction="horizontal">
          <input
            type="number"
            min="1"
            name="portions"
            value={recipeData.portions}
            onChange={handleChange}
          />
        </FormBlock>

        <SelectField
          label="Категорія"
          name="category"
          value={recipeData.category}
          onChange={handleChange}
          options={[
            { value: "veg", label: "Овочі" },
            { value: "meat", label: "М'ясо" },
            { value: "dairy", label: "Молочні" }
          ]}
        />
      </div>

      <FormBlock label="Посилання на рецепт" direction="horizontal">
        <input
          type="text"
          name="recipe_link"
          value={recipeData.recipe_link}
          onChange={handleChange}
        />
      </FormBlock>

      <FormBlock label="Текст рецепту" direction="horizontal">
        <input
          type="text"
          name="recipe_desc"
          value={recipeData.recipe_desc}
          onChange={handleChange}
        />
      </FormBlock>
    </>
  );
}

export default RecipeForm;
