"use client"; 
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface SideMenuProps {
    closeSideMenu: () => void;
}

const navigation = [
    { 
        name: "Animais", 
        href: "animals", 
        iconPath: "/icons/animal.svg" 
    },
    {
        name: "Voluntários",
        href: "volunteers",
        iconPath: "/icons/users.svg",
    },
    { 
        name: "Finanças", 
        href: "finance", 
        iconPath: "/icons/money.svg" 
    },
    { 
        name: "Eventos", 
        href: "events", 
        iconPath: "/icons/calendar.svg" 
    },
    {
        name: "Configurações",
        href: "config",
        iconPath: "/icons/config.svg",
    },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const SideMenu:React.FC<SideMenuProps> =  ({ closeSideMenu }) =>{
    const [currentUrl, setCurrentUrl] = useState("");

    return (
        <motion.div
            id="side-menu"
            className="side-menu fixed top-0 left-0 w-64 h-full bg-white text-white shadow-lg z-50 pt-10"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
        >
            {navigation.map((item) => (
                <div
                    key={item.name}
                    className={classNames(
                        currentUrl.includes(item.href)
                            ? "text-primary bg-accent  hover:text-secondary"
                            : "bg-gray text-primary",
                        "rounded-md px-6 py-2 text-md font-medium flex items-center"
                    )}
                    onClick={() => {
                        <Link href={item.href}/>
                        setCurrentUrl(item.href);
                        closeSideMenu();
                    }}
                >
                    <Image
                        src={item.iconPath}
                        alt={item.name}
                        width={20}
                        height={20}
                        className="mr-2"
                    />
                    <Link
                        key={item.name}
                        href={item.href}
                        aria-current={
                            currentUrl.includes(item.href)
                                ? "page"
                                : undefined
                        }
                    >
                        {item.name}
                    </Link>
                </div>
            ))}
        </motion.div>
    );
};

export default SideMenu;