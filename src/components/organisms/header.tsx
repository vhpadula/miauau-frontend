import React from "react";
import { HeaderGroup, NavBar } from "@/components";

interface HeaderProps {
    className?: string;
    username?: string;
    imageSrc?: string;
    currentSection: string;
    setCurrentSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({
    className,
    username,
    imageSrc,
    currentSection,
    setCurrentSection,
}) => {
    return (
        <div className="fixed w-screen h-screen">
            <HeaderGroup
                className="fixed z-10"
                username={username}
                imageSrc={imageSrc}
            />
            <NavBar
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
            />
        </div>
    );
};

export default Header;
