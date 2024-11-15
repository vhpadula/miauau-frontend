"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { get } from "@/services/baseServices";


type Animal = {
    id: string;
    name: string;
    imagePath: string;
    type: string;
    sex: string;
    ageGroup: string;
    castrated: string;
    color: string;
};

export default function AnimalPublic ({params}: {
    params: { animalId: string }
}) {
    const emptyAnimal: Animal = {
        id: "",
        name: "",
        imagePath: "",
        type: "",
        sex: "",
        ageGroup: "",
        castrated: "",
        color: "",
    };
    
    const [ animal, setAnimal ] = useState<Animal>(emptyAnimal);

    useEffect(() => {
        // Chamar endpoint público
        get(`/api/v1/animals/${params.animalId}`)
        .then((response) => {
            setAnimal(response);
        }
        ).catch((error) => {
            console.error("Failed to fetch animal:", error);
        });
    }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-secondary">
                <div className="flex flex-col items-center px-5 pt-2 pb-20">
                    <Image
                        src={animal.imagePath}
                        alt="Animais"
                        width={400}
                        height={400}
                        className="border-[3px] border-white rounded-full my-6"
                    />
                    <p className="font-bold text-white text-5xl">{animal.name}</p>

                    <p className="font-bold text-white text-xl">
                        {animal.ageGroup} | {animal.sex} | {animal.color}
                    </p>
                    <p className="font-bold text-white text-xl">
                        {animal.castrated ? "Castrado(a)" : "Não castrado(a)"}
                    </p>
                    <div className="flex flex-row items-center mt-4 space-x-4">
                        <div className="bg-primary text-white font-bold py-2 px-4 rounded-full text-center cursor-pointer">
                            Instagram
                        </div>
                        <div className="bg-primary text-white font-bold py-2 px-4 rounded-full text-center cursor-pointer">
                            ONG Phone Number
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

