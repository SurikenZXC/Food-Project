import {useState, useEffect} from "react";

function SearchTag({value, onSelect, urlName, inputClassName = "product-input", placeholder = "Введіть щось"}){
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
    if (search === "") {
        setSuggestions([]);
        return;
    }

    const timeoutId = setTimeout(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/${urlName}/search?query=${search}`)
            .then(res => res.json())
            .then(data => setSuggestions(data))
            .catch(err => console.error(err));
    }, 300); // добавляем debounce 300мс

    return () => clearTimeout(timeoutId);
}, [search]);

    const handleChange = e => {
        setIsSuggestionVisible(true)
        setSearch(e.target.value)
        onSelect?.({ id: null, currentName: e.target.value });
    }

    const[isSuggestionVisible, setIsSuggestionVisible] = useState(true)

    const handleSelect = item => {
        setSearch(item.name)
        onSelect?.({
            id:item.id,
            currentName:item.name,
            names: item.name
        });
        setSuggestions([])
        setIsSuggestionVisible(false)
    }

    return (
        <div className="search">
            <input
                type="text"
                value={value ?? search}
                onChange={handleChange}
                placeholder={placeholder}
                className={inputClassName}
            />

            <div className="suggestions">
                {suggestions.map(item => (
                    <h2 style={{display: isSuggestionVisible ? "block" : "none"}}
                    className="hint"
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    >
                        {item.name}
                    </h2>
                ))}
            </div>
        </div>
    )


}

export default SearchTag;