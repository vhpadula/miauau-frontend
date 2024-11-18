import React from "react";
import Image from "next/image";
type AnimalCardProps = {
    id: string;
    imageSrc: string;
    name: string;
    type: string;
    age: string;
};

const AnimalCard: React.FC<AnimalCardProps> = ({
    id,
    imageSrc,
    name,
    type,
    age,
}) => {
    const image = imageSrc != null ? imageSrc :
        type === "Gato" ? "/images/cat.png" : "/images/dog.png"
    return (
        <div
            id={id}
            className="flex items-center justify-between bg-white shadow-md rounded-lg w-full h-24"
        >
            <div className="flex items-center">
                <Image src={image} alt="Animais" width={70} height={70} className="rounded-full m-3"/>
                <div>
                    <p className="font-bold text-gray-700 text-base">{name}</p>
                    <p className="text-gray-700 text-xs font-medium">{type} | {age}</p>
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
