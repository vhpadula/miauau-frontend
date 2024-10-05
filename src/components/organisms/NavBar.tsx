"use client";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
const navigation = [
    { 
        name: "Animais", 
        href: "#Animais", 
        iconPath: "/icons/animal.svg" 
    },
    {
        name: "Voluntários",
        href: "#Voluntários",
        iconPath: "/icons/users.svg",
    },
    { 
        name: "Finanças", 
        href: "#Finanças", 
        iconPath: "/icons/money.svg" 
    },
    { 
        name: "Eventos", 
        href: "#Eventos", 
        iconPath: "/icons/calendar.svg" 
    },
    {
        name: "Configurações",
        href: "#Configurações",
        iconPath: "/icons/config.svg",
    },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

interface NavBarProps {
    currentSection: string;
    setCurrentSection: (section: string) => void;
}

export default function NavBar({
    currentSection,
    setCurrentSection,
}: NavBarProps) {
    return (
        <>
            <Disclosure
                as="nav"
                className="bg-gray text-primary absolute inset-y-0 left-0 w-52 hidden md:flex"
            >
                <div className="mx-auto max-w-7xl  ">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="hidden md:block">
                                <div className="pt-128 flex flex-col items-baseline space-y-4">
                                    {navigation.map((item) => (
                                        <div
                                            key={item.name}
                                            className={classNames(
                                                currentSection === item.name
                                                    ? "text-primary bg-accent  hover:text-secondary"
                                                    : "bg-gray text-primary",
                                                "rounded-md px-6 py-2 text-md font-medium flex items-center"
                                            )}
                                            onClick={() =>
                                                setCurrentSection(item.name)
                                            }
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
                                                    currentSection === item.name
                                                        ? "page"
                                                        : undefined
                                                }
                                            >
                                                {item.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Disclosure>

            <Disclosure as="nav" className="md:hidden">
                {/* Mobile menu button */}
                <div className="-ml-2 flex md:hidden absolute">
                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md  p-2   hover:text-white ">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon
                            aria-hidden="true"
                            className="block h-6 w-6 group-data-[open]:hidden text-primary mt-24 ml-2"
                        />
                        <XMarkIcon
                            aria-hidden="true"
                            className="hidden h-6 w-6 group-data-[open]:block text-primary "
                        />
                    </DisclosureButton>
                </div>
                {/* Mobile menu */}
                <DisclosurePanel className="md:hidden mt-20 ml-5 bg-white">
                    <div className="space-y-1 px-2 pb-3 pt-6 sm:px-3">
                        {navigation.map((item) => (
                            <div
                                key={item.name}
                                className={classNames(
                                    currentSection === item.name
                                        ? "text-primary bg-accent  hover:text-secondary"
                                        : " text-primary",
                                    "rounded-md px-6 py-2 text-md font-medium flex items-center"
                                )}
                                onClick={() => setCurrentSection(item.name)}
                            >
                                <Image
                                    src={item.iconPath}
                                    alt={item.name}
                                    width={20}
                                    height={20}
                                    className="mr-2"
                                />
                                <DisclosureButton
                                    as="a"
                                    key={item.name}
                                    href={item.href}
                                    aria-current={
                                        currentSection === item.name
                                            ? "page"
                                            : undefined
                                    }
                                >
                                    {item.name}
                                </DisclosureButton>
                            </div>
                        ))}
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </>
    );
}
