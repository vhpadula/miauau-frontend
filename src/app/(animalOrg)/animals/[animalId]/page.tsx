"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AdoptionCandidateCard, Button } from "@/components";
import { candidates as mockCandidates, animals as mockAnimals } from '../../../../__mocks__/dataMock';
import { get } from "@/services/baseServices";
import QRCode from 'qrcode';

type Animal = {
    id: string;
    name: string;
    imagePath: string;
    type: string;
    ageGroup: string;
};

export default function Animal ({params}: {
    params: { animalId: string }
}) {
    const qrCodeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/public/animals/${params.animalId}`;
    const emptyAnimal: Animal = {
        id: "",
        name: "",
        imagePath: "",
        type: "",
        ageGroup: "",
    };
    
    const [ animal, setAnimal ] = useState<Animal>(emptyAnimal);
    const [ qrcode, setQrcode ] = useState<string>("");
    const candidates = mockCandidates;

    useEffect(() => {
        get(`/api/v1/animals/${params.animalId}`)
        .then((response) => {
            setAnimal(response);
            QRCode.toDataURL(qrCodeUrl).then(setQrcode)
        }
        ).catch((error) => {
            console.error("Failed to fetch animal:", error);
        });
    }, []);

    return (
        <>
            <div className="flex flex-col items-center pt-20">
                <div className="bg-secondary w-full flex flex-row items-center px-5 pt-2 pb-20">
                    <Image src={animal.imagePath} alt="Animais" width={100} height={100} className="border-[3px] border-white rounded-full my-6"/>
                    <div className="ml-3 flex-grow">
                        <p className="font-bold text-white text-xl">{animal.name}</p>
                        <p className="text-white text-xs font-light">{animal.type.toUpperCase()} | {animal.ageGroup.toUpperCase()}</p>
                        <Button
                            label="Levar para a feira de adoção"
                            className="text-xs w-full mt-2"
                            variant="primary"
                            type="submit"
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <Image src={qrcode} alt="QRCode" width={100} height={100} className="border-[3px] border-white rounded-lg"/>
                        <Button
                            label="Exportar"
                            className="text-xs w-full mt-2"
                            variant="primary"
                            type="submit"
                            onClick={() => console.log(qrCodeUrl)}
                        />
                    </div>
                </div>
                <div className="px-4 w-full -m-3">
                    <div className="flex items-start justify-between bg-white shadow-md rounded-lg -mt-16">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col items-center justify-center m-5">
                                <Image src="/icons/cat-dog-vet.svg" alt="Animais" width={50} height={50}/>
                                <p className="text-secondary font-extrabold text-xs mt-2">SITUAÇÃO</p>
                                <p className="text-secondary font-extrabold text-xs">CLÍNICA</p>
                            </div>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-gray-700 text-xs font-medium flex-grow">
                                <p>Vacinas:</p>
                                <p>3 de 4</p>

                                <p>FIV/FELV:</p>
                                <p>negativo</p>

                                <p>Castrado:</p>
                                <p>sim</p>

                                <p>Vermifugado:</p>
                                <p>sim</p>
                            </div>
                        </div>
                    <Image src="/icons/edit-primary.svg" alt="Animais" width={20} height={20} className="m-5"/>
                    </div>
                </div>
            </div>
                <p className="text-secondary font-bold text-xl mt-12 mx-5 pb-5">Candidatos à adoção</p>
                <div className="grid grid-cols-1 lg:w-2/3 md:w-1/2 gap-4 mx-5  max-h-screen">
                    {candidates.map((candidate) => (
                        <AdoptionCandidateCard
                            key={candidate.id}
                            id={candidate.id}
                            name={candidate.name}
                            occupation={candidate.occupation}
                            livesAlone={candidate.livesAlone}
                            age={candidate.age}
                        />
                    ))}
                </div>
        </>
    );
};

