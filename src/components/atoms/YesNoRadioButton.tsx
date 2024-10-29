import { FC } from "react";

interface YesNoRadioButtonProps {
    label: string;
    sublabel?: string;
    value?: boolean;
    onChange: (value: boolean) => void;
    required: boolean;
    helperText?: string;
    className?: string;
}

const YesNoRadioButton: FC<YesNoRadioButtonProps> = ({ label, sublabel, value, onChange, required,helperText, className, ...props }) => {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
        {label && (<label className="font-Roboto text-base text-black">
            {label}{required && (<label className="text-error"> *</label>)}
        </label>)}
        {sublabel && <p className="text-sm text-gray-700">{sublabel}</p>}
        <div
            className={`cursor-pointer py-2 px-3 border rounded-md transition focus:ring-2 focus:ring-blue-400 focus:border-transparent ${
                value === true ? "bg-accent" : ""
            }`}
            onClick={() => onChange(true)}
        >
            <input
                type="radio"
                checked={value === true}
                onChange={() => onChange(true)}
                {...props}
            />
            <label className="pl-2.5 text-black cursor-pointer">Sim</label>
        </div>

        <div
            className={`cursor-pointer py-2 px-3 border rounded-md transition focus:ring-2 focus:ring-blue-400 focus:border-transparent ${
                value === false ? "bg-accent" : ""
            }`}
            onClick={() => onChange(false)}
        >
            <input
            type="radio"
            checked={value === false}
            onChange={() => onChange(false)}
            {...props}
            />
            <label className="pl-2.5 text-black cursor-pointer">Não</label>
        </div>
        {helperText && <p className="text-sm text-gray-700">{helperText}</p>}
    </div>
  );
};

export default YesNoRadioButton;
