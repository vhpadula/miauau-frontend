import React from "react";
import { HeaderGroup, NavBar } from "@/components";

interface HeaderProps {
    username?: string;
    imageSrc?: string;
}

const Header: React.FC<HeaderProps> = ({
    username,
    imageSrc,
}) => {
    return (
        <div className="fixed w-screen h-screen">
            <HeaderGroup
                className="fixed z-10"
                username={username}
                imageSrc={imageSrc}
            />
            <NavBar/>
        </div>
    );
};

export default Header;
