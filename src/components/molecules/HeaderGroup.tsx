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
                <p className="text-white font-medium  text-2xl md:text-3xl justify-center md:fixed ml-auto mr-auto">
                    {username}
                </p>
                {imageSrc && (
                    <Image
                        src={imageSrc}
                        alt="user"
                        className="rounded-full ml-auto mx-2"
                        width={64}
                        height={64}
                    />
                )}
                {!imageSrc && (
                    <Image
                        src={"/images/user_placeholder.png"}
                        alt="user"
                        className="rounded-full ml-auto mx-2"
                        width={64}
                        height={64}
                    />
                )}
            </div>
        </>
    );
};

export default HeaderGroup;
