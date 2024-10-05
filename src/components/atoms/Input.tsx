import { FC, InputHTMLAttributes } from "react";
import Image from "next/image";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;          // Texto do label associado ao input
    labelIconSrc?: string;
    error?: string;          // Mensagem de erro para o input
    className?: string;      // Classe adicional para estilização do input
    containerClass?: string; // Classe adicional para o container
}

const Input: FC<InputProps> = ({
    labelIconSrc,
    label,
    error,
    className = "",
    containerClass = "",
    ...props
}) => {
    return (
        <div className={`flex flex-col ${containerClass}`}>
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
                    <label htmlFor={props.id} className="font-Roboto text-xl text-primary">
                        {label}
                    </label>
                )}
            </div>
            <input
                className={`p-2 border rounded-md outline-none transition focus:ring-2 focus:ring-blue-400 focus:border-transparent ${className} ${
                error ? "border-red-500" : "border-gray-300"
                }`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default Input;
