function SelectField({ label, name, options, value, onChange }) {
    return (
        <div className="form-block">
            <label htmlFor={name}>{label}</label>
            <select 
            id={name} 
            name={name}
            value={value}
            onChange={onChange}
            >
                {options.map((opt, index) => (
                    <option key={index} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectField;