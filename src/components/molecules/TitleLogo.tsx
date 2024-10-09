import React from "react";
import Image from "next/image";
import { TitleText } from "@/components";

interface TitleLogoProps {
    size: string;
    className?: string;
    ongTextColor?: string;
}

const TitleLogo: React.FC<TitleLogoProps> = ({ size, className, ongTextColor }) => {
    return (
        <>
            {size === "xl" && (
                <div className={`flex items-center ${className}`}>
                    <div className={`relative w-24 p-12 `}>
                        <Image
                            src="/icons/earth-icon.svg"
                            alt="Earth Icon"
                            fill={true}
                        />
                    </div>
                    <TitleText textSize={`text-7xl`} ongTextColor={ongTextColor} />
                </div>
            )}

            {size === "l" && (
                <div className={`flex items-center ${className}`}>
                    <div className={`relative w-24 p-12 `}>
                        <Image
                            src="/icons/earth-icon.svg"
                            alt="Earth Icon"
                            fill={true}
                        />
                    </div>
                    <TitleText textSize={`text-3xl`} ongTextColor={ongTextColor} />
                </div>
            )}

            {size === "sm" && (
                <div className={`flex items-center ${className}`}>
                    <div className={`relative w-8 p-6`}>
                        <Image
                            src="/icons/earth-icon.svg"
                            alt="Earth Icon"
                            fill={true}
                        />
                    </div>
                    <TitleText textSize={`text-xl`} ongTextColor={ongTextColor} />
                </div>
            )}
        </>
    );
};

export default TitleLogo;
