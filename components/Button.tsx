type ButtonProps = {
  label: String;
  onClick: () => void;
  disabled?: boolean;
};

const Button = ({ label, onClick, disabled = false }: ButtonProps) => {
  return (
    <button
      style={{
        border: "2px solid black",
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        height: 20,
        width: "100",
        cursor: "pointer",
        marginRight: 10,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
