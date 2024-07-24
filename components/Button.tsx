type ButtonProps = {
  label: String;
  onClick: () => void;
};

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <div
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
      }}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default Button;
