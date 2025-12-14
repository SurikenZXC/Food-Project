import FormBlock from "./FormBlock";

import SelectField from "./SelectField";

function RecipeForm({ recipeData, handleChange }) {
  return (
    <>
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
            name="servings"
            value={recipeData.servings}
            onChange={handleChange}
          />
        </FormBlock>

        <SelectField
          label="Категорія"
          name="recipe_category"
          value={recipeData.recipe_category}
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
          name="instruction_url"
          value={recipeData.instruction_url}
          onChange={handleChange}
        />
      </FormBlock>

      <FormBlock label="Текст рецепту" direction="horizontal">
        <input
          type="text"
          name="instruction"
          value={recipeData.instruction}
          onChange={handleChange}
        />
      </FormBlock>
    </>
  );
}

export default RecipeForm;
