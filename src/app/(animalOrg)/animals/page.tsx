"use client";
import React from "react";
import AnimalCard from "@/components/molecules/AnimalCard";



export default function Animals () {
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

    return (
        <div className="flex flex-col items-center justify-center ml-16 h-screen ">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 m-2 max-h-screen">
                {animals.map((animal) => (
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
                ))}
            </div>
        </div>
    );
};

