import React from "react";
import Image from "next/image";
import Link from "next/link";
type VolunteerCardProps = {
    id: string;
    imageSrc: string;
    name: string;
    profession: string;
    age: number;
    contribution: string;
};

const VolunteerCard: React.FC<VolunteerCardProps> = ({
    id,
    imageSrc,
    name,
    age,
    profession,
    contribution
}) => {
    function formatPhoneNumber(phoneNumberString: string) {
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }

    return (
        <div
            id={id}
            className="flex items-center justify-between bg-white shadow-md rounded-lg w-full h-24"
        >
            <div className="flex items-center">
                <Image src={imageSrc} alt="Animais" width={70} height={70} className="rounded-full m-3"/>
                <div>
                    <p className="font-bold text-gray-700 text-base mb-1">{name}</p>
                    <p className="text-gray-700 text-xs font-medium mb-0.5">{age} anos | {profession}</p>
                    <p className="text-gray-700 text-xs font-medium">{contribution}</p>
                </div>
            </div>
            <Image
                src="/icons/edit-gray.svg"
                alt="edit"
                width={20}
                height={20}
                className="mr-7"
            />
        </div>
    );
};

export default VolunteerCard;