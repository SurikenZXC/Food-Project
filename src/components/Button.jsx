function Button({ onClick, children, className = "" }) {
  return (
    <button type="button" className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
