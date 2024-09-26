"use client";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
const navigation = [
    { name: "Animais", href: "#Animais" },
    { name: "Voluntários", href: "#Voluntários" },
    { name: "Finanças", href: "#Finanças" },
    { name: "Eventos", href: "#Eventos" },
    { name: "Configurações", href: "#Configurações" },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
    const [currentSection, setCurrentSection] = useState("");

    return (
        <>
            <Disclosure
                as="nav"
                className="bg-gray text-primary absolute inset-y-0 left-0 w-48 hidden md:flex"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="hidden md:block">
                                <div className="ml-3 pt-128 flex flex-col items-baseline space-y-4">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            aria-current={
                                                currentSection === item.name
                                                    ? "page"
                                                    : undefined
                                            }
                                            className={classNames(
                                                currentSection === item.name
                                                    ? "text-primary bg-accent  hover:text-secondary"
                                                    : "bg-gray text-primary",
                                                "rounded-md px-3 py-2 text-sm font-medium"
                                            )}
                                            onClick={() =>
                                                setCurrentSection(item.name)
                                            }
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Disclosure>

            <Disclosure as="nav" className="md:hidden">
                {/* Mobile menu button */}
                <div className="-ml-2 flex md:hidden">
                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon
                            aria-hidden="true"
                            className="block h-6 w-6 group-data-[open]:hidden"
                        />
                        <XMarkIcon
                            aria-hidden="true"
                            className="hidden h-6 w-6 group-data-[open]:block"
                        />
                    </DisclosureButton>
                </div>
                {/* Mobile menu */}
                <DisclosurePanel className="md:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        {navigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                aria-current={
                                    currentSection === item.name
                                        ? "page"
                                        : undefined
                                }
                                className={classNames(
                                    currentSection === item.name
                                        ? "bg-gray-900 text-white"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "block rounded-md px-3 py-2 text-base font-medium"
                                )}
                                onClick={() => setCurrentSection(item.href)}
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </>
    );
}
