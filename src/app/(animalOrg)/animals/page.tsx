"use client";
import React, { useState } from "react";
import AnimalCard from "@/components/molecules/AnimalCard";
import { Button, Filter, Input } from "@/components";
import Image from "next/image";
import { animals as mockAnimals } from '../../../__mocks__/dataMock';

export default function Animals() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSpecies, setSelectedSpecies] = useState("");
    const [showFilterPopup, setShowFilterPopup] = useState(false);

    const animals = mockAnimals;

    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleSpeciesSelect = (species: string) => {
        if (species === "Todos") {
          setSelectedSpecies("");
        } else {
          setSelectedSpecies(species);
        }
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
                            <Filter 
                                filterLabel="Filtrar por espécie"
                                options={['Todos', 'Gato', 'Cachorro']} 
                                selectedOption={selectedSpecies} 
                                onClick={handleSpeciesSelect}
                            />
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
