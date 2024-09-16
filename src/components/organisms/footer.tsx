import React from "react";
import { TitleLogo } from "@/components";
interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
    return (
        <div
            className={`flex w-full justify-end items-center h-20 bg-primary ${className}`}
        >
            <TitleLogo size="sm" className="mr-2" />
        </div>
    );
};

export default Footer;
