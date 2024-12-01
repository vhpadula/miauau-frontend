"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AdoptionCandidateCard, Button } from "@/components";
import { candidates as mockCandidates, animals as mockAnimals } from '../../../../__mocks__/dataMock';
import { get } from "@/services/baseServices";
import QRCode from 'qrcode';
import { useRouter } from "next/navigation";
import { ICandidateSimple } from "@/types";
import Link from "next/link";

type Animal = {
    id: string;
    name: string;
    imagePath: string;
    type: string;
    ageGroup: string;
    castrated: string;
    felv: boolean;
    fiv: boolean;
    dewormed: string;
    vaccinated: string;
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
        castrated: "",
        felv: false,
        fiv: false,
        dewormed: "",
        vaccinated: "",
    };
    
    const [ animal, setAnimal ] = useState<Animal>(emptyAnimal);
    const [ qrcode, setQrcode ] = useState<string>("");
    const [ candidates, setcandidates ] = useState<ICandidateSimple[]>(mockCandidates);
    const router = useRouter();

    const handleExport = () => {
        const link = document.createElement('a');
        link.href = qrcode;
        link.download = `${animal.name}_QRCode.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const hasFivOrFelv = (animal: Animal): boolean => {
        return animal.fiv || animal.felv;
    };

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

    useEffect(() => {
        get(`/api/v1/adoptions/specific-animal/${params.animalId}`)
            .then((response) => {
                setcandidates(response);
            })
            .catch((error) => {
                console.error("Failed to fetch ONGs:", error);
            });
    }, [params.animalId]);

    const image = animal.imagePath != null ? animal.imagePath :
        animal.type === "Gato" ? "/images/cat.png" : "/images/dog.png"

    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex flex-col items-center pt-20 sm:w-3/4 lg:w-2/3 md:w-1/2 xl:w-1/3">
                <div className="bg-secondary w-full flex flex-row items-center px-5 pt-4 pb-36">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white">
                        <Image 
                            src={image} 
                            alt="Animais" 
                            fill={true} 
                            className="object-cover"
                        />
                    </div>
                    <div className="mx-3 flex-grow my-6">
                        <p className="font-bold text-white text-xl">{animal.name}</p>
                        <p className="text-white text-xs font-light">{animal.type.toUpperCase()} | {animal.ageGroup.toUpperCase()}</p>
                    </div>
                    <div className="flex flex-col items-center rounded-lg bg-white cursor-pointer p-[1px]" onClick={handleExport}>
                        <Image src={qrcode} alt="QRCode" width={85} height={85} className="rounded-lg"/>
                        <div className="flex mb-2">
                            <Image 
                                src="/icons/share.svg" 
                                alt="share" 
                                width={15} 
                                height={15} 
                            />
                            <label className="text-black text-sm cursor-pointer ml-1">Exportar</label>
                        </div>
                    </div>
                </div>
                <div className="px-4 w-full -m-12">
                    <div className="flex flex-col gap-2 -mt-20">
                        <div className="flex items-center justify-center bg-white shadow-md rounded-full text-black text-xs w-full py-1">Adotar</div>
                        <div className="flex items-center justify-center bg-white shadow-md rounded-full text-black text-xs w-full py-1">Levar para feira de adoção</div>
                    </div>
                    
                </div>
                <div className="px-4 w-full m-8 mt-10">
                    <div className="flex items-start justify-between bg-white shadow-md rounded-lg ">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col items-center justify-center m-5">
                                <Image src="/icons/cat-dog-vet.svg" alt="Animais" width={50} height={50}/>
                                <p className="text-secondary font-extrabold text-xs mt-2">SITUAÇÃO</p>
                                <p className="text-secondary font-extrabold text-xs">CLÍNICA</p>
                            </div>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-gray-700 text-xs font-medium flex-grow">
                                <p>Vacinas:</p>
                                <p>{animal.vaccinated}</p>

                                <p>FIV/FELV:</p>
                                <p>{hasFivOrFelv(animal) ? "Positivo" : "Negativo"}</p>

                                <p>Castrado:</p>
                                <p>{animal.castrated ? "Sim" : "Não"}</p>

                                <p>Vermifugado:</p>
                                <p>{animal.dewormed ? "Sim" : "Não"}</p>
                            </div>
                        </div>
                    <Image 
                        src="/icons/edit-primary.svg" 
                        alt="Animais" 
                        width={20} 
                        height={20} 
                        className="m-5 cursor-pointer" 
                        onClick={() => router.push(`/animals/${params.animalId}/edit`)}/>
                    </div>
                </div>
            </div>
            <div className=" w-full lg:w-2/3 md:w-1/2 sm:w-3/4 xl:w-1/3 mb-10">
                <p className="text-secondary font-bold text-xl mx-5 pb-5">Candidatos à adoção</p>
                <div className="grid grid-cols-1 gap-4 mx-5 max-h-screen">
                    {candidates.length == 0 && (
                        <p className="text-center text-gray-700">
                            Nenhum candidato encontrado.
                        </p>
                    )}
                    {candidates.map((candidate) => (
                        <Link href={`/candidates/${candidate.id}`} key={candidate.id}>
                            <AdoptionCandidateCard
                                key={candidate.id}
                                id={candidate.id}
                                name={candidate.name}
                                occupation={candidate.occupation}
                                livengSituation={candidate.livingSituation}
                                age={candidate.age}
                            />
                        </Link>
                    ))}
                </div>
            
            </div>
        </div>
    );
};

