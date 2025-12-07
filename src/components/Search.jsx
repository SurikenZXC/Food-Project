import React, {useState, useEffect} from "react";

function Search({onSelect}){
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
    if (search === "") {
        setSuggestions([]);
        return;
    }

    const timeoutId = setTimeout(() => {
        fetch(`http://localhost:3001/products/search?query=${search}`)
            .then(res => res.json())
            .then(data => setSuggestions(data))
            .catch(err => console.error(err));
    }, 300); // добавляем debounce 300мс

    return () => clearTimeout(timeoutId);
}, [search]);

    const handleChange = e => {
        setIsSuggestionVisible(true)
        setSearch(e.target.value)
        onSelect?.(e.target.value);
    }

    const[isSuggestionVisible, setIsSuggestionVisible] = useState(true)

    const handleSelect = item => {
        setSearch(item.product_name)
        onSelect?.(item.product_name);
        setSuggestions([])
        setIsSuggestionVisible(false)
    }

    return (
        <>
            <input
                type="text"
                value={search}
                onChange={handleChange}
                placeholder="Введіть продукт"
                className="product-input"
            />

            <div className="suggestions">
                {suggestions.map(item => (
                    <h2 style={{display: isSuggestionVisible ? "block" : "none"}}
                    className="hint" 
                    key={item.id} 
                    onClick={() => handleSelect(item)}
                    >
                        {item.product_name}
                    </h2>
                ))}
            </div>
        </>
    )


}

export default Search;