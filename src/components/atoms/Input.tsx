import { FC, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import Image from "next/image";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    variant?: "form" | "login"; 
    labelIconSrc?: string;
    error?: string;
    className?: string;
    containerClass?: string;
    helperText?: string;
}

const Input: FC<InputProps & TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
    labelIconSrc,
    label,
    variant = "form",
    error,
    className = "",
    containerClass = "",
    helperText,
    ...props
}) => {
    
	const variantStyles = {
		form: "font-Roboto text-base text-black",
		login: "font-Roboto text-xl text-primary",
	};
    return (
        <div className={`flex flex-col ${containerClass}`}>
            {(label || labelIconSrc) && (
                <div className="flex mb-2 ">
                    {labelIconSrc && (
                        <Image
                            src={labelIconSrc}
                            alt="icon"
                            width={24}
                            height={24}
                            className="mr-2.5"
                        />
                    )}
                    {label && (
                        <label htmlFor={props.id} className={`${variantStyles[variant]}`}>
                            {label}{props.required && <label className="text-error"> *</label>}
                        </label>
                    )}
                </div>
            )}
            {props.type === "textarea" ?
            (
                <textarea
                    className={`p-2 border rounded-md outline-none transition focus:ring-2 focus:ring-blue-400 focus:border-transparent ${className} ${
                    error ? "border-error" : "border-gray-300"
                    }`}
                    {...props}
                />
            ) : (
                <input
                    className={`p-2 border rounded-md outline-none transition focus:ring-2 focus:ring-blue-400 focus:border-transparent ${className} ${
                    error ? "border-error" : "border-gray-300"
                    }`}
                    {...props}
                />
            )
            }
            
            {helperText && <p className="text-sm text-gray-700">{helperText}</p>}
            {error && <p className="mt-1 text-sm text-error">{error}</p>}
        </div>
    );
};

export default Input;
