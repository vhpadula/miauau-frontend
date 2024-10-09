import { FC } from "react";

interface YesNoRadioButtonProps {
  label: string;
  value?: boolean;
  onChange: (value: boolean) => void;
  required: boolean
}

const YesNoRadioButton: FC<YesNoRadioButtonProps> = ({ label, value, onChange, required, ...props }) => {
  return (
    <div className="flex flex-col space-y-2">
        {label && (<label className="font-Roboto text-base text-black">
            {label}{required && (<label className="text-error"> *</label>)}
        </label>)}
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
    </div>
  );
};

export default YesNoRadioButton;
