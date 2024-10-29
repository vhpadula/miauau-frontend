import React from "react";
import Image from "next/image";
type AnimalCardProps = {
    id: string;
    imageSrc: string;
    name: string;
    species: string;
    size: string;
    age: string;
    location: string;
};

const AnimalCard: React.FC<AnimalCardProps> = ({
    id,
    imageSrc,
    name,
    species,
    size,
    age,
    location,
}) => {
    return (
        <div
            id={id}
            className="flex items-center justify-between bg-white shadow-md rounded-lg w-full h-24"
        >
            <div className="flex items-center">
                <Image src={imageSrc} alt="Animais" width={70} height={70} className="rounded-full m-3"/>
                <div>
                    <p className="font-bold text-gray-700 text-base">{name}</p>
                    <p className="text-gray-700 text-xs font-medium">{species} | Porte {size} | {age}</p>
                    <p className="text-gray-700 text-xs font-medium">{location}</p>
                </div>
            </div>
            <Image
                src="/icons/semi-right-arrow.svg"
                alt="semi-right-arrow"
                width={20}
                height={20}
                className="mr-7"
            />
        </div>
    );
};

export default AnimalCard;
