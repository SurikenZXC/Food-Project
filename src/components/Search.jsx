import React, {useState, useEffect} from "react";

function Search(){
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

    return (
        <>
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Введите продукт"
            />

            <div className="suggestions">
                {suggestions.map(item => (
                    <h2 className="hint" key={item.id} onClick={() => setSearch(item.product_name)}>
                        {item.product_name}
                    </h2>
                ))}
            </div>
        </>
    )


}

export default Search;