"use client";
import React, { useState } from "react";
import AnimalCard from "@/components/molecules/AnimalCard";
import { Button, Input } from "@/components";
import Image from "next/image";

export default function Animals () {
    const [searchTerm, setSearchTerm] = useState("");
    const animals = [
        {
            id: "1",
            imageSrc: "/images/dog1.png",
            name: "Rex",
            species: "Canino",
            size: "Pequeno",
            age: "2 anos",
            location: "São Paulo",
        },
        {
            id: "2",
            imageSrc: "/images/cat1.png",
            name: "Mimi",
            species: "Felino",
            size: "Médio",
            age: "3 anos",
            location: "Rio de Janeiro",
        },
        {
            id: "3",
            imageSrc: "/images/dog2.png",
            name: "Buddy",
            species: "Canino",
            size: "Grande",
            age: "4 anos",
            location: "Curitiba",
        },
        {
            id: "4",
            imageSrc: "/images/cat2.png",
            name: "Luna",
            species: "Felino",
            size: "Pequeno",
            age: "1 ano",
            location: "Porto Alegre",
        },
        {
            id: "5",
            imageSrc: "/images/dog3.png",
            name: "Max",
            species: "Canino",
            size: "Médio",
            age: "5 anos",
            location: "Belo Horizonte",
        },
        {
            id: "6",
            imageSrc: "/images/cat3.png",
            name: "Bella",
            species: "Felino",
            size: "Grande",
            age: "2 anos",
            location: "Salvador",
        },
        {
            id: "7",
            imageSrc: "/images/dog4.png",
            name: "Charlie",
            species: "Canino",
            size: "Pequeno",
            age: "3 anos",
            location: "Fortaleza",
        },
        {
            id: "8",
            imageSrc: "/images/cat4.png",
            name: "Simba",
            species: "Felino",
            size: "Médio",
            age: "4 anos",
            location: "Brasília",
        },
    ];

    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredAnimals = animals.filter((animal) =>
        animal.name.toLowerCase().includes(searchTerm)
    );

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
                />
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
};

