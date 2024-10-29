"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { get } from "@/services/baseServices";
import VolunteerCard from "@/components/molecules/VolunteerCard";
import { volunteers as mockVolunteers, IVolunteer } from '../../../__mocks__/dataMock';
import { error } from "console";
import { Button, Filter, Input } from "@/components";

export default function VolunteersList () {

    const imageSrc = "/images/default.png";
    const [currentPage, setCurrentPage] = useState(1);
    const [volunteersPerPage] = useState(8);
    const [volunteers, setVolunteers] = useState<IVolunteer[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedContribution, setSelectedContribution] = useState("");
    const [showFilterPopup, setShowFilterPopup] = useState(false);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect( () => {
        get("person/volunteers")
        .then((response) => {
            setVolunteers(response);
        })
        .catch((error) => {
            setVolunteers(mockVolunteers);
        });
    }, []);


    // ajustar busca e filtro pra funcionar intgrado com o backend, do jeito que se ele filtrar e estiver depois da primeira pg pode dar ruim
    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleContributionSelect = (contribution: string) => {
        if (contribution === "Todos") {
            setSelectedContribution("");
        } else {
            setSelectedContribution(contribution);
        }
        setShowFilterPopup(false);
    };

    const filteredVolunteers = volunteers.filter((volunteer) => {
        const matchesSearchTerm = volunteer.name.toLowerCase().includes(searchTerm);
        const matchesSpecies = selectedContribution ? volunteer.contribution === selectedContribution : true;
        return matchesSearchTerm && matchesSpecies;
    });
    
    const indexOfLastVolunteer = currentPage * volunteersPerPage;
    const indexOfFirstVolunteer = indexOfLastVolunteer - volunteersPerPage;
    const currentVolunteers = filteredVolunteers.slice(indexOfFirstVolunteer, indexOfLastVolunteer);
    const totalPages = Math.ceil(filteredVolunteers.length / volunteersPerPage);

    return (
        <div className="flex flex-col items-center h-screen">
            <div className="sticky top-20 mt-[76px] flex items-center bg-white justify-center w-full p-5 mb-4 z-1 shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
                <div className="flex-grow md:flex-grow-0 lg:flex-grow-0 lg:w-2/3 md:w-1/2">
                    <Input
                        type="text"
                        placeholder="Buscar voluntário"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full px-4 border border-gray-300 rounded-l-md focus:outline-none text-black"
                    />
                </div>
                <div className="relative">
                    <Button
                        icon={
                            <Image
                                src="/icons/filter.svg"
                                alt="filter"
                                width={25}
                                height={20}
                                className="mx-0.5"
                            />
                        }
                        variant="outline"
                        type="button"
                        className="px-1.5 ml-2 h-full"
                        onClick={() => setShowFilterPopup(!showFilterPopup)}
                    />
                    {showFilterPopup && (
                        <div className="absolute right-0 mt-2 w-fit bg-white shadow-lg rounded-lg p-3 z-20">
                            <Filter 
                                filterLabel="Filtrar por contribuição"
                                options={['Todos', 'Material', 'Financeiro', 'Tempo']} 
                                selectedOption={selectedContribution} 
                                onClick={handleContributionSelect}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 lg:w-2/3 md:w-1/2 gap-4 w-full p-5 max-h-screen">
                {currentVolunteers.map((volunteer: IVolunteer) => (
                    <VolunteerCard
                        key={volunteer.id}
                        id={volunteer.id}
                        imageSrc={imageSrc}
                        name={volunteer.name}
                        age={volunteer.age}
                        profession={volunteer.profession}
                        contribution={volunteer.contribution}
                    />
                ))}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 z-10">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 mx-1 mt-2 mb-4 rounded-full transition-colors duration-300 ${
                            currentPage === index + 1
                            ? "bg-primary text-white"
                            : "border-primary border text-black hover:bg-gray-300"
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