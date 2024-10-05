import React, { useEffect, useState } from 'react';
import Image from "next/image";

interface VolunteerPageProps {
    id: string;
}

type VolunteerProps = {
    imageSrc: string;
    name: string;
    phone: string;
    profession: string;
    email: string;
}

const VolunteerPage: React.FC<VolunteerPageProps> = ({ id }) => {

    const [volunteer, setVolunteer] = useState<VolunteerProps>();

    function formatPhoneNumber(phoneNumberString: string | undefined) {
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }
    
    useEffect(() => {
        fetch(`http://localhost:8080/person/${id}`)
            .then(response => response.json())
            .then(data => setVolunteer(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

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
                    <Image src={volunteer?.imageSrc || "/images/default.png" } alt="Voluntário" width={125} height={125} />
                    <p className="font-bold text-primary my-1">{volunteer?.name}</p>
                    <p className="text-primary text-sm font-bold">{volunteer?.profession}</p>
                    <p className="text-primary text-sm font-bold">{formatPhoneNumber(volunteer?.phone)}</p>
                    <p className="text-primary text-sm font-bold">{volunteer?.email}</p>
                </div>
            </div>
        </div>
    );
};

export default VolunteerPage;