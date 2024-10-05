"use client";
import {
    Animals,
    Events,
    Finance,
    Header,
    Settings,
    VolunteersList,
    VolunteerPage
} from "@/components";
import { useState } from "react";
export default function Page() {
    const [currentSection, setCurrentSection] = useState("Animais");

    function getId (section: string) {
        return section.split("#")[1];
    }

    return (
        <>
            <Header
                imageSrc="/images/anjosnaterra.png"
                username="Anjos Na Terra"
                className="fixed top-0 "
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
            />

            <main className="h-screen">
                {currentSection === "Animais" && <Animals a="1" />}
                {currentSection === "Voluntários" && (
                    <VolunteersList setCurrentSection={setCurrentSection} />
                )}
                {currentSection.startsWith("Voluntário#") && (
                    <VolunteerPage id={getId(currentSection)} />
                )}
                {currentSection === "Finanças" && <Finance textSize="2" />}
                {currentSection === "Eventos" && <Events />}
                {currentSection === "Configurações" && (
                    <Settings textSize="2" />
                )}
            </main>
        </>
    );
}
