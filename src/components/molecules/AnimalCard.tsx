import React from "react";
import Image from "next/image";
type AnimalCardProps = {
    id: string;
    number: string;
    imageSrc: string;
    name: string;
    type: string;
    age: string;
};

const AnimalCard: React.FC<AnimalCardProps> = ({
    id,
    number,
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
                <div className="relative w-16 h-16 m-3">
                        <Image 
                            src={image} 
                            alt="Animais" 
                            fill={true}
                            className="object-cover object-center rounded-full"
                        />
                </div>
                <div>
                    <p className="font-bold text-gray-700 text-base">{name} - ID: {number}</p>
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
