import { FC, InputHTMLAttributes } from "react";

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isSelected: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: FC<RadioButtonProps> = ({ label, isSelected, onChange, ...props }) => {
  const handleClick = () => {
    if (!isSelected && !props.disabled) {
      onChange({
        target: {
            checked: true,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div
      className={`cursor-pointer mt-2 py-2 px-3 border rounded-md outline-none transition focus:ring-2 focus:ring-blue-400 focus:border-transparent ${
        isSelected ? "bg-accent" : ""
      }`}
      onClick={handleClick}
    >
      <input
        type="radio"
        checked={isSelected}
        onChange={onChange}
        {...props}
      />
      <label className="text-black cursor-pointer pl-2.5"
      onClick={handleClick}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
