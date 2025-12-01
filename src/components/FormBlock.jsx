function FormBlock({label, children, direction = "vertical"}) {
    return (
        <div className={`form-block ${direction}`}>
            <label>{label}</label>
            <div className="form-content">
                {children}
            </div>
        </div>
    )
}

export default FormBlock;