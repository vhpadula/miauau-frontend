import React from "react";
import Image from "next/image";
import Link from "next/link";
type VolunteerCardProps = {
    id: string;
    imageSrc: string;
    name: string;
    role: string;
    occupancy: string;
    age: string;
};

const VolunteerCard: React.FC<VolunteerCardProps> = ({
    id,
    imageSrc,
    name,
    role,
    occupancy,
    age
}) => {
    return (
        <div
            id={id}
            className="flex flex-col items-center justify-center  bg-accent rounded-md w-56 h-72 z-50"
            onClick={() => console.log("VolunteerCard Clicked")}
            >
            <Link
                key={name}
                href={`#${id}`}
            >
                <Image src={imageSrc} alt="Voluntários" width={125} height={125} />
                <p className="font-bold text-primary my-1">{name}</p>
                <p className="text-primary text-sm font-bold">{role}</p>
                <p className="text-primary text-sm font-bold">{occupancy}</p>
                <p className="text-primary text-sm font-bold">{age} Anos</p>
            </Link>
        </div>
    );
};

export default VolunteerCard;