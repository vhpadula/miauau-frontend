import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  	label: string;
	variant?: "primary" | "secondary" | "outline" | "link"; 
	isLoading?: boolean; 
	loadingText?: string;
	className?: string;
	disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
	label,
	variant = "primary",
	isLoading = false,
	loadingText = "Carregando...",
	className = "",
	disabled = false,
	...props
}) => {

	const baseStyles = "px-4 py-2 rounded-md text-center font-medium transition";
	const variantStyles = {
		primary: "bg-primary text-white hover:bg-blue-700 focus:ring-blue-400",
		secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-400",
		outline: "bg-white border border-primary text-primary hover:bg-accent",
		link: "bg-transparent text-secondary hover:underline focus:ring-blue-400",
	};

	return (
		<button
			className={`${baseStyles} ${variantStyles[variant]} ${className} ${
				disabled ? "opacity-50 cursor-not-allowed" : ""
			}`}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? loadingText : label}
		</button>
	);
};

export default Button;
