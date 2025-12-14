function RadioOption({name, label, value, checked, onChange}) {
    const id = `${name}-${value}`
    return (
            <div className="radio-option">
                <input type="radio" name={name} value={value} id={id} checked={checked} onChange={onChange}></input>
                <label htmlFor={id}>{label}</label>
            </div>
    )
}

export default RadioOption;