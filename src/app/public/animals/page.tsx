"use client";
import React, { useEffect, useState } from "react";
import AnimalCard from "@/components/molecules/AnimalCard";
import { Button, Filter, Input } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { get } from "@/services/baseServices";
import Link from "next/link";
import { IAnimalSimple } from "@/types";

export default function PublicAnimals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [animals, setAnimals] = useState<IAnimalSimple[]>([]);
  const router = useRouter();

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSpeciesSelect = (species: string) => {
    setSelectedSpecies(species === "Todos" ? "" : species);
    setShowFilterPopup(false);
  };

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearchTerm = searchTerm
      ? animal.name.toLowerCase().includes(searchTerm)
      : true;
    const matchesSpecies = selectedSpecies
      ? animal.type === selectedSpecies
      : true;
    return matchesSearchTerm && matchesSpecies;
  });

  useEffect(() => {
    get("/api/v1/animals")
      .then((response) => {
        setAnimals(response);
      })
      .catch((error) => {
        console.error("Failed to fetch animals:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="sticky z-10 top-20 mt-20 flex items-center bg-white justify-center w-full p-5 mb-4 shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
        <div className="flex-grow md:flex-grow-0 lg:flex-grow-0 lg:w-2/3 md:w-1/2">
          <Input
            type="text"
            placeholder="Buscar animal"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 border border-gray-300 rounded-l-md focus:outline-none text-black"
          />
        </div>
        <div>
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
                options={["Todos", "Gato", "Cachorro"]}
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
            <Link href={`/public/animals/${animal.id}`} key={animal.id}>
              <AnimalCard
                id={animal.id}
                number={animal.animalNumber}
                imageSrc={animal.imagePath}
                name={animal.name}
                type={animal.type}
                age={animal.ageGroup}
              />
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-700">Nenhum animal encontrado.</p>
        )}
      </div>
    </div>
  );
}
