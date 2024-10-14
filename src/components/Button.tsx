import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #2979ff;
  color: white;
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2962ff;
  }

  &:focus {
    outline: none;
  }

  &:active {
    background-color: #0d47a1;
  }

  &:disabled {
    background-color: #757575;
  }
`;

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, label }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {label}
    </StyledButton>
  );
};

export default Button;
