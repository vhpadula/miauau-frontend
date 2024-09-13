import React from "react";

interface OutlineBtnProps {
    width: string;
    height: string;
    className?: string;
    children: React.ReactNode;
}

const OutlineBtn: React.FC<OutlineBtnProps> = ({
    width,
    height,
    children,
    className,
}) => {
    const widthClass = `w-${width}`;
    const heightClass = `h-${height}`;
    const baseClasses =
        "rounded-[5px] border-2 border-slate-50 font-roboto text-m p-2";

    return (
        <button
            className={`${widthClass} ${heightClass} ${baseClasses} ${className}`}
        >
            {children}
        </button>
    );
};

export default OutlineBtn;
