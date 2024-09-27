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
            className="flex flex-col items-center justify-center  bg-accent rounded-md w-56 h-72"
        >
            <div>
                <Image src={imageSrc} alt="Animais" width={125} height={125} />
                <p className="font-bold text-primary my-1">{name}</p>
                <p className="text-primary text-sm font-bold">{species}</p>
                <p className="text-primary text-sm font-bold">{size}</p>
                <p className="text-primary text-sm font-bold">{age}</p>
                <p className="text-primary text-sm font-bold">{location}</p>
            </div>
        </div>
    );
};

export default AnimalCard;
