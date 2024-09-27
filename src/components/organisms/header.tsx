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
        <>
            <NavBar
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
            />
            <HeaderGroup
                className={className}
                username={username}
                imageSrc={imageSrc}
            />
        </>
    );
};

export default Header;
