import BootstrapButton from "react-bootstrap/Button";

export const Button = ({ onClick, variant, disabled, text }) => {
  return (
    <BootstrapButton
      type="button"
      onClick={onClick}
      variant={variant}
      disabled={disabled}
    >
      {text}
    </BootstrapButton>
  );
};
