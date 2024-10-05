import React from 'react';
import Image from "next/image";

interface VolunteerPageProps {
    id: string;
}

const VolunteerPage: React.FC<VolunteerPageProps> = ({ id }) => {
    const volunteer = {
        id: "1",
        name: "John Doe",
        role: "Coordinator",
        occupancy: "Full-time",
        age: "35",
        imageSrc: "/images/default.png",
        contact: "11 99999-9999"
    };

    return (
        <div className="flex flex-col items-center justify-center ml-52 h-screen">
            <div className="w-full flex justify-between">
            <button 
                className="ml-4 p-2 bg-primary text-white rounded z-50"
                onClick={()=> console.log("voltou")}>
                    Back
                </button>
                <button 
                className="mr-4 p-2 bg-primary text-white rounded z-50"
                    onClick={()=> console.log("adicionou")}>
                    Create New
                </button>
            </div>
            <div
                id={id}
                className="flex flex-col items-center justify-center  bg-accent rounded-md w-[624px] h-[643px]">
                <div>
                    <Image src={volunteer.imageSrc} alt="Voluntário" width={125} height={125} />
                    <p className="font-bold text-primary my-1">{volunteer.name}</p>
                    <p className="text-primary text-sm font-bold">{volunteer.role}</p>
                    <p className="text-primary text-sm font-bold">{volunteer.occupancy}</p>
                    <p className="text-primary text-sm font-bold">{volunteer.age} Anos</p>
                    <p className="text-primary text-sm font-bold">{volunteer.contact}</p>
                </div>
            </div>
        </div>
    );
};

export default VolunteerPage;