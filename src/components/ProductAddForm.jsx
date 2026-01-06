import { useState } from "react"
import FormBlock from "./FormBlock"
import SelectField from "./SelectField"
import Button from "./Button"
import SearchTag from "./SearchTag"

function ProductAddForm(){
    const [product, setProduct] = useState({
        name: "",
        unit: "kg",
        price: 0,
        desc: "",
    })

    // const deleteTag = (indexToDelete) => {
        
    //     setTag(prev => ({
    //         ...prev,
    //         names: prev.names.splice(indexToDelete, 1),
    //         id: prev.id.splice(indexToDelete, 1),
    //     }));
    //     console.log(tag)
    // }

    const [tag, setTag] = useState({
        id:[],
        names: [],
        currentName: "",
    })

    const showTags = ()=>{
        console.log(tag)
    }

    const handleNameSelect = tag => {

        setTag(prev => ({
            ...prev,
            currentName: tag.currentName ?? prev.currentName,
            names: tag.names != null ? [...prev.names, tag.names] : prev.names,
            id: tag.id != null ? [...prev.id, tag.id] : prev.id,
        }));
    };

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
            body : JSON.stringify({product, tag})
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
        
        <SearchTag
            value={tag.currentName}
            onSelect={handleNameSelect}
            urlName="product-tags"
            placeholder="Введіть теги"
        />
        <div>
                {
                    tag.names.map((item, index) => (
                    <span className="tag-element" key={tag.id[index]} >{item}</span>
            ))
}
</div>
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
          <Button onClick={showTags}>Додати</Button>
        </>
    )
}

export default ProductAddForm