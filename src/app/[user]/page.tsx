"use client";
import Image from "next/image";
import {
    Animals,
    Events,
    Finance,
    Header,
    Settings,
    Volunteers,
} from "@/components";
import { useState } from "react";
export default function Page() {
    const [currentSection, setCurrentSection] = useState("Animais");
    return (
        <>
            <Header
                imageSrc="/images/anjosnaterra.png"
                username="Anjos Na Terra"
                className="fixed top-0 "
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
            />

            <main className="flex flex-col items-center justify-center h-screen">
                `{currentSection === "Animais" && <Animals />}
                {currentSection === "Voluntários" && <Volunteers />}
                {currentSection === "Finanças" && <Finance />}
                {currentSection === "Eventos" && <Events />}
                {currentSection === "Configurações" && <Settings />}
            </main>
        </>
    );
}
