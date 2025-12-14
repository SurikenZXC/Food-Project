import { useState } from "react"
import FormBlock from "./FormBlock"
import SelectField from "./SelectField"
import Button from "./Button"

function ProductAddForm(){
    const [product, setProduct] = useState({
        name: "",
        unit: "kg",
        price: 0,
        desc: ""
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const addProduct = () => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/products`, {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(product)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
    }
    

    return(
        <>
        <FormBlock label="Назва продукту">
            <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            />
        </FormBlock>
           
        <SelectField
          label="Одиниця вимірювання"
          name="unit"
          value={product.unit}
          onChange={handleChange}
          options={[
            { value: "kg", label: "Кг" },
            { value: "g", label: "г" },
            { value: "pcs", label: "Шт" },
            { value: "l", label: "Л" },
          ]}
        /> 
        <FormBlock label="Ціна" direction="horizontal">
            <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            />
            <label>Грн</label>
        </FormBlock>
        <FormBlock label="Опис продукта" direction="horizontal">
            <input
            type="text"
            name="desc"
            value={product.desc}
            onChange={handleChange}
            />
        </FormBlock>
          <Button onClick={addProduct}>Додати</Button>
        </>
    )
}

export default ProductAddForm