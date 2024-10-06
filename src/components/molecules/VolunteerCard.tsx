import React from "react";
import Image from "next/image";
import Link from "next/link";
type VolunteerCardProps = {
    id: string;
    imageSrc: string;
    name: string;
    phone: string;
    profession: string;
    email: string;
};

const VolunteerCard: React.FC<VolunteerCardProps> = ({
    id,
    imageSrc,
    name,
    phone,
    profession,
    email
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
        <div id={id} className="flex flex-col items-center justify-center bg-accent rounded-md w-56 h-72" >
            <div>
                <Image src={imageSrc} alt="Voluntários" width={125} height={125} />
                <p className="font-bold text-primary my-1">{name}</p>
                <p className="text-primary text-sm font-bold">{profession}</p>
                <p className="text-primary text-sm font-bold">{formatPhoneNumber(phone)}</p>
                <p className="text-primary text-sm font-bold">{email}</p>
            </div>
        </div>
    );
};

export default VolunteerCard;