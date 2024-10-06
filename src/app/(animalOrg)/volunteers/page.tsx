"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { get } from "@/services/baseServices";
import VolunteerCard from "@/components/molecules/VolunteerCard";

type VolunteerProps = {
    id: string;
    name: string;
    phone: string;
    profession: string;
    email: string;
}

export default function VolunteersList () {

    const imageSrc = "/images/default.png";
    const [currentPage, setCurrentPage] = useState(1);
    const [volunteersPerPage] = useState(8);
    const [volunteers, setVolunteers] = useState<VolunteerProps[]>([]);

    const totalPages = Math.ceil(volunteers.length / volunteersPerPage);

    const indexOfLastVolunteer = currentPage * volunteersPerPage;
    const indexOfFirstVolunteer = indexOfLastVolunteer - volunteersPerPage;
    const currentVolunteers = volunteers.slice(indexOfFirstVolunteer, indexOfLastVolunteer);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect( () => {
        get("person/volunteers")
        .then((response) => {
            setVolunteers(response);
        });
    }, []);

    return (
        <div className="flex flex-col items-center pl-52 pt-20 h-screen">
            <div className="w-full flex justify-end mt-4 mb-10 mr-6">
                <button className="m-4 p-2 bg-primary text-white rounded z-10 flex items-center" onClick={()=> console.log("adicionou")}>
                    <Image
                        src={"/icons/file-plus.svg"}
                        alt={"Add New"}
                        width={20}
                        height={20}
                        className="mr-2"
                    />
                    <p className="font-roboto text-base">Novo</p>
                </button>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 m-2 max-h-screen">
                {currentVolunteers.map((volunteer: VolunteerProps) => (
                    <VolunteerCard
                        key={volunteer.id}
                        id={volunteer.id}
                        imageSrc={imageSrc}
                        name={volunteer.name}
                        phone={volunteer.phone}
                        profession={volunteer.profession}
                        email={volunteer.email}
                    />
                ))}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 z-10">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 mx-1 rounded-full transition-colors duration-300 ${
                            currentPage === index + 1
                            ? "bg-primary text-white"
                            : "bg-gray text-black hover:bg-gray-300"
                        }`}
                    >
                    {index + 1}
                    </button>
                ))}
                </div>
        )}
        </div>
    )
};