"use client";
import React, { useState } from "react";
import Image from "next/image";
import { TitleLogo } from "@/components";
import SideMenu from "@/components/molecules/SideMenu";
import { AnimatePresence, motion } from "framer-motion";

interface HeaderProps {
    username?: string;
    imageSrc?: string;
}

const Header: React.FC<HeaderProps> = ({ username, imageSrc }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleSideMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeSideMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <div className="header-container fixed w-screen h-20 bg-primary flex items-center justify-between z-20">
                <div className="flex items-center">
                    <Image 
                        src={"/icons/menu.svg"} 
                        alt="Menu icon"
                        width={25}
                        height={25}
                        className="ml-6 cursor-pointer"
                        onClick={toggleSideMenu}
                    />
                </div>
                <div className="flex-grow flex justify-center">
                    <TitleLogo size="sm" />
                </div>
                <div className="flex items-center">
                    <span className="mr-6">{username}</span>
                </div>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            id="overlay"
                            className="overlay fixed inset-0 bg-black bg-opacity-50 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={closeSideMenu}
                        ></motion.div>
                        <SideMenu closeSideMenu={closeSideMenu}/>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;