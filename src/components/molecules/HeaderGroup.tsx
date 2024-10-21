import React from "react";
import { TitleLogo } from "@/components";
import Image from "next/image";
import Link from "next/link";
interface HeaderGroupProps {
    className?: string;
    username?: string;
    imageSrc?: string;
}
const HeaderGroup: React.FC<HeaderGroupProps> = ({
    className,
    username,
    imageSrc,
}) => {
    return (
        <>
            <div
                className={`flex w-full justify-center items-center h-20 bg-primary ${className}`}
            >
                <Link href={"/"} className="mx-2">
                    <TitleLogo size="sm" />
                </Link>
            </div>
        </>
    );
};

export default HeaderGroup;
