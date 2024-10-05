import React, { useEffect, useState } from "react";
import { VolunteerCard } from "../../molecules";

type VolunteersListProps = {
    setCurrentSection: (section: string) => void;
};

type VolunteerProps = {
    id: string;
    name: string;
    phone: string;
    profession: string;
    email: string;
}

const VolunteersList: React.FC<VolunteersListProps> = ({ setCurrentSection }) => {

    const imageSrc = "/images/default.png";
    const [volunteers, setVolunteers] = useState<VolunteerProps[]>([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [volunteersPerPage] = React.useState(8);

    useEffect(() => {
        fetch("http://localhost:8080/person/volunteers")
            .then(response => response.json())
            .then(data => setVolunteers(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const totalPages = Math.ceil(volunteers.length / volunteersPerPage);

    const indexOfLastVolunteer = currentPage * volunteersPerPage;
    const indexOfFirstVolunteer = indexOfLastVolunteer - volunteersPerPage;
    const currentVolunteers = volunteers.slice(indexOfFirstVolunteer, indexOfLastVolunteer);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        console.log(volunteers);
    }, [volunteers]);


    return (
        <div className="flex flex-col items-center justify-center ml-16 h-screen">
            <div className="w-full flex justify-end mr-6">
                <button 
                className="m-4 p-2 bg-primary text-white rounded z-50"
                    onClick={()=> console.log("adicionou")}>
                    Create New
                </button>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 m-2 max-h-screen">
                {currentVolunteers.map((volunteer) => (
                    <VolunteerCard
                        key={volunteer.id}
                        id={volunteer.id}
                        imageSrc={imageSrc}
                        name={volunteer.name}
                        phone={volunteer.phone}
                        profession={volunteer.profession}
                        email={volunteer.email}
                        setCurrentSection={setCurrentSection}
                    />
                ))}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 z-50">
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

export default VolunteersList;
