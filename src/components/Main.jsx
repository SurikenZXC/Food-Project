import { useEffect } from "react";
import FormBlock from "./FormBlock";
import RadioOption from "./RadioOption";
import SelectField from "./SelectField";
import Search from "./Search";
import React, {useState} from "react";

function Main() {
    const [recipeData, setRecipeData] = useState({
        recipe_name: "",
        portions: "1",
        category: "",
        recipe_link: "",
        recipe_desc: ""
    })

    const [step, setStep] = useState(0)

    function nextHandle(){
        setStep(prev => prev + 1)
        console.log(step);
    }

    function prevHandle(){
        setStep(prev => prev - 1)
        console.log(step);
    }

    const [products, setProducts] = useState([])

    useEffect(()=>{
        fetch("http://localhost:3001/products")
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error(err))
    }, [])

    const handleChange = e => {
        const {name, value} = e.target;
        setRecipeData(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = async e => {
        e.preventDefault(); // предотвращаем перезагрузку страницы

        try {
            const response = await fetch("http://localhost:3001/recipes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(recipeData)
            });

            if (!response.ok) throw new Error("Ошибка при отправке данных");

            const result = await response.json();
            console.log("Ответ сервера:", result);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                {step === 0 ? (
                    <>
                    
                    <FormBlock label="Додати рецепт або продукт"> 
        
                <RadioOption name="recipe-product" label="Продукт" value="product"/>
                <RadioOption name="recipe-product" label="Рецепт" value="recipe"/>
            </FormBlock>
            <FormBlock label="Назва рецепту" > 
                <input type="text" name="recipe_name" value={recipeData.recipe_name} onChange={handleChange}></input>
            </FormBlock>
            <div className="flex-container">
            <FormBlock label="Кількість порцій" direction="horizontal"> 
                <input type="number" min="1" name="portions" value={recipeData.portions} onChange={handleChange}></input>
            </FormBlock>
            <SelectField 
                label="Категорія"
                name="category"
                value={recipeData.category}
                onChange={handleChange}
                options={[
                    {value: "veg", label: "Овочі"},
                    {value: "meat", label: "М'ясо"},
                    {value: "dairy", label: "Молочні"}
                ]}
            />
            </div>
            <FormBlock label="Посилання на рецепт" direction="horizontal"> 
                <input type="text" name="recipe_link" value={recipeData.recipe_link} onChange={handleChange}></input>
            </FormBlock>
            <FormBlock label="Текст рецепту" direction="horizontal"> 
                <input type="text" name="recipe_desc" value={recipeData.recipe_desc} onChange={handleChange}></input>
            </FormBlock>
                        </>
            ) : null}
            {/* <Search></Search> */}

            {/* <div className="submit-container">
                <input type="submit" className="submit-button"></input>
            </div> */}
             {/* <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
                <h3>Текущее состояние формы:</h3>
                <pre>{JSON.stringify(recipeData, null, 2)}</pre>
            </div> */}

            </form>
            <div className="prev-step" onClick={prevHandle}>
                <button className="button">Назад</button>
            </div>
            
            <div className="next-step" onClick={nextHandle}>
                <button className="button">Далі</button>
            </div>
        </main>
    )
}

export default Main;