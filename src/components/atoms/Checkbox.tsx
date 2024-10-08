import { FC, InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isChecked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string; 
}

const Checkbox: FC<CheckboxProps> = ({ label, isChecked, onChange, id, ...props }) => {
    return (
        <div 
            className={`mt-2 py-2 px-3 border rounded-md outline-none transition focus:ring-2 focus:ring-blue-400 focus:border-transparent ${isChecked ? "bg-accent" : ""}`}
            onClick={() => {
                onChange({
                  target: {
                    type: "checkbox",
                    name: id,
                    checked: !isChecked,
                  },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
        >
            <input
                id={id}
                type="checkbox"
                checked={isChecked}
                onChange={onChange}
                className="p-10"
                {...props}
            />
            <label className="text-black pl-2.5">
                {label}
            </label>
        </div>
  );
};

export default Checkbox;
