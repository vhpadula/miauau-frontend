import React from "react";
import Image from "next/image";
type AdoptionCandidateCardProps = {
    id: string;
    name: string;
    occupation: string;
    livengSituation: string;
    age: string;
};

const AdoptionCandidateCard: React.FC<AdoptionCandidateCardProps> = ({
    id,
    name,
    occupation,
    livengSituation,
    age,
}) => {
    return (
        <div
            id={id}
            className="flex items-center justify-between bg-white shadow-md rounded-lg w-full"
        >
            <div className="flex items-center ml-3 my-3">
                <div>
                    <p className="font-bold text-gray-700 text-base mb-1">{name}</p>
                    <p className="text-gray-700 text-xs font-medium">{age} | {occupation} | {livengSituation}</p>
                </div>
            </div>
            <Image
                src="/icons/semi-right-arrow.svg"
                alt="semi-right-arrow"
                width={16}
                height={16}
                className="mr-7"
            />
        </div>
    );
};

export default AdoptionCandidateCard;
