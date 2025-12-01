function RadioOption({name, label, value}) {
    const id = `${name}-${value}`
    return (
            <div className="radio-option">
                <input type="radio" name={name} value={value} id={id}></input>
                <label htmlFor={id}>{label}</label>
            </div>
    )
}

export default RadioOption;