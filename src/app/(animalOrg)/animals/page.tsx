"use client";
import React, { useState } from "react";
import AnimalCard from "@/components/molecules/AnimalCard";
import { Button, Input } from "@/components";
import Image from "next/image";

export default function Animals() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSpecies, setSelectedSpecies] = useState("");
    const [showFilterPopup, setShowFilterPopup] = useState(false);

    const animals = [
        {
            id: "1",
            imageSrc: "/images/dog1.png",
            name: "Rex",
            species: "Cachorro",
            size: "Pequeno",
            age: "2 anos",
            location: "São Paulo",
        },
        {
            id: "2",
            imageSrc: "/images/cat1.png",
            name: "Mimi",
            species: "Gato",
            size: "Médio",
            age: "3 anos",
            location: "Rio de Janeiro",
        },
        {
            id: "3",
            imageSrc: "/images/dog2.png",
            name: "Buddy",
            species: "Cachorro",
            size: "Grande",
            age: "4 anos",
            location: "Curitiba",
        },
        {
            id: "4",
            imageSrc: "/images/cat2.png",
            name: "Luna",
            species: "Gato",
            size: "Pequeno",
            age: "1 ano",
            location: "Porto Alegre",
        },
        {
            id: "5",
            imageSrc: "/images/dog3.png",
            name: "Max",
            species: "Cachorro",
            size: "Médio",
            age: "5 anos",
            location: "Belo Horizonte",
        },
        {
            id: "6",
            imageSrc: "/images/cat3.png",
            name: "Bella",
            species: "Gato",
            size: "Grande",
            age: "2 anos",
            location: "Salvador",
        },
        {
            id: "7",
            imageSrc: "/images/dog4.png",
            name: "Charlie",
            species: "Cachorro",
            size: "Pequeno",
            age: "3 anos",
            location: "Fortaleza",
        },
        {
            id: "8",
            imageSrc: "/images/cat4.png",
            name: "Simba",
            species: "Gato",
            size: "Médio",
            age: "4 anos",
            location: "Brasília",
        },
    ];

    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleSpeciesSelect = (species: string) => {
        setSelectedSpecies(species);
        setShowFilterPopup(false);
    };

    const filteredAnimals = animals.filter((animal) => {
        const matchesSearchTerm = animal.name.toLowerCase().includes(searchTerm);
        const matchesSpecies = selectedSpecies ? animal.species === selectedSpecies : true;
        return matchesSearchTerm && matchesSpecies;
    });

    return (
        <div className="flex flex-col items-center h-screen">
            <div className="sticky top-20 mt-[76px] flex items-center bg-white justify-center w-full p-5 mb-4 z-1 shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
                <div className="flex-grow md:flex-grow-0 lg:flex-grow-0 lg:w-2/3 md:w-1/2">
                    <Input
                        type="text"
                        placeholder="Buscar animal"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full px-4 border border-gray-300 rounded-l-md focus:outline-none text-black"
                    />
                </div>
                <div className="relative">
                    <Button
                        icon={
                            <Image
                                src="/icons/filter.svg"
                                alt="filter"
                                width={25}
                                height={20}
                                className="mx-0.5"
                            />
                        }
                        variant="outline"
                        type="button"
                        className="px-1.5 ml-2 h-full"
                        onClick={() => setShowFilterPopup(!showFilterPopup)}
                    />
                    {showFilterPopup && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-3 z-20">
                            <p className="font-bold text-primary mb-2">Filtrar por espécie</p>
                            <div className="space-y-2">
                                <button
                                    onClick={() => handleSpeciesSelect("")}
                                    className={`w-full text-black text-left px-2 py-1 rounded ${selectedSpecies === "" ?  "bg-accent" : ""}`}
                                >
                                    Todos
                                </button>
                                <button
                                    onClick={() => handleSpeciesSelect("Cachorro")}
                                    className={`w-full text-black text-left px-2 py-1 rounded ${selectedSpecies === "Cachorro" ?  "bg-accent" : ""}`}
                                >
                                    Cachorro
                                </button>
                                <button
                                    onClick={() => handleSpeciesSelect("Gato")}
                                    className={`w-full text-black text-left px-2 py-1 rounded ${selectedSpecies === "Gato" ?  "bg-accent" : ""}`}
                                >
                                    Gato
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 lg:w-2/3 md:w-1/2 gap-4 m-2 w-full p-5 max-h-screen">
                {filteredAnimals.length > 0 ? (
                    filteredAnimals.map((animal) => (
                        <AnimalCard
                            key={animal.id}
                            id={animal.id}
                            imageSrc={animal.imageSrc}
                            name={animal.name}
                            species={animal.species}
                            size={animal.size}
                            age={animal.age}
                            location={animal.location}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-700">Nenhum animal encontrado.</p>
                )}
            </div>
        </div>
    );
}
